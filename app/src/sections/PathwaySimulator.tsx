import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

import { OpenAI }          from '@/components/ui/svgs/openai';
import { GoogleClassroom } from '@/components/ui/svgs/google-classroom';
import { GitHub }          from '@/components/ui/svgs/github';
import { LinkedIn }        from '@/components/ui/svgs/linkedin';
import { Slack }           from '@/components/ui/svgs/slack';
import { Zoom }            from '@/components/ui/svgs/zoom';

const INTEGRATIONS = [
  { icon: <OpenAI          className="size-7 text-foreground" />, name: 'OpenAI',           description: 'AI-powered pathway recommendations and personalised content generation.' },
  { icon: <GoogleClassroom className="size-7 text-foreground" />, name: 'Google Classroom', description: 'Sync assignments, grades, and learner progress from your existing LMS.' },
  { icon: <GitHub          className="size-7 text-foreground" />, name: 'GitHub',           description: 'Track hands-on project submissions and real-world portfolio development.' },
  { icon: <LinkedIn        className="size-7 text-foreground" />, name: 'LinkedIn',         description: 'Map verified credentials and pathway completions to learner profiles.' },
  { icon: <Slack           className="size-7 text-foreground" />, name: 'Slack',            description: 'Real-time cohort notifications, mentor alerts, and milestone feeds.' },
  { icon: <Zoom            className="size-7 text-foreground" />, name: 'Zoom',             description: 'Schedule and launch live mentorship sessions and group workshops.' },
];

export default function PathwaySimulator() {
  return (
    <section
      id="simulator"
      className="relative w-full bg-background border-t border-border/50 py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">

        {/* Section header */}
        <div className="mb-20">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-4 block">
            Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2] max-w-xl">
            Connect your favourite learning tools
          </h2>
          <p className="mt-5 text-[16px] text-muted-foreground leading-relaxed max-w-lg">
            EduPlus plugs into the platforms your learners and institutions already trust — syncing progress, credentials, and communication in one intelligent network.
          </p>
          <Button asChild variant="outline" size="md" className="mt-8 rounded-none border-foreground/30 text-foreground hover:border-foreground transition-colors duration-200">
            <Link to="/contact" /* ui-ignore */>
              Integrate
            </Link>
          </Button>
        </div>

        {/* 3-column integration grid — flat, borderless, no masks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-12">
          {INTEGRATIONS.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-4 p-10 bg-transparent transition-colors duration-200 hover:bg-secondary"
            >
              <div className="flex items-center justify-start">{item.icon}</div>
              <div>
                <h3 className="text-[17px] font-medium text-foreground mb-2">{item.name}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial — minimal, left-aligned, no avatar border box */}
        <div className="mt-24 pt-12 border-t border-border/50 max-w-2xl">
          <blockquote>
            <p className="text-[17px] text-foreground leading-relaxed font-light">
              "EduPlus bridges the gap between academic learning and real-world industry expectations — equipping learners with global competence from day one."
            </p>
            <footer className="mt-5 flex gap-2 text-[13px]">
              <cite className="font-medium text-foreground not-italic">Shri Rojit Keisham</cite>
              <span className="text-muted-foreground">· Faculty Member, Indian Maritime University, Kolkata</span>
            </footer>
          </blockquote>
        </div>

      </div>
    </section>
  );
}
