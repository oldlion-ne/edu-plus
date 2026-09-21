import React, { useState } from 'react';
import { Link } from 'react-router';
import type { CurriculumTrack } from '../../types/lms';
import { useLmsProgress } from '../../lib/lmsProgressContext';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CourseDetailsDialog } from './CourseDetailsDialog';

interface TrackCardProps {
  readonly track: CurriculumTrack;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isEnrolled, getTrackProgress, progress: globalProgress } = useLmsProgress();
  const enrolled = isEnrolled(track.id);
  const progress = getTrackProgress(track.id);

  const firstLessonId = track.modules[0]?.lessons[0]?.id;

  const runtimeBase = import.meta.env.BASE_URL || '/';
  const portraitUrl = `${runtimeBase.endsWith('/') ? runtimeBase : `${runtimeBase}/`}images/editorial/${track.councilLead.portraitFilename}`;

  const defaultHref = enrolled && globalProgress?.lastActiveLesson?.lessonId && globalProgress.lastActiveLesson.trackId === track.id
    ? `/lms/learn/${track.id}/${globalProgress.lastActiveLesson.lessonId}`
    : firstLessonId
      ? `/lms/learn/${track.id}/${firstLessonId}`
      : `/lms/tracks/${track.id}`;

  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="border border-border bg-card flex flex-col justify-between transition-all duration-200 hover:border-primary/50 group w-[320px] shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {/* Cover Block */}
          <div className="w-full h-32 bg-muted/30 border-b border-border/50 relative overflow-hidden shrink-0">
            <img 
              src={`${runtimeBase.endsWith('/') ? runtimeBase : `${runtimeBase}/`}images/lms-covers/${track.category}.jpg`} 
              alt={track.category}
              className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500"
              loading="lazy"
            />
          </div>

          <div className="p-4 sm:p-5 flex-1 flex flex-col">
            {/* Top metadata tags */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <Badge variant="outline" className="font-mono text-[0.65rem] rounded-none border-border">
                {track.code}
              </Badge>
              <div className="flex items-center gap-1.5">
                <span className="text-[0.65rem] font-mono text-muted-foreground uppercase">
                  {track.level}
                </span>
                {enrolled && (
                  <Badge variant="role" className="text-[0.6rem] rounded-none py-0">
                    Enrolled
                  </Badge>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base font-heading font-medium text-foreground group-hover:text-primary transition-colors mb-4 leading-snug line-clamp-2">
              {track.title}
            </h3>

            <div className="mt-auto">
              {/* Council Advisor Linkage */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-border/60">
                <img
                  src={portraitUrl}
                  alt={track.councilLead.name}
                  className="size-7 object-cover border border-border shrink-0 bg-background"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[0.7rem] font-medium text-foreground truncate">
                    {track.councilLead.name}
                  </p>
                  <p className="text-[0.6rem] text-muted-foreground truncate">
                    {track.councilLead.affiliation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar (Base Card) */}
          {enrolled && (
            <div className="px-5 pb-4">
              <div className="flex justify-between text-[0.6rem] font-mono text-muted-foreground mb-1.5">
                <span>{progress.completedLessons}/{progress.totalLessons}</span>
                <span className="text-foreground font-medium">{progress.percentage}%</span>
              </div>
              <div className="w-full bg-muted h-1 overflow-hidden rounded-none">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          )}
        </button>
      </HoverCardTrigger>

      <HoverCardContent side="right" align="start" className="w-[340px] p-0 rounded-none border border-border shadow-lg bg-card z-50">
        <div className="p-5">
          <h4 className="text-lg font-heading font-medium text-foreground mb-1 leading-snug">
            {track.title}
          </h4>
          <p className="text-xs text-primary/90 font-medium mb-3">
            {track.tagline}
          </p>
          <p className="text-[0.75rem] text-muted-foreground leading-relaxed mb-4">
            {track.description}
          </p>

          <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-border/60 font-mono text-[0.7rem] text-muted-foreground mb-4">
            <div className="border-r border-border/60 pr-1">
              <span className="text-foreground block font-medium">{track.estimatedWeeks} wks</span>
              <span className="text-[0.6rem] text-muted-foreground uppercase">Duration</span>
            </div>
            <div className="border-r border-border/60 pr-1">
              <span className="text-foreground block font-medium">{track.totalHours} hrs</span>
              <span className="text-[0.6rem] text-muted-foreground uppercase">Effort</span>
            </div>
            <div>
              <span className="text-foreground block font-medium">{track.modules.length} mods</span>
              <span className="text-[0.6rem] text-muted-foreground uppercase">Modules</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              asChild
              variant={enrolled ? 'default' : 'outline'}
              className="w-full rounded-none text-xs h-9 justify-center gap-1.5"
            >
              <Link to={defaultHref}>
                {enrolled ? (
                  progress.isCompleted ? (
                    <>
                      <CheckCircle2 className="size-3.5" />
                      Review Curriculum
                    </>
                  ) : (
                    <>
                      Resume Learning
                      <ArrowRight className="size-3.5" />
                    </>
                  )
                ) : (
                  <>
                    Explore Syllabus
                    <ArrowRight className="size-3.5" />
                  </>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full rounded-none text-xs h-9 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              onClick={() => setIsDialogOpen(true)}
            >
              Full Details
            </Button>
          </div>
        </div>
      </HoverCardContent>
      <CourseDetailsDialog track={track} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </HoverCard>
  );
};
