import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { CURRICULUM_TRACKS } from '../data/lmsCurriculumData';
import { useLmsProgress } from '../lib/lmsProgressContext';
import { LessonSidebar } from '../components/lms/LessonSidebar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
 ChevronLeft,
 ChevronRight,
 CheckCircle2,
 Menu,
 X,
 FileText,
 Download,
 HelpCircle,
 Sparkles,
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function LmsLessonPlayer() {
 const { trackId, lessonId } = useParams<{ trackId: string; lessonId: string }>();
 const navigate = useNavigate();
 const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

 const {
 isLessonCompleted,
 toggleLessonCompletion,
 markLessonCompleted,
 setLastActive,
 enrollTrack,
 isEnrolled,
 } = useLmsProgress();

 const track = useMemo(
 () => CURRICULUM_TRACKS.find((t) => t.id === trackId) || CURRICULUM_TRACKS[0],
 [trackId],
 );

 // Flatten all lessons across all modules to easily navigate next/previous
 const flatLessons = useMemo(() => {
 return track.modules.flatMap((m) =>
 m.lessons.map((l) => ({ ...l, moduleOrder: m.order, moduleQuiz: m.quiz })),
 );
 }, [track]);

 const currentLessonIndex = useMemo(() => {
 const idx = flatLessons.findIndex((l) => l.id === lessonId);
 return idx >= 0 ? idx : 0;
 }, [flatLessons, lessonId]);

 const currentLesson = flatLessons[currentLessonIndex] || flatLessons[0];
 const currentModule = track.modules.find((m) => m.id === currentLesson.moduleId);

 const prevLesson = currentLessonIndex > 0 ? flatLessons[currentLessonIndex - 1] : null;
 const nextLesson =
 currentLessonIndex < flatLessons.length - 1 ? flatLessons[currentLessonIndex + 1] : null;

 const isCompleted = isLessonCompleted(currentLesson.id);

 // Track progress and ensure enrolled
 useEffect(() => {
 if (track && currentLesson) {
 if (!isEnrolled(track.id)) {
 enrollTrack(track.id);
 }
 setLastActive(track.id, currentLesson.id);
 }
 }, [track, currentLesson, isEnrolled, enrollTrack, setLastActive]);

 const handleToggleComplete = () => {
 toggleLessonCompletion(currentLesson.id);
 };

 const handleNext = () => {
 markLessonCompleted(currentLesson.id);
 if (nextLesson) {
 navigate(`/lms/learn/${track.id}/${nextLesson.id}`);
 } else if (currentModule?.quiz) {
 navigate(`/lms/quiz/${track.id}/${currentModule.id}`);
 }
 };

 return (
 <div className="flex-1 w-full flex flex-col h-[calc(100dvh-4rem)] overflow-hidden">
 {/* ── Top Bar with Breadcrumb and Progress Controls ── */}
 <header className="border-b border-border bg-card px-4 sm:px-6 py-2.5 shrink-0 flex items-center justify-between gap-3">
 <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
 <Button
 variant="ghost"
 size="sm"
 className="lg:hidden size-8 p-0 rounded-none shrink-0"
 onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
 aria-label="Toggle Syllabus Menu"
 >
 {mobileSidebarOpen ? <X className="size-4" /> : <Menu className="size-4" />}
 </Button>

 <Link
 to={`/lms/tracks/${track.id}`}
 className="hover:text-foreground truncate hidden sm:inline"
 >
 {track.title}
 </Link>
 <span className="hidden sm:inline">/</span>
 <span className="font-mono text-[0.65rem] text-primary shrink-0">
 {track.code}
 </span>
 <span>/</span>
 <span className="text-foreground font-medium truncate">
 {currentLesson.title}
 </span>
 </div>

 <div className="flex items-center gap-2 shrink-0">
 <Button
 variant={isCompleted ? 'default' : 'outline'}
 size="sm"
 onClick={handleToggleComplete}
 className="rounded-none text-xs h-8 gap-1.5"
 >
 <CheckCircle2 className={cn('size-3.5', isCompleted ? 'text-primary-foreground' : 'text-primary')} />
 {isCompleted ? 'Completed' : 'Mark as Done'}
 </Button>
 </div>
 </header>

 {/* ── Main Layout: Syllabus Sidebar + Lesson Body ── */}
 <div className="flex-1 flex overflow-hidden relative">
 {/* Desktop Sidebar */}
 <div className="hidden lg:block h-full">
 <LessonSidebar track={track} activeLessonId={currentLesson.id} />
 </div>

 {/* Mobile Drawer Sidebar */}
 {mobileSidebarOpen && (
 <div
 className="fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm lg:hidden flex"
 onClick={() => setMobileSidebarOpen(false)}
 >
 <div
 className="w-80 max-w-[85vw] h-full bg-card border-r border-border"
 onClick={(e) => e.stopPropagation()}
 >
 <LessonSidebar
 track={track}
 activeLessonId={currentLesson.id}
 onCloseMobile={() => setMobileSidebarOpen(false)}
 />
 </div>
 </div>
 )}

 {/* Lesson Viewport */}
 <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 [scrollbar-gutter:stable] bg-background">
 <div className="max-w-3xl mx-auto space-y-8">
 {/* Header / Meta */}
 <div>
 <div className="flex items-center gap-2 mb-2">
 <Badge variant="outline" className="text-[0.65rem] font-mono rounded-none">
 MODULE {currentLesson.moduleOrder} • {currentLesson.durationMinutes} MINS
 </Badge>
 <Badge variant="secondary" className="text-[0.65rem] uppercase rounded-none">
 {currentLesson.type}
 </Badge>
 </div>

 <h1 className="text-2xl sm:text-3xl font-heading font-medium text-foreground tracking-tight">
 {currentLesson.title}
 </h1>
 <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
 {currentLesson.summary}
 </p>
 </div>

 {/* Video Lecture Player (if type is video or videoEmbedId present) */}
 {currentLesson.videoEmbedId && (
 <div className="border border-border bg-black aspect-video w-full overflow-hidden relative">
 <iframe
 className="w-full h-full"
 src={`https://www.youtube-nocookie.com/embed/${currentLesson.videoEmbedId}?rel=0&modestbranding=1`}
 title={currentLesson.title}
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowFullScreen
 />
 </div>
 )}

 {/* Main Lecture / Reading Markdown Content */}
 <div className="prose dark:prose-invert max-w-none text-foreground/90 text-sm sm:text-base leading-relaxed space-y-4 border-t border-border pt-6">
 {currentLesson.contentMarkdown.split('\n\n').map((paragraph, index) => {
 if (paragraph.startsWith('### ')) {
 return (
 <h3
 key={index}
 className="text-lg sm:text-xl font-heading font-medium text-foreground mt-6 mb-2"
 >
 {paragraph.replace('### ', '')}
 </h3>
 );
 }
 if (paragraph.startsWith('#### ')) {
 return (
 <h4
 key={index}
 className="text-base font-heading font-medium text-foreground mt-4 mb-1"
 >
 {paragraph.replace('#### ', '')}
 </h4>
 );
 }
 if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
 const lines = paragraph.split('\n');
 return (
 <ul key={index} className="space-y-2 my-3 pl-4 border-l-2 border-primary/40">
 {lines.map((line, lIdx) => (
 <li key={lIdx} className="text-sm text-muted-foreground">
 {line.replace(/^[-*]|\d+\.\s*/, '').trim()}
 </li>
 ))}
 </ul>
 );
 }
 return (
 <p key={index} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
 {paragraph}
 </p>
 );
 })}
 </div>

 {/* Key Takeaways Box (Nordic Lagom Straight-Edge Callout) */}
 {currentLesson.keyTakeaways.length > 0 && (
 <div className="border border-primary/40 bg-primary/5 p-5 sm:p-6">
 <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-3 flex items-center gap-1.5">
 <Sparkles className="size-3.5" />
 Key Takeaways & Synthesis
 </h3>
 <ul className="space-y-2">
 {currentLesson.keyTakeaways.map((takeaway, i) => (
 <li key={i} className="text-xs sm:text-sm text-foreground flex items-start gap-2">
 <span className="size-1.5 bg-primary shrink-0 mt-2" />
 <span>{takeaway}</span>
 </li>
 ))}
 </ul>
 </div>
 )}

 {/* Practical Exercise / Reflection Prompt */}
 {currentLesson.practicalExercise && (
 <div className="border border-border bg-card p-5 sm:p-6">
 <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-1.5">
 <FileText className="size-3.5 text-primary" />
 Practical Reflection Challenge
 </h3>
 <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
 {currentLesson.practicalExercise}
 </p>
 </div>
 )}

 {/* Downloadable Reference Worksheets */}
 {currentLesson.resources && currentLesson.resources.length > 0 && (
 <div className="border border-border bg-card p-5">
 <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground block mb-3">
 SUPPLEMENTAL WORKSHEETS & RESOURCES
 </span>
 <div className="space-y-2">
 {currentLesson.resources.map((res, i) => (
 <div
 key={i}
 className="flex items-center justify-between p-2.5 border border-border bg-background text-xs"
 >
 <div className="flex items-center gap-2">
 <Download className="size-3.5 text-primary" />
 <span className="font-medium text-foreground">{res.title}</span>
 </div>
 <Badge variant="outline" className="text-[0.6rem] font-mono rounded-none">
 {res.type}
 </Badge>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Bottom Stepper Controls */}
 <div className="border-t border-border pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
 {prevLesson ? (
 <Button
 asChild
 variant="outline"
 className="rounded-none text-xs h-9 w-full sm:w-auto gap-1.5"
 >
 <Link to={`/lms/learn/${track.id}/${prevLesson.id}`}>
 <ChevronLeft className="size-3.5" />
 Previous: {prevLesson.title}
 </Link>
 </Button>
 ) : (
 <div />
 )}

 <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
 {currentModule?.quiz && (
 <Button
 asChild
 variant="outline"
 className="rounded-none text-xs h-9 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground gap-1.5"
 >
 <Link to={`/lms/quiz/${track.id}/${currentModule.id}`}>
 <HelpCircle className="size-3.5" />
 Module Quiz
 </Link>
 </Button>
 )}

 <Button
 onClick={handleNext}
 className="rounded-none text-xs h-9 w-full sm:w-auto gap-1.5"
 >
 {nextLesson ? (
 <>
 Next Lesson
 <ChevronRight className="size-3.5" />
 </>
 ) : (
 <>
 Complete Module
 <CheckCircle2 className="size-3.5" />
 </>
 )}
 </Button>
 </div>
 </div>
 </div>
 </main>
 </div>
 </div>
 );
}
