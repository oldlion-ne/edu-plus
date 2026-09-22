import { useState } from 'react';
import { CURRICULUM_TRACKS } from '../../data/lmsCurriculumData';
import { Link } from 'react-router';
import { ExternalLink } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function LmsManager() {
  const [selectedTrackId, setSelectedTrackId] = useState(CURRICULUM_TRACKS[0].id);
  const selectedTrack =
    CURRICULUM_TRACKS.find((t) => t.id === selectedTrackId) || CURRICULUM_TRACKS[0];

  const totalModules = CURRICULUM_TRACKS.reduce((acc, t) => acc + t.modules.length, 0);
  const totalLessons = CURRICULUM_TRACKS.reduce(
    (acc, t) => acc + t.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0),
    0,
  );

  return (
    <div className="flex flex-col gap-7 animate-in fade-in duration-300 w-full">
      <div className="page-head">
        <h1>Courses</h1>
        <span className="sub">Tracks, modules, and lesson contents</span>
        <div className="act">
          <Link to={`/lms/tracks/${selectedTrack.id}`} target="_blank" className="btn btn-p btn-sm">
            Preview in LMS <ExternalLink className="size-3.5 ml-1" />
          </Link>
        </div>
      </div>

      <div className="stack flex flex-col gap-7">
        {/* Header telemetry stats */}
        <div className="stats">
          <div className="card stat p-[18px_20px]">
            <div className="text-[13px] text-muted-foreground">Tracks</div>
            <div className="font-heading text-[32px] leading-[1.2] mt-0.5 text-foreground font-normal tabular-nums">{CURRICULUM_TRACKS.length}</div>
          </div>
          <div className="card stat p-[18px_20px]">
            <div className="text-[13px] text-muted-foreground">Modules</div>
            <div className="font-heading text-[32px] leading-[1.2] mt-0.5 text-foreground font-normal tabular-nums">{totalModules}</div>
          </div>
          <div className="card stat p-[18px_20px]">
            <div className="text-[13px] text-muted-foreground">Lessons</div>
            <div className="font-heading text-[32px] leading-[1.2] mt-0.5 text-foreground font-normal tabular-nums">{totalLessons}</div>
          </div>
          <div className="card stat p-[18px_20px]">
            <div className="text-[13px] text-muted-foreground">Tiers</div>
            <div className="font-heading text-[32px] leading-[1.2] mt-0.5 text-foreground font-normal tabular-nums">6</div>
          </div>
        </div>

        {/* Master-Detail Split Workspace */}
        <div className="split">
          {/* Left Track List */}
          <div className="split-list">
            {CURRICULUM_TRACKS.map((track) => {
              const isSelected = track.id === selectedTrackId;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrackId(track.id)}
                  className={`tr-row ${isSelected ? 'on' : ''}`}
                >
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="code">{track.code}</span>
                    <span className="lvl">{track.level}</span>
                  </div>
                  <div className="tt">{track.title}</div>
                  <div className="ld">Lead: {track.councilLead.name}</div>
                </button>
              );
            })}
          </div>

          {/* Right Track Detail Panel */}
          <div className="split-detail">
            <div className="font-mono text-[11.5px] text-primary tracking-wide">
              {selectedTrack.code}&nbsp;&nbsp;·&nbsp;&nbsp;{selectedTrack.estimatedWeeks} WEEKS&nbsp;&nbsp;·&nbsp;&nbsp;{selectedTrack.totalHours} HOURS
            </div>
            <h2 className="font-heading text-xl font-normal text-foreground mt-2 mb-1">
              {selectedTrack.title}
            </h2>
            <p className="text-[14px] text-muted-foreground">
              {selectedTrack.tagline}
            </p>
            
            <div className="hr" />

            <h3 className="font-sans text-[16px] font-semibold text-foreground mb-4">
              Syllabus · {selectedTrack.modules.length} modules
            </h3>
            
            <Accordion type="single" collapsible className="w-full">
              {selectedTrack.modules.map((m) => (
                <AccordionItem key={m.id} value={m.id} className="border-border/40">
                  <AccordionTrigger className="hover:no-underline py-4 group">
                    <div className="flex flex-1 justify-between items-baseline gap-3 pr-4">
                      <span className="font-semibold text-foreground text-[14.5px] group-hover:text-primary transition-colors">
                        Module {m.order} · {m.title}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground shrink-0">
                        {m.estimatedHours}h · {m.lessons.length} lessons
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2 pb-1">
                      {m.lessons.map((l, idx) => (
                        <div key={l.id} className="flex justify-between items-baseline gap-3 text-[13.5px] text-muted-foreground pl-1 border-l-2 border-primary/20 hover:border-primary transition-colors">
                          <span className="pl-3">{idx + 1}. {l.title}</span>
                          <span className="font-mono text-[11px] shrink-0">
                            {l.durationMinutes}m · {l.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
              <span className="font-mono text-[11px] text-muted-foreground">
                Council Certified Track
              </span>
              <Link to={`/lms/tracks/${selectedTrack.id}`} target="_blank" className="btn btn-q btn-sm">
                Open Course Player <ExternalLink className="size-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
