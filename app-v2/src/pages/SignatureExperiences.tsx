import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface EventExperience {
  title: string;
  subtitle: string;
  duration: string;
  target: string;
  desc: string;
  highlights: string[];
}

const EVENTS_DATA: EventExperience[] = [
  {
    title: 'Winter Camp',
    subtitle: 'Ignite Curiosity',
    duration: '5–7 Days Immersive',
    target: 'Middle & High School Students',
    desc: 'An immersive journey blending technical skill development, creativity, and adventure. Designed to unlock hidden talents and spark early curiosity about STEM fields, culture, and career pathways.',
    highlights: [
      'Interactive STEM & Robotics labs',
      'Adventure-based team-building',
      'Creative arts & cultural showcases',
      'Early career discovery workshops'
    ],
  },
  {
    title: 'Summer Camp',
    subtitle: 'Scale Your Potential',
    duration: '2–3 Weeks Bootcamp',
    target: 'High School & Higher Secondary',
    desc: 'An intensive, project-driven camp designed to build future academic profiles, college readiness, and competitive advantages for higher education selection.',
    highlights: [
      'Advanced subject & exam bootcamps',
      'Leadership & public speaking modules',
      'Corporate & industry exposure visits',
      'Project-based innovation challenges'
    ],
  },
  {
    title: 'Education Fair',
    subtitle: 'Connect, Explore, Decide',
    duration: '1–2 Days Expo',
    target: 'Aspirants, Parents, & Educators',
    desc: 'Our premier annual expo bringing global universities, career counselors, financial institutions, and industry advisors together under one roof to simplify admissions.',
    highlights: [
      'Interact with university officials',
      'Free psychometrics & aptitude assessments',
      'Admissions & visa masterclasses',
      'Scholarship & financial aid seminars'
    ],
  }
];

export default function SignatureExperiences() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/EventsVisual.png"
        category="Flagship Events"
        titleNormal="Signature"
        titleHighlighted="Experiences"
        description="Our flagship events bring energy, community, and real-world exposure into the learning experience. These curated experiences connect students, educators, and industry experts."
        telemetryLeft="EVENT_COORDINATOR // ACTIVE"
        telemetryRight="UTC_COORD_EXPERIENCES"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Stacked Cards */}
        <div className="space-y-12">
          {EVENTS_DATA.map((event) => (
            <Card
              key={event.title}
              className={`hover:border-primary/40 hover:shadow-md transition-all duration-500 transform ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <CardContent className="p-8 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
                {/* Graphic/Left column */}
                <div className="lg:w-1/3 flex flex-col justify-between">
                  <div>
                    <div className="h-[4px] w-20 bg-primary mb-6" />
                    <span className="text-xs font-sans font-semibold text-primary tracking-wider uppercase block mb-2">
                      {event.subtitle}
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-6">
                      {event.title}
                    </h2>
                  </div>

                  <div className="space-y-3 font-sans text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground uppercase tracking-wider">Duration:</span>
                      <Badge variant="secondary">{event.duration}</Badge>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-muted-foreground uppercase tracking-wider">Target:</span>
                      <span className="text-foreground font-medium">{event.target}</span>
                    </div>
                  </div>
                </div>

                {/* Text/Right column */}
                <div className="lg:w-2/3 flex flex-col justify-between">
                  <p className="font-sans text-muted-foreground text-base leading-relaxed mb-8">
                    {event.desc}
                  </p>

                  <div>
                    <h4 className="font-heading text-foreground text-lg font-light mb-4">Experience Highlights:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {event.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground font-sans">
                          <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
