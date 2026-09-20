import React from 'react';
import { Link } from 'react-router';
import type { CurriculumTrack } from '../../types/lms';
import { useLmsProgress } from '../../lib/lmsProgressContext';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface TrackCardProps {
  readonly track: CurriculumTrack;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const { isEnrolled, getTrackProgress, enrollTrack } = useLmsProgress();
  const enrolled = isEnrolled(track.id);
  const progress = getTrackProgress(track.id);

  const firstLessonId = track.modules[0]?.lessons[0]?.id;

  const handleEnrollClick = () => {
    if (!enrolled) {
      enrollTrack(track.id);
    }
  };

  const runtimeBase = import.meta.env.BASE_URL || '/';
  const portraitUrl = `${runtimeBase.endsWith('/') ? runtimeBase : `${runtimeBase}/`}images/editorial/${track.councilLead.portraitFilename}`;

  return (
    <div className="border border-border bg-card flex flex-col justify-between transition-all duration-200 hover:border-primary/50 group">
      <div className="p-5 sm:p-6">
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

        {/* Title and Tagline */}
        <h3 className="text-lg font-heading font-medium text-foreground group-hover:text-primary transition-colors mb-1.5 leading-snug">
          {track.title}
        </h3>
        <p className="text-xs text-primary/90 font-medium mb-3">
          {track.tagline}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {track.description}
        </p>

        {/* Council Advisor Linkage */}
        <div className="flex items-center gap-2.5 py-3 border-t border-b border-border/60 bg-muted/20 px-3 my-4">
          <img
            src={portraitUrl}
            alt={track.councilLead.name}
            className="size-8 object-cover border border-border shrink-0 bg-background"
            onError={(e) => {
              // fallback if missing
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-foreground truncate">
              {track.councilLead.name}
            </p>
            <p className="text-[0.65rem] text-muted-foreground truncate">
              {track.councilLead.affiliation}
            </p>
          </div>
        </div>

        {/* Meta Stats: Hours, Modules, Weeks */}
        <div className="grid grid-cols-3 gap-2 text-center py-1 font-mono text-[0.7rem] text-muted-foreground">
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
            <span className="text-[0.6rem] text-muted-foreground uppercase">Syllabus</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Progress & Navigation CTA */}
      <div className="p-4 sm:p-5 border-t border-border bg-muted/10 flex flex-col gap-3">
        {enrolled && (
          <div>
            <div className="flex justify-between text-[0.65rem] font-mono text-muted-foreground mb-1">
              <span>{progress.completedLessons} of {progress.totalLessons} Lessons Done</span>
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

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant={enrolled ? 'default' : 'outline'}
            className="flex-1 rounded-none text-xs h-9 justify-center gap-1.5"
            onClick={handleEnrollClick}
          >
            <Link
              to={
                enrolled && firstLessonId
                  ? `/lms/learn/${track.id}/${firstLessonId}`
                  : `/lms/tracks/${track.id}`
              }
            >
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
            asChild
            variant="ghost"
            className="rounded-none text-xs h-9 px-3 text-muted-foreground hover:text-foreground"
          >
            <Link to={`/lms/tracks/${track.id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
