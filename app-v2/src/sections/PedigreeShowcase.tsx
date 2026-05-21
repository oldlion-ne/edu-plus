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
      className="relative w-full bg-background overflow-hidden py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-primary mb-6 block">
            Technical Pedigree &amp; Advisory Network
          </span>
          <h2 className="text-balance font-sans text-4xl md:text-5xl lg:text-6xl font-light text-foreground max-w-3xl leading-tight">
            Advisory Framework
          </h2>
          <p className="text-muted-foreground mt-4 text-balance max-w-lg text-sm">
            A robust framework of academic advisories, corporate expertise, and secure operational nodes powering talent development.
          </p>
        </div>

        <div className={`@container mt-12 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 *:p-6">
            {/* Card 1: Strategic Integrations */}
            <Card
              variant="outline"
              className="row-span-2 grid grid-rows-subgrid"
            >
              <div className="space-y-2">
                <h3 className="text-foreground font-medium text-lg">Strategic Integrations</h3>
                <p className="text-muted-foreground text-sm">
                  Direct alignment with leading educational ministries, corporate partners, and humanitarian platforms.
                </p>
              </div>
              <div
                aria-hidden
                className="[&_svg]:fill-foreground flex h-44 flex-col justify-between pt-8"
              >
                <div className="relative flex h-10 items-center gap-12 px-6">
                  <div className="bg-border absolute inset-0 my-auto h-px"></div>
                  <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                    <Vercel className="size-3.5" />
                  </div>
                  <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                    <Slack className="size-3.5" />
                  </div>
                </div>
                <div className="pl-16 relative flex h-10 items-center justify-between gap-12 pr-6">
                  <div className="bg-border absolute inset-0 my-auto h-px"></div>
                  <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                    <Clerk className="size-3.5" />
                  </div>
                  <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                    <Linear className="size-3.5" />
                  </div>
                </div>
                <div className="relative flex h-10 items-center gap-20 px-8">
                  <div className="bg-border absolute inset-0 my-auto h-px"></div>
                  <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                    <Supabase className="size-3.5" />
                  </div>
                  <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                    <Firebase className="size-3.5" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 2: Real-time Guidance */}
            <Card
              variant="outline"
              className="row-span-2 grid grid-rows-subgrid overflow-hidden"
            >
              <div className="space-y-2">
                <h3 className="text-foreground font-medium text-lg">Real-time Guidance</h3>
                <p className="text-muted-foreground text-sm">
                  Synchronized feedback loops between expert mentors and learner capability pathways.
                </p>
              </div>
              <div
                aria-hidden
                className="relative h-44 translate-y-6"
              >
                <div className="bg-foreground/15 absolute inset-0 mx-auto w-px"></div>
                <div className="absolute -inset-x-16 top-6 aspect-square rounded-full border"></div>
                <div 
                  className="border-primary absolute -inset-x-16 top-6 aspect-square rounded-full border"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent, white 50%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, white 50%, transparent)'
                  }}
                ></div>
                <div className="absolute -inset-x-8 top-24 aspect-square rounded-full border"></div>
                <div 
                  className="absolute -inset-x-8 top-24 aspect-square rounded-full border border-primary"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent, white 50%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, white 50%, transparent)'
                  }}
                ></div>
              </div>
            </Card>

            {/* Card 3: Framework Ready */}
            <Card
              variant="outline"
              className="row-span-2 grid grid-rows-subgrid overflow-hidden"
            >
              <div className="space-y-2">
                <h3 className="text-foreground font-medium text-lg">Framework Ready</h3>
                <p className="text-muted-foreground text-sm">
                  Built on verified data structures, comprehensive academic APIs, and standardized evaluation protocols.
                </p>
              </div>
              <div
                aria-hidden
                className="*:bg-foreground/15 flex h-44 justify-between pb-6 pt-12 *:h-full *:w-px"
              >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="!bg-primary"></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="!bg-primary"></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="!bg-primary"></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="!bg-primary"></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="!bg-primary"></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="!bg-primary"></div>
              </div>
            </Card>

            {/* Card 4: Institution Ready */}
            <Card
              variant="outline"
              className="row-span-2 grid grid-rows-subgrid"
            >
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Institution Ready</h3>
                <p className="text-muted-foreground text-sm">
                  Scale confidently with national educational standards and secure credentialing verification.
                </p>
              </div>

              <div 
                aria-hidden="true"
                className="pointer-events-none relative -ml-7 flex size-44 items-center justify-center pt-5"
              >
                <HugeiconsIcon icon={Shield01Icon} className="absolute inset-0 top-2.5 size-full stroke-[0.1px] opacity-15 text-primary" />
                <HugeiconsIcon icon={Shield01Icon} className="size-32 stroke-[0.1px] text-primary" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
