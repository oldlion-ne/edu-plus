import { useMemo, useState } from 'react';
import { calculateMedian } from '../lib/algorithms/maths';
import { Link } from 'react-router';
import { CURRICULUM_TRACKS, CATEGORY_METADATA } from '../data/lmsCurriculumData';
import { useLmsProgress } from '../lib/lmsProgressContext';
import { TrackCard } from '../components/lms/TrackCard';
import { CertificateModal } from '../components/lms/CertificateModal';
import { LearningPathOptimizer } from '../components/LearningPathOptimizer';
import { StudyScheduler } from '../components/lms/StudyScheduler';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import type { CertificateData, CurriculumTrack } from '../types/lms';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Target,
  FileCheck,
} from 'lucide-react';

export default function LmsHub() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);

  const { progress, getOverallStats, getTrackProgress, isEnrolled } = useLmsProgress();
  const overallStats = getOverallStats();

  const activeTrack = useMemo(() => {
    if (!progress.lastActiveLesson) return CURRICULUM_TRACKS[0];
    return (
      CURRICULUM_TRACKS.find((t) => t.id === progress.lastActiveLesson?.trackId) ||
      CURRICULUM_TRACKS[0]
    );
  }, [progress.lastActiveLesson]);

  const enrolledTracks = useMemo(() => {
    return CURRICULUM_TRACKS.filter((track) => isEnrolled(track.id));
  }, [isEnrolled]);

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

  const quizScores = Object.values(progress.quizAttempts).map(attempt => attempt.percentage);
  const medianScore = quizScores.length > 0 ? Math.round(calculateMedian(quizScores)) : 0;

  return (
    <div className="flex flex-col flex-1 w-full relative z-0 pb-16">
      {/* ── Dynamic Dashboard Hero ── */}
      <div className="bg-muted/20 border-b border-border">
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
            <div className="max-w-2xl flex-1">
              <h1 className="text-4xl md:text-5xl font-heading font-medium text-foreground tracking-tight mb-4">
                Welcome back, Learner.
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Monitor your psychometric milestones, engage with your core curriculum modules, and evaluate your AI-optimized learning paths.
              </p>
              
              {/* ── Active Learner Jump Bar (Integrated) ── */}
              {activeTrack && progress.lastActiveLesson && (
                <div className="border border-primary/40 bg-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-xl">
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
                  </div>
                  <Button
                    asChild
                    className="rounded-none text-xs h-10 px-6 gap-2 whitespace-nowrap"
                  >
                    <Link to={`/lms/learn/${activeTrack.id}/${progress.lastActiveLesson.lessonId}`}>
                      Resume Lesson
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* ── High-level Stats Embedded in Hero ── */}
            <div className="w-full lg:w-auto grid grid-cols-2 gap-3 sm:gap-4 lg:min-w-[400px]">
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
                <span className="text-[0.65rem] font-mono uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Target className="size-3.5" />
                  Median Score
                </span>
                <div className="mt-2">
                  <span className="text-2xl sm:text-3xl font-heading font-medium text-primary">
                    {medianScore}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1.5 font-mono">
                    median
                  </span>
                </div>
              </div>
              
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
                    / {CURRICULUM_TRACKS.length}
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
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-12 mt-12 sm:mt-16">
        
        {/* ── Tools & Schedulers ── */}
        <div className="mb-16 grid grid-cols-1 xl:grid-cols-2 gap-8">
          <LearningPathOptimizer />
          <StudyScheduler />
        </div>

        {/* ── Enrolled Tracks Carousel ── */}
        {enrolledTracks.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-heading font-medium text-foreground mb-6">Continue Learning</h2>
            <Carousel opts={{ align: 'start', loop: false }} className="w-full">
              <CarouselContent className="-ml-4 pb-4">
                {enrolledTracks.map(track => (
                  <CarouselItem key={track.id} className="pl-4 basis-auto">
                    <TrackCard track={track} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end gap-2 mt-2 border-t border-border pt-4">
                <CarouselPrevious className="static transform-none h-9 w-9 rounded-none border-border hover:bg-muted/50 transition-colors" />
                <CarouselNext className="static transform-none h-9 w-9 rounded-none border-border hover:bg-muted/50 transition-colors" />
              </div>
            </Carousel>
          </div>
        )}

        {/* ── Categorized Carousels ── */}
        {Object.entries(CATEGORY_METADATA).map(([key, meta]) => {
          const categoryTracks = CURRICULUM_TRACKS.filter(t => t.category === key);
          if (categoryTracks.length === 0) return null;

          return (
            <div key={key} className="mb-16">
              <h2 className="text-2xl font-heading font-medium text-foreground mb-2">{meta.label}</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-3xl">Explore specialized curriculum modules tailored for {meta.label.toLowerCase()} pathways.</p>
              
              <Carousel opts={{ align: 'start', loop: false, dragFree: true }} className="w-full">
                <CarouselContent className="-ml-4 pb-4">
                  {categoryTracks.map(track => (
                    <CarouselItem key={track.id} className="pl-4 basis-auto">
                      <TrackCard track={track} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-2 border-t border-border pt-4">
                  <CarouselPrevious className="static transform-none h-9 w-9 rounded-none border-border hover:bg-muted/50 transition-colors" />
                  <CarouselNext className="static transform-none h-9 w-9 rounded-none border-border hover:bg-muted/50 transition-colors" />
                </div>
              </Carousel>
            </div>
          );
        })}
        {/* ── Completed Credentials Archive ── */}
        <div className="border-t border-border pt-10 mt-8">
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
