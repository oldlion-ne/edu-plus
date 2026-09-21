import React from 'react';
import { useNavigate } from 'react-router';
import type { CurriculumTrack } from '../../types/lms';
import { useLmsProgress } from '../../lib/lmsProgressContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '../ui/dialog';
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
  Check,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface CourseDetailsDialogProps {
  track: CurriculumTrack | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CourseDetailsDialog: React.FC<CourseDetailsDialogProps> = ({
  track,
  isOpen,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  const { isEnrolled, enrollTrack, getTrackProgress, isLessonCompleted, getQuizAttempt } =
    useLmsProgress();

  if (!track) return null;

  const enrolled = isEnrolled(track.id);
  const progress = getTrackProgress(track.id);
  const firstLesson = track.modules[0]?.lessons[0];

  const handleStartLearning = () => {
    if (!enrolled) {
      enrollTrack(track.id);
    }
    if (firstLesson) {
      onOpenChange(false);
      navigate(`/lms/learn/${track.id}/${firstLesson.id}`);
    }
  };

  const runtimeBase = import.meta.env.BASE_URL || '/';
  const portraitUrl = `${runtimeBase.endsWith('/') ? runtimeBase : `${runtimeBase}/`}images/editorial/${track.councilLead.portraitFilename}`;
  const coverUrl = `${runtimeBase.endsWith('/') ? runtimeBase : `${runtimeBase}/`}images/lms-covers/${track.category}.jpg`;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-background border-border rounded-none shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Dark Hero Banner similar to Udemy */}
        <div className="relative bg-card border-b border-border pt-12 pb-6 px-6 sm:pt-14 sm:pb-8 sm:px-8 shrink-0 overflow-hidden">
          {/* Background Image Blend */}
          <div className="absolute inset-0 z-0">
            <img 
              src={coverUrl} 
              alt={track.category}
              className="w-full h-full object-cover mix-blend-luminosity opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/50" />
          </div>

          <div className="relative z-10 flex flex-wrap gap-8 justify-between items-start">
            <div className="flex-1 min-w-[280px]">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="font-mono text-xs rounded-none border-primary/30 text-primary">
                  {track.code}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono uppercase">{track.level}</span>
                {enrolled && (
                  <Badge variant="role" className="rounded-none text-xs">
                    Enrolled
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-heading font-medium text-foreground mb-3 leading-tight">
                {track.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {track.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-primary"/> {progress.totalLessons} Lessons</span>
                <span className="flex items-center gap-1.5"><BookOpen className="size-3.5 text-primary"/> {track.estimatedWeeks} Weeks</span>
                <span>{track.targetAudience}</span>
              </div>
            </div>

            {/* Sticky-like Action Box */}
            <div className="shrink-0 w-full sm:w-72 border border-primary/20 bg-background/95 backdrop-blur-sm p-5 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <span className="text-[0.65rem] font-mono text-muted-foreground uppercase tracking-wider">Status</span>
                <span className="text-sm font-medium text-foreground">
                  {enrolled ? `${progress.percentage}% Complete` : 'Not Enrolled'}
                </span>
              </div>
              <Button
                onClick={handleStartLearning}
                className="w-full rounded-none text-xs h-10 gap-2"
              >
                {enrolled ? 'Resume Learning' : 'Start Subscription'}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area - Waterfall Layout */}
        <ScrollArea className="flex-1 h-full">
          <div className="p-6 sm:p-8 flex flex-col gap-8 max-w-3xl mx-auto w-full">
            
            {/* Learning Outcomes Checklist */}
            <div className="border border-border bg-card p-6 sm:p-8">
              <h3 className="text-base font-heading font-medium text-foreground mb-5 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                What you'll learn
              </h3>
              <div className="flex flex-col gap-4">
                {track.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="size-1.5 bg-primary shrink-0 mt-2" />
                    <span className="leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata & Advisor Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Council Advisor Card */}
              <div className="border border-border bg-card p-6">
                <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground block mb-4">
                  Curriculum Lead
                </span>
                <div className="flex items-center gap-4">
                  <img
                    src={portraitUrl}
                    alt={track.councilLead.name}
                    className="size-14 object-cover border border-border bg-background shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-heading font-medium text-foreground leading-snug">
                      {track.councilLead.name}
                    </h4>
                    <p className="text-[0.65rem] text-muted-foreground mt-1 leading-relaxed">
                      {track.councilLead.affiliation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="border border-border bg-card p-6 flex flex-col justify-center divide-y divide-border/60">
                <div className="pb-4">
                  <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                    Accreditation
                  </span>
                  <span className="text-sm font-medium text-foreground leading-snug block">
                    {track.certificationTitle}
                  </span>
                </div>
                
                <div className="pt-4">
                  <span className="text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                    Prerequisites
                  </span>
                  <ul className="space-y-1.5">
                    {track.prerequisites.map((pre, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="size-1 bg-primary shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{pre}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modules Syllabus Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-heading font-medium text-foreground">
                  Course content
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  {track.modules.length} modules • {track.totalHours} total hours
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
                      <div className="p-4 sm:p-5 border-b border-border bg-muted/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-foreground font-medium leading-snug">
                              Module {module.order}: {module.title}
                            </span>
                          </div>
                        </div>
                        {module.quiz && (
                          <Badge variant={quizResult?.passed ? 'outline' : 'secondary'} className="rounded-none text-[0.65rem] shrink-0 font-mono">
                            {quizResult ? `Quiz: ${quizResult.percentage}%` : 'Includes Quiz'}
                          </Badge>
                        )}
                      </div>

                      <div className="divide-y divide-border/60">
                        {module.lessons.map((lesson) => {
                          const completed = isLessonCompleted(lesson.id);

                          return (
                            <div
                              key={lesson.id}
                              className="p-4 px-5 flex items-center justify-between gap-4 hover:bg-muted/10 transition-colors"
                            >
                              <div className="flex items-start gap-3.5 min-w-0">
                                <div
                                  className={cn(
                                    'size-5 shrink-0 mt-0.5 flex items-center justify-center text-xs',
                                    completed ? 'text-primary' : 'text-muted-foreground'
                                  )}
                                >
                                  {completed ? (
                                    <Check className="size-4" />
                                  ) : lesson.type === 'video' ? (
                                    <PlayCircle className="size-4" />
                                  ) : (
                                    <BookOpen className="size-4" />
                                  )}
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-foreground block leading-snug">
                                    {lesson.title}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 shrink-0">
                                <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                                  {lesson.durationMinutes} min
                                </span>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="text-xs h-auto p-0 text-primary underline-offset-4 hover:underline"
                                  onClick={() => {
                                    onOpenChange(false);
                                    navigate(`/lms/learn/${track.id}/${lesson.id}`);
                                  }}
                                >
                                  Preview
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

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
