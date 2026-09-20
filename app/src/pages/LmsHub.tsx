import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { PageHero } from '@/components/ui/page-hero';
import { lmsEditorialIllustrations } from '@/lib/editorialIllustrations';
import { CURRICULUM_TRACKS, CATEGORY_METADATA } from '../data/lmsCurriculumData';
import { useLmsProgress } from '../lib/lmsProgressContext';
import { TrackCard } from '../components/lms/TrackCard';
import { CertificateModal } from '../components/lms/CertificateModal';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import type { CertificateData, CurriculumTrack } from '../types/lms';
import {
 BookOpen,
 Award,
 CheckCircle2,
 ArrowRight,
 Flame,
 FileCheck,
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function LmsHub() {
 const [activeCategory, setActiveCategory] = useState<string>('all');
 const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);

 const { progress, getOverallStats, getTrackProgress } = useLmsProgress();
 const overallStats = getOverallStats();

 const filteredTracks = useMemo(() => {
 if (activeCategory === 'all') return CURRICULUM_TRACKS;
 return CURRICULUM_TRACKS.filter((track) => track.category === activeCategory);
 }, [activeCategory]);

 const activeTrack = useMemo(() => {
 if (!progress.lastActiveLesson) return CURRICULUM_TRACKS[0];
 return (
 CURRICULUM_TRACKS.find((t) => t.id === progress.lastActiveLesson?.trackId) ||
 CURRICULUM_TRACKS[0]
 );
 }, [progress.lastActiveLesson]);

 const completedTracks = useMemo(() => {
 return CURRICULUM_TRACKS.filter((track) => {
 const { isCompleted } = getTrackProgress(track.id);
 return isCompleted;
 });
 }, [getTrackProgress]);

 const handleOpenCertificate = (track: CurriculumTrack) => {
 setSelectedCertificate({
 // eslint-disable-next-line react-hooks/purity
 certificateId: `EDU-CERT-${track.code}-${Math.floor(100000 + Math.random() * 900000)}`,
 recipientName: 'Verified EduPlus Candidate',
 trackTitle: track.title,
 trackCode: track.code,
 completionDate: new Date().toLocaleDateString('en-US', {
 month: 'long',
 day: 'numeric',
 year: 'numeric',
 }),
 verifiedAdvisor: track.councilLead.name,
 verifiedAdvisorTitle: track.councilLead.title,
 });
 };

 return (
 <div className="flex-1 w-full">
 {/* ── Typographic Hero with Bespoke Editorial Illustration ── */}
 <PageHero
 eyebrow="Skill Engineering & Curriculum Engine"
 title="Learning Portal (LMS)"
 illustration={lmsEditorialIllustrations.portalHero}
 description="Structured, self-paced mastery pathways bridging classrooms and high-impact careers. Complete modules, verify competencies with psychometrics, and earn accredited credentials signed by the EduPlus Council."
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* ── Learner Telemetry Deck (Straight-line metrics) ── */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
 <div className="border border-border bg-card p-4 sm:p-5 flex flex-col justify-between">
 <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
 <BookOpen className="size-3.5 text-primary" />
 Active Tracks
 </span>
 <div className="mt-2">
 <span className="text-2xl sm:text-3xl font-heading font-medium text-foreground">
 {overallStats.totalEnrolled}
 </span>
 <span className="text-xs text-muted-foreground ml-1.5 font-mono">
 / {CURRICULUM_TRACKS.length} available
 </span>
 </div>
 </div>

 <div className="border border-border bg-card p-4 sm:p-5 flex flex-col justify-between">
 <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
 <CheckCircle2 className="size-3.5 text-primary" />
 Lessons Completed
 </span>
 <div className="mt-2">
 <span className="text-2xl sm:text-3xl font-heading font-medium text-foreground">
 {overallStats.totalCompletedLessons}
 </span>
 <span className="text-xs text-muted-foreground ml-1.5 font-mono">
 milestones
 </span>
 </div>
 </div>

 <div className="border border-border bg-card p-4 sm:p-5 flex flex-col justify-between">
 <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
 <Flame className="size-3.5 text-primary" />
 Competency Quizzes
 </span>
 <div className="mt-2">
 <span className="text-2xl sm:text-3xl font-heading font-medium text-foreground">
 {Object.keys(progress.quizAttempts).length}
 </span>
 <span className="text-xs text-muted-foreground ml-1.5 font-mono">
 verified
 </span>
 </div>
 </div>

 <div className="border border-border bg-card p-4 sm:p-5 flex flex-col justify-between">
 <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
 <Award className="size-3.5 text-primary" />
 Credentials Earned
 </span>
 <div className="mt-2">
 <span className="text-2xl sm:text-3xl font-heading font-medium text-foreground">
 {overallStats.certificatesEarned}
 </span>
 <span className="text-xs text-muted-foreground ml-1.5 font-mono">
 certificates
 </span>
 </div>
 </div>
 </div>

 {/* ── Active Learner Jump Bar (If in progress) ── */}
 {activeTrack && progress.lastActiveLesson && (
 <div className="border border-primary/40 bg-primary/5 p-5 sm:p-6 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
 <div>
 <div className="flex items-center gap-2 mb-1">
 <Badge variant="role" className="rounded-none text-[0.6rem]">
 CONTINUE LEARNING
 </Badge>
 <span className="text-xs font-mono text-muted-foreground">
 {activeTrack.code}
 </span>
 </div>
 <h3 className="text-base sm:text-lg font-heading font-medium text-foreground">
 {activeTrack.title}
 </h3>
 <p className="text-xs text-muted-foreground mt-0.5">
 Resume right where you left off in your personalized curriculum pathway.
 </p>
 </div>
 <Button
 asChild
 className="rounded-none text-xs h-9 px-4 gap-2 whitespace-nowrap"
 >
 <Link to={`/lms/learn/${activeTrack.id}/${progress.lastActiveLesson.lessonId}`}>
 Resume Lesson
 <ArrowRight className="size-3.5" />
 </Link>
 </Button>
 </div>
 )}

 {/* ── Category Filter Tabs ── */}
 <div className="mb-8">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-xl font-heading font-medium text-foreground">
 Curriculum Tracks
 </h2>
 <span className="text-xs font-mono text-muted-foreground">
 Showing {filteredTracks.length} of {CURRICULUM_TRACKS.length} pathways
 </span>
 </div>

 <div className="flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
 {Object.entries(CATEGORY_METADATA).map(([key, meta]) => {
 const isActive = activeCategory === key;
 return (
 <button
 key={key}
 onClick={() => setActiveCategory(key)}
 className={cn(
 'px-3 py-1.5 text-xs whitespace-nowrap transition-colors border font-medium cursor-pointer',
 isActive
 ? 'bg-primary text-primary-foreground border-primary'
 : 'bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/40',
 )}
 >
 {meta.label}
 </button>
 );
 })}
 </div>
 </div>

 {/* ── Tracks Grid ── */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
 {filteredTracks.map((track) => (
 <TrackCard key={track.id} track={track} />
 ))}
 </div>

 {/* ── Completed Credentials Archive ── */}
 <div className="border-t border-border pt-10">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h3 className="text-lg font-heading font-medium text-foreground flex items-center gap-2">
 <Award className="size-5 text-primary" />
 Accredited Certificates & Credentials
 </h3>
 <p className="text-xs text-muted-foreground mt-1">
 Verifiable certificates generated upon passing all modules and competencies.
 </p>
 </div>
 </div>

 {completedTracks.length === 0 ? (
 <div className="border border-dashed border-border bg-muted/10 p-8 text-center">
 <FileCheck className="size-8 text-muted-foreground mx-auto mb-2 opacity-50" />
 <p className="text-sm font-medium text-foreground">
 No Certificates Earned Yet
 </p>
 <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1 mb-4">
 Complete all lesson milestones and pass the module assessments in any enrolled track to unlock your authenticated Council certificate.
 </p>
 <Button
 variant="outline"
 size="sm"
 className="rounded-none text-xs border-border"
 onClick={() => handleOpenCertificate(CURRICULUM_TRACKS[0])}
 >
 Preview Sample Credential
 </Button>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {completedTracks.map((track) => (
 <div
 key={track.id}
 className="border border-primary/40 bg-card p-5 flex flex-col justify-between"
 >
 <div>
 <div className="flex items-center justify-between mb-2">
 <Badge variant="role" className="rounded-none text-[0.6rem]">
 VERIFIED MASTERY
 </Badge>
 <span className="text-xs font-mono text-muted-foreground">
 {track.code}
 </span>
 </div>
 <h4 className="text-sm font-heading font-medium text-foreground">
 {track.title}
 </h4>
 <p className="text-xs text-muted-foreground mt-1">
 {track.certificationTitle}
 </p>
 </div>
 <Button
 variant="outline"
 size="sm"
 className="mt-4 rounded-none text-xs border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
 onClick={() => handleOpenCertificate(track)}
 >
 View Official Certificate
 </Button>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>

 {/* ── Certificate Preview Modal ── */}
 {selectedCertificate && (
 <CertificateModal
 isOpen={Boolean(selectedCertificate)}
 onClose={() => setSelectedCertificate(null)}
 certificate={selectedCertificate}
 />
 )}
 </div>
 );
}
