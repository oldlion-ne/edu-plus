import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── Integration platform SVGs ─────────────────────────────────────────────────
import { OpenAI }          from '@/components/ui/svgs/openai';
import { GoogleClassroom } from '@/components/ui/svgs/google-classroom';
import { GitHub }          from '@/components/ui/svgs/github';
import { LinkedIn }        from '@/components/ui/svgs/linkedin';
import { Slack }           from '@/components/ui/svgs/slack';
import { Zoom }            from '@/components/ui/svgs/zoom';

// ── Integration data ──────────────────────────────────────────────────────────
const INTEGRATIONS = [
  {
    icon: <OpenAI          className="size-8 text-foreground" />,
    name: 'OpenAI',
    description: 'AI-powered pathway recommendations and personalised learning content generation.',
  },
  {
    icon: <GoogleClassroom className="size-8 text-foreground" />,
    name: 'Google Classroom',
    description: 'Sync assignments, grades, and learner progress directly from your existing LMS.',
  },
  {
    icon: <GitHub          className="size-8 text-foreground" />,
    name: 'GitHub',
    description: 'Track hands-on project submissions and real-world portfolio development.',
  },
  {
    icon: <LinkedIn        className="size-8 text-foreground" />,
    name: 'LinkedIn',
    description: 'Map verified credentials and pathway completions directly to learner profiles.',
  },
  {
    icon: <Slack           className="size-8 text-foreground" />,
    name: 'Slack',
    description: 'Real-time cohort notifications, mentor alerts, and milestone celebration feeds.',
  },
  {
    icon: <Zoom            className="size-8 text-foreground" />,
    name: 'Zoom',
    description: 'Schedule and launch live mentorship sessions and group workshops seamlessly.',
  },
];

// ── Integration card ──────────────────────────────────────────────────────────
function IntegrationCard({
  icon,
  name,
  description,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
}) {
  return (
    <div className="group space-y-4 border border-border bg-card/60 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-accent rounded-lg hover:shadow-md hover:shadow-primary/5">
      <div className="flex size-fit items-center justify-center">{icon}</div>
      <div className="space-y-1.5">
        <h3 className="text-sm font-medium text-foreground">{name}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function PathwaySimulator() {
  return (
    <section
      id="simulator"
      className="relative w-full bg-background border-t border-border overflow-hidden py-24 md:py-32"
    >
      <div className="mx-auto flex flex-col px-6 md:grid md:max-w-[1440px] md:grid-cols-2 md:gap-16 md:px-12">

        {/* ── Left: copy + testimonial ── */}
        <div className="order-last mt-10 flex flex-col gap-12 md:order-first md:mt-0 md:justify-center">

          <div className="space-y-6">
            {/* Eyebrow */}
            <span className="text-xs font-sans font-medium tracking-wider uppercase text-primary block">
              Interactive Workspace
            </span>

            <h2 className="text-balance text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
              Connect your favourite{' '}
              <span className="text-primary">learning tools</span>
            </h2>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
              EduPlus plugs into the platforms your learners and institutions already trust - syncing progress, credentials, and communication in one intelligent network.
            </p>

            <Button asChild variant="outline" size="sm" className="group inline-flex items-center gap-2 font-sans font-medium text-xs tracking-wider uppercase rounded-lg">
              <Link to="/contact" /* ui-ignore */>
                Request Integration
                <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          {/* Testimonial */}
          <div className="mt-auto grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-8">
            <div className="flex size-10 items-center justify-center border border-border bg-card text-foreground rounded-lg">
              <span className="font-sans font-bold text-sm">
                E<span className="text-primary font-light">+</span>
              </span>
            </div>
            <blockquote>
              <p className="text-sm text-foreground leading-relaxed">
                "EduPlus bridges the gap between academic learning and real-world industry expectations - equipping learners with global competence and operational excellence from day one."
              </p>
              <div className="mt-3 flex gap-2 text-xs">
                <cite className="font-medium text-foreground not-italic">Shri Rojit Keisham</cite>
                <span className="text-muted-foreground">· Faculty Member, Indian Maritime University, Kolkata</span>
              </div>
            </blockquote>
          </div>
        </div>

        {/* ── Right: integration grid (masked) ── */}
        <div className="[mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_60%,transparent_100%)]">
          <div className="border border-border bg-card/10 p-3 shadow-lg rounded-xl md:pb-16">
            <div className="grid grid-cols-2 gap-2">
              {INTEGRATIONS.map((integration) => (
                <IntegrationCard key={integration.name} {...integration} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
