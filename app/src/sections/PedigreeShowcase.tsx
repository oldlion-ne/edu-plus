import { useEffect, useRef, useState } from 'react';
import { Card } from '../components/ui/card';
import { HugeiconsIcon } from '@hugeicons/react';
import { Shield01Icon } from '@hugeicons/core-free-icons';
import { Vercel } from '../components/ui/svgs/vercel';
import { Supabase } from '../components/ui/svgs/supabase';
import { Linear } from '../components/ui/svgs/linear';
import { Slack } from '../components/ui/svgs/slack';
import { Firebase } from '../components/ui/svgs/firebase';
import { ClerkIconDark as Clerk } from '../components/ui/svgs/clerk';

export default function PedigreeShowcase() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="advisory"
      className="relative w-full overflow-hidden bg-background py-16 md:py-24"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 60%, oklch(var(--primary) / 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">

        {/* ── Section Header ── */}
        <div
          className={`transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block h-px w-8 bg-primary opacity-60" />
            <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-primary">
              Technical Pedigree &amp; Advisory Network
            </span>
          </div>

          {/* Main heading */}
          <h2 className="section-title text-foreground max-w-4xl text-balance">
            Our founders &amp; advisors bring experience from{' '}
            <span className="text-primary">world-class organizations</span>
          </h2>

          {/* Sub-description */}
          <p className="text-muted-foreground mt-5 text-balance max-w-2xl text-sm md:text-base leading-relaxed">
            A robust framework of academic advisories, corporate expertise, and
            secure operational nodes powering next-generation talent development.
          </p>
        </div>

        {/* ── Card Grid ── */}
        <div
          className={`@container mt-14 transition-all duration-1000 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* ── Card 1: Strategic Integrations ── */}
            <Card
              variant="outline"
              className="group relative row-span-2 grid grid-rows-subgrid p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
            >
              {/* Card hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 50% at 50% 0%, oklch(var(--primary) / 0.06) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 space-y-2">
                {/* Card label */}
                <span className="text-xs font-sans font-medium tracking-wider uppercase text-primary/70 mb-3 block">
                  01 - Integrations
                </span>
                <h3 className="text-foreground font-medium text-lg">
                  Strategic Integrations
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Direct alignment with leading educational ministries, corporate
                  partners, and humanitarian platforms.
                </p>
              </div>

              <div
                aria-hidden
                className="relative z-10 [&_svg]:fill-foreground flex h-48 flex-col justify-between pt-8"
              >
                <div className="relative flex h-10 items-center gap-12 px-6">
                  <div className="bg-border absolute inset-0 my-auto h-px" />
                <div className="bg-card shadow-black/10 ring-border relative flex h-9 items-center rounded-none px-3.5 shadow-md ring transition-transform duration-200 group-hover:scale-105">
                    <Vercel className="size-3.5" />
                  </div>
                <div className="bg-card shadow-black/10 ring-border relative flex h-9 items-center rounded-none px-3.5 shadow-md ring transition-transform duration-200 group-hover:scale-105">
                    <Slack className="size-3.5" />
                  </div>
                </div>
                <div className="pl-16 relative flex h-10 items-center justify-between gap-12 pr-6">
                  <div className="bg-border absolute inset-0 my-auto h-px" />
                <div className="bg-card shadow-black/10 ring-border relative flex h-9 items-center rounded-none px-3.5 shadow-md ring transition-transform duration-200 group-hover:scale-105">
                    <Clerk className="size-3.5" />
                  </div>
                <div className="bg-card shadow-black/10 ring-border relative flex h-9 items-center rounded-none px-3.5 shadow-md ring transition-transform duration-200 group-hover:scale-105">
                    <Linear className="size-3.5" />
                  </div>
                </div>
                <div className="relative flex h-10 items-center gap-20 px-8">
                  <div className="bg-border absolute inset-0 my-auto h-px" />
                <div className="bg-card shadow-black/10 ring-border relative flex h-9 items-center rounded-none px-3.5 shadow-md ring transition-transform duration-200 group-hover:scale-105">
                    <Supabase className="size-3.5" />
                  </div>
                <div className="bg-card shadow-black/10 ring-border relative flex h-9 items-center rounded-none px-3.5 shadow-md ring transition-transform duration-200 group-hover:scale-105">
                    <Firebase className="size-3.5" />
                  </div>
                </div>
              </div>
            </Card>

            {/* ── Card 2: Real-time Guidance ── */}
            <Card
              variant="outline"
              className="group relative row-span-2 grid grid-rows-subgrid p-6 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 50% at 50% 0%, oklch(var(--primary) / 0.06) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 space-y-2">
                <span className="text-xs font-sans font-medium tracking-wider uppercase text-primary/70 mb-3 block">
                  02 - Guidance
                </span>
                <h3 className="text-foreground font-medium text-lg">
                  Real-time Guidance
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Synchronized feedback loops between expert mentors and learner
                  capability pathways.
                </p>
              </div>

              <div
                aria-hidden
                className="relative z-10 h-48 translate-y-6"
              >
                <div className="bg-foreground/15 absolute inset-0 mx-auto w-px" />
                <div className="absolute -inset-x-16 top-6 aspect-square rounded-none border border-border/60" />
                <div
                  className="absolute -inset-x-16 top-6 aspect-square rounded-none border border-primary transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                  style={{
                    maskImage:
                      'linear-gradient(to right, transparent, white 50%, transparent)',
                    WebkitMaskImage:
                      'linear-gradient(to right, transparent, white 50%, transparent)',
                  }}
                />
                <div className="absolute -inset-x-8 top-24 aspect-square rounded-none border border-border/60" />
                <div
                  className="absolute -inset-x-8 top-24 aspect-square rounded-none border border-primary transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                  style={{
                    maskImage:
                      'linear-gradient(to right, transparent, white 50%, transparent)',
                    WebkitMaskImage:
                      'linear-gradient(to right, transparent, white 50%, transparent)',
                  }}
                />
                {/* Center dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-none bg-primary transition-all duration-300 group-hover:scale-125" />
              </div>
            </Card>

            {/* ── Card 3: Framework Ready ── */}
            <Card
              variant="outline"
              className="group relative row-span-2 grid grid-rows-subgrid p-6 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 50% at 50% 0%, oklch(var(--primary) / 0.06) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 space-y-2">
                <span className="text-xs font-sans font-medium tracking-wider uppercase text-primary/70 mb-3 block">
                  03 - Standards
                </span>
                <h3 className="text-foreground font-medium text-lg">
                  Framework Ready
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Built on verified data structures, comprehensive academic APIs,
                  and standardized evaluation protocols.
                </p>
              </div>

              <div
                aria-hidden
                className="relative z-10 flex h-48 justify-between pb-6 pt-12"
              >
                {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((i) => {
                  const isPrimary = [4, 9, 13, 18, 22, 28].includes(i);
                  return (
                    <div
                      key={i}
                      className={`h-full w-px transition-opacity duration-300 ${
                        isPrimary
                          ? 'bg-primary opacity-80 group-hover:opacity-100'
                          : 'bg-foreground/15'
                      }`}
                    />
                  );
                })}
              </div>
            </Card>

            {/* ── Card 4: Institution Ready ── */}
            <Card
              variant="outline"
              className="group relative row-span-2 grid grid-rows-subgrid p-6 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 50% at 50% 0%, oklch(var(--primary) / 0.06) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 space-y-2">
                <span className="text-xs font-sans font-medium tracking-wider uppercase text-primary/70 mb-3 block">
                  04 - Scale
                </span>
                <h3 className="font-medium text-lg text-foreground">
                  Institution Ready
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Scale confidently with national educational standards and
                  secure credentialing verification.
                </p>
              </div>

              <div
                aria-hidden
                className="pointer-events-none relative z-10 -ml-7 flex size-48 items-center justify-center pt-5"
              >
                <HugeiconsIcon
                  icon={Shield01Icon}
                  className="absolute inset-0 top-2.5 size-full stroke-[0.1px] opacity-10 text-primary transition-opacity duration-300 group-hover:opacity-20"
                />
                <HugeiconsIcon
                  icon={Shield01Icon}
                  className="size-32 stroke-[0.1px] text-primary transition-all duration-300"
                />
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}
