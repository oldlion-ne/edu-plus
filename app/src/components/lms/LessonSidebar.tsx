import React from 'react';
import { Link } from 'react-router';
import type { CurriculumTrack, LmsLesson } from '../../types/lms';
import { useLmsProgress } from '../../lib/lmsProgressContext';
import { Check, PlayCircle, BookOpen, HelpCircle, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';

interface LessonSidebarProps {
  readonly track: CurriculumTrack;
  readonly activeLessonId: string;
  readonly onCloseMobile?: () => void;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({
  track,
  activeLessonId,
  onCloseMobile,
}) => {
  const { isLessonCompleted, getTrackProgress, getQuizAttempt } = useLmsProgress();
  const progressStats = getTrackProgress(track.id);

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-card border-r border-border flex flex-col h-full overflow-hidden">
      {/* Track Header & Progress */}
      <div className="p-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="outline" className="text-[0.6rem] font-mono rounded-none">
            {track.code}
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">
            {progressStats.percentage}% COMPLETE
          </span>
        </div>
        <h2 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
          {track.title}
        </h2>

        {/* Straight-line Progress Bar */}
        <div className="w-full bg-muted h-1 mt-3 overflow-hidden rounded-none">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${progressStats.percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[0.65rem] text-muted-foreground mt-1.5 font-mono">
          <span>{progressStats.completedLessons} of {progressStats.totalLessons} lessons done</span>
          <span>{track.totalHours}h total</span>
        </div>
      </div>

      {/* Syllabus Tree */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 [scrollbar-gutter:stable]">
        {track.modules.map((module) => {
          const quizResult = getQuizAttempt(module.id);

          return (
            <div key={module.id} className="border border-border/80 bg-background/50">
              {/* Module Title Header */}
              <div className="p-3 border-b border-border/60 bg-muted/30">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                  MODULE {module.order} // {module.estimatedHours}H
                </span>
                <h3 className="text-xs font-medium text-foreground leading-tight">
                  {module.title}
                </h3>
              </div>

              {/* Lessons List */}
              <div className="divide-y divide-border/40">
                {module.lessons.map((lesson: LmsLesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isDone = isLessonCompleted(lesson.id);

                  return (
                    <Link
                      key={lesson.id}
                      to={`/lms/learn/${track.id}/${lesson.id}`}
                      onClick={onCloseMobile}
                      className={cn(
                        'flex items-center gap-2.5 p-2.5 text-xs transition-colors hover:bg-muted/40 text-left group',
                        isActive && 'bg-primary/10 border-l-2 border-primary text-foreground font-medium',
                        !isActive && 'text-muted-foreground',
                      )}
                    >
                      {/* State Indicator Icon */}
                      <div
                        className={cn(
                          'size-4 shrink-0 flex items-center justify-center border text-[0.6rem] transition-colors',
                          isDone
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-border bg-background text-muted-foreground',
                          isActive && !isDone && 'border-primary text-primary',
                        )}
                      >
                        {isDone ? (
                          <Check className="size-3 stroke-[3]" />
                        ) : lesson.type === 'video' ? (
                          <PlayCircle className="size-2.5" />
                        ) : (
                          <BookOpen className="size-2.5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={cn('truncate leading-snug', isActive ? 'text-foreground' : '')}>
                          {lesson.title}
                        </p>
                        <span className="text-[0.65rem] text-muted-foreground font-mono">
                          {lesson.durationMinutes}m • {lesson.type}
                        </span>
                      </div>

                      {isActive && <ChevronRight className="size-3 text-primary shrink-0" />}
                    </Link>
                  );
                })}

                {/* Module Quiz link if quiz exists */}
                {module.quiz && (
                  <Link
                    to={`/lms/quiz/${track.id}/${module.id}`}
                    onClick={onCloseMobile}
                    className={cn(
                      'flex items-center gap-2.5 p-2.5 text-xs transition-colors hover:bg-muted/40 border-t border-dashed border-border/80',
                      quizResult?.passed ? 'text-green-600 bg-green-600/5' : 'text-primary/90 bg-primary/5',
                    )}
                  >
                    <HelpCircle className="size-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">Knowledge Assessment</p>
                      <span className="text-[0.65rem] font-mono">
                        {quizResult ? `Score: ${quizResult.percentage}% (${quizResult.passed ? 'PASSED' : 'RETRY'})` : 'Passing score: 70%'}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
