import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { CURRICULUM_TRACKS } from '../data/lmsCurriculumData';
import { useLmsProgress } from '../lib/lmsProgressContext';
import { PageHero } from '@/components/ui/page-hero';
import { lmsEditorialIllustrations } from '@/lib/editorialIllustrations';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
 BookOpen,
 CheckCircle2,
 PlayCircle,
 HelpCircle,
 ArrowRight,
 ChevronLeft,
 Check,
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function LmsTrackDetail() {
 const { trackId } = useParams<{ trackId: string }>();
 const navigate = useNavigate();
 const { isEnrolled, enrollTrack, getTrackProgress, isLessonCompleted, getQuizAttempt } =
 useLmsProgress();

 const track = useMemo(
 () => CURRICULUM_TRACKS.find((t) => t.id === trackId) || CURRICULUM_TRACKS[0],
 [trackId],
 );

 const enrolled = isEnrolled(track.id);
 const progress = getTrackProgress(track.id);
 const firstLesson = track.modules[0]?.lessons[0];

 const handleStartLearning = () => {
 if (!enrolled) {
 enrollTrack(track.id);
 }
 if (firstLesson) {
 navigate(`/lms/learn/${track.id}/${firstLesson.id}`);
 }
 };

 const runtimeBase = import.meta.env.BASE_URL || '/';
 const portraitUrl = `${runtimeBase.endsWith('/') ? runtimeBase : `${runtimeBase}/`}images/editorial/${track.councilLead.portraitFilename}`;

 return (
 <div className="flex-1 w-full">
 {/* ── Breadcrumb & Top Bar ── */}
 <div className="border-b border-border bg-card/60 px-4 sm:px-8 py-3">
 <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-muted-foreground font-mono">
 <Link to="/lms" className="hover:text-foreground flex items-center gap-1">
 <ChevronLeft className="size-3.5" />
 Learning Portal
 </Link>
 <span>/</span>
 <span className="text-foreground font-medium">{track.code}</span>
 </div>
 </div>

 {/* ── Track Hero Section ── */}
 <PageHero
 eyebrow={`Curriculum Track // ${track.code}`}
 title={track.title}
 illustration={lmsEditorialIllustrations.curriculumPathway}
 description={track.description}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* ── Main Syllabus Column (2 Cols) ── */}
 <div className="lg:col-span-2 space-y-8">
 {/* Action Bar: Enrollment & Progress Status */}
 <div className="border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
 <div>
 <div className="flex items-center gap-2 mb-1.5">
 <Badge variant="outline" className="font-mono text-xs rounded-none">
 {track.level} Level
 </Badge>
 {enrolled && (
 <Badge variant="role" className="rounded-none text-xs">
 Enrolled
 </Badge>
 )}
 </div>
 <h2 className="text-lg font-heading font-medium text-foreground">
 {enrolled ? 'Your Learning Pathway' : 'Enroll in this Track'}
 </h2>
 <p className="text-xs text-muted-foreground mt-0.5">
 {enrolled
 ? `${progress.completedLessons} of ${progress.totalLessons} lessons completed (${progress.percentage}%)`
 : 'Access full video modules, exercises, diagnostic quizzes, and council certification.'}
 </p>
 </div>

 <Button
 onClick={handleStartLearning}
 className="rounded-none text-xs h-10 px-6 gap-2 shrink-0 w-full sm:w-auto"
 >
 {enrolled ? 'Resume Track' : 'Enroll & Begin'}
 <ArrowRight className="size-4" />
 </Button>
 </div>

 {/* Modules Syllabus Breakdown */}
 <div>
 <div className="flex items-center justify-between mb-4">
 <h3 className="text-xl font-heading font-medium text-foreground">
 Curriculum Modules & Lessons
 </h3>
 <span className="text-xs font-mono text-muted-foreground">
 {track.modules.length} Modules • {progress.totalLessons} Lessons
 </span>
 </div>

 <div className="space-y-4">
 {track.modules.map((module) => {
 const quizResult = getQuizAttempt(module.id);

 return (
 <div
 key={module.id}
 className="border border-border bg-card overflow-hidden"
 >
 {/* Module Header */}
 <div className="p-4 sm:p-5 border-b border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
 <div>
 <div className="flex items-center gap-2 mb-1">
 <span className="text-xs font-mono text-primary font-medium">
 MODULE {module.order}
 </span>
 <span className="text-xs text-muted-foreground font-mono">
 // {module.estimatedHours} Hours
 </span>
 </div>
 <h4 className="text-base font-heading font-medium text-foreground">
 {module.title}
 </h4>
 <p className="text-xs text-muted-foreground mt-1">
 {module.description}
 </p>
 </div>

 {module.quiz && (
 <Button
 asChild
 variant={quizResult?.passed ? 'outline' : 'secondary'}
 size="sm"
 className="rounded-none text-xs h-8 shrink-0 gap-1.5"
 >
 <Link to={`/lms/quiz/${track.id}/${module.id}`}>
 <HelpCircle className="size-3.5" />
 {quizResult ? `Quiz: ${quizResult.percentage}%` : 'Take Quiz'}
 </Link>
 </Button>
 )}
 </div>

 {/* Lessons List in Module */}
 <div className="divide-y divide-border/60">
 {module.lessons.map((lesson) => {
 const completed = isLessonCompleted(lesson.id);

 return (
 <div
 key={lesson.id}
 className="p-4 flex items-center justify-between gap-4 hover:bg-muted/10 transition-colors"
 >
 <div className="flex items-start gap-3 min-w-0">
 <div
 className={cn(
 'size-6 shrink-0 mt-0.5 border flex items-center justify-center text-xs',
 completed
 ? 'bg-primary border-primary text-primary-foreground'
 : 'border-border text-muted-foreground bg-background',
 )}
 >
 {completed ? (
 <Check className="size-3.5 stroke-[3]" />
 ) : lesson.type === 'video' ? (
 <PlayCircle className="size-3.5" />
 ) : (
 <BookOpen className="size-3.5" />
 )}
 </div>
 <div>
 <Link
 to={`/lms/learn/${track.id}/${lesson.id}`}
 className="text-sm font-medium text-foreground hover:text-primary transition-colors block"
 >
 {lesson.title}
 </Link>
 <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
 {lesson.summary}
 </p>
 </div>
 </div>

 <div className="flex items-center gap-3 shrink-0">
 <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
 {lesson.durationMinutes} min
 </span>
 <Button
 asChild
 variant="ghost"
 size="sm"
 className="rounded-none text-xs h-8 px-2.5"
 >
 <Link to={`/lms/learn/${track.id}/${lesson.id}`}>
 Launch
 <ArrowRight className="size-3 ml-1" />
 </Link>
 </Button>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Learning Outcomes Checklist */}
 <div className="border border-border bg-card p-6">
 <h3 className="text-base font-heading font-medium text-foreground mb-4 flex items-center gap-2">
 <CheckCircle2 className="size-4 text-primary" />
 Verified Learning Outcomes
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {track.learningOutcomes.map((outcome, idx) => (
 <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
 <span className="size-1.5 bg-primary shrink-0 mt-1.5" />
 <span className="leading-relaxed">{outcome}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* ── Sidebar Meta Column (1 Col) ── */}
 <div className="space-y-6">
 {/* Council Advisor Card */}
 <div className="border border-border bg-card p-6">
 <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground block mb-3">
 CURRICULUM LEAD & ADVISOR
 </span>

 <div className="flex items-center gap-3.5 mb-4">
 <img
 src={portraitUrl}
 alt={track.councilLead.name}
 className="size-14 object-cover border border-border bg-background shrink-0"
 />
 <div>
 <h4 className="text-sm font-heading font-medium text-foreground">
 {track.councilLead.name}
 </h4>
 <p className="text-xs text-primary font-medium mt-0.5">
 {track.councilLead.title}
 </p>
 <p className="text-[0.65rem] text-muted-foreground mt-0.5">
 {track.councilLead.affiliation}
 </p>
 </div>
 </div>

 <p className="text-xs text-muted-foreground leading-relaxed pt-3 border-t border-border/80">
 This curriculum track is designed and vetted by members of the EduPlus Global Expert Council to ensure alignment with international standards and real-world industrial expectations.
 </p>

 <Button
 asChild
 variant="outline"
 size="sm"
 className="w-full mt-4 rounded-none text-xs border-border"
 >
 <Link to="/council">View Full Expert Council</Link>
 </Button>
 </div>

 {/* Quick Specs */}
 <div className="border border-border bg-card p-6 divide-y divide-border/60">
 <div className="pb-3">
 <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground block">
 ESTIMATED EFFORT
 </span>
 <span className="text-sm font-medium text-foreground mt-0.5 block">
 {track.estimatedWeeks} Weeks ({track.totalHours} Total Hours)
 </span>
 </div>

 <div className="py-3">
 <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground block">
 ACCREDITATION
 </span>
 <span className="text-sm font-medium text-foreground mt-0.5 block">
 {track.certificationTitle}
 </span>
 </div>

 <div className="py-3">
 <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground block">
 TARGET AUDIENCE
 </span>
 <span className="text-xs text-muted-foreground mt-0.5 block leading-relaxed">
 {track.targetAudience}
 </span>
 </div>

 <div className="pt-3">
 <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
 PREREQUISITES
 </span>
 <ul className="space-y-1">
 {track.prerequisites.map((pre, i) => (
 <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
 <span className="size-1 bg-primary shrink-0" />
 {pre}
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
