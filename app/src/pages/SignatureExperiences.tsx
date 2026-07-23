import { useState } from 'react';
import { Link } from 'react-router';

import { PageHero } from '@/components/ui/page-hero';
import { BulletList, BulletItem } from '@/components/ui/bullet-list';
import { editorialIllustrations } from '@/lib/editorialIllustrations';
import { FOCUS_RING_CLASSES } from '@/lib/utils';

const EVENTS = [
  {
    title: 'Winter Camp',
    subtitle: 'Ignite Curiosity',
    duration: '5–7 Days Immersive',
    target: 'Middle & High School Students',
    status: 'Completed',
    active: false,
    desc: 'An immersive journey blending technical skill development, creativity, and adventure. Designed to unlock hidden talents and spark early curiosity about STEM fields, culture, and career pathways.',
    highlights: [
      'Interactive STEM & Robotics labs',
      'Adventure-based team-building',
      'Creative arts & cultural showcases',
      'Early career discovery workshops',
    ],
  },
  {
    title: 'Summer Camp',
    subtitle: 'Scale Your Potential',
    duration: '2–3 Weeks Bootcamp',
    target: 'High School & Higher Secondary',
    status: 'Completed',
    active: false,
    desc: 'An intensive, project-driven camp designed to build future academic profiles, college readiness, and competitive advantages for higher education selection.',
    highlights: [
      'Advanced subject & exam bootcamps',
      'Leadership & public speaking modules',
      'Corporate & industry exposure visits',
      'Project-based innovation challenges',
    ],
  },
  {
    title: 'Education Fair',
    subtitle: 'Connect, Explore, Decide',
    duration: '1–2 Days Expo',
    target: 'Aspirants, Parents, & Educators',
    status: 'Open Enrollment',
    active: true,
    desc: 'Our premier annual expo bringing global universities, career counselors, financial institutions, and industry advisors together to simplify admissions.',
    highlights: [
      'Interact with university officials',
      'Free psychometrics & aptitude assessments',
      'Admissions & visa masterclasses',
      'Scholarship & financial aid seminars',
    ],
  },
];

const FAQS = [
  {
    category: 'Registration & Requirements',
    items: [
      {
        q: 'Who is eligible to join the Winter and Summer camps?',
        a: 'Winter Camp is open to Middle & High School students (grades 6–10). Summer Camp is tailored for High School & Higher Secondary students preparing for college profile building.',
      },
      {
        q: 'How do I register for the upcoming Education Fair?',
        a: 'Registration for the Education Fair is free for parents, students, and educators. Register online via our dashboard to reserve your entry pass.',
      },
    ],
  },
  {
    category: 'Accommodation & Safety',
    items: [
      {
        q: 'Are the immersive camps residential?',
        a: 'Yes, both camps offer secure, fully supervised residential facilities with separate hostels, nutritious meals, and 24/7 staff support.',
      },
      {
        q: 'What safety measures are in place during camp activities?',
        a: 'All technical workshops and outdoor activities are guided by certified instructors, with comprehensive emergency medical services on-site.',
      },
    ],
  },
  {
    category: 'Fees & Financial Aid',
    items: [
      {
        q: 'Do you offer scholarships or sibling discounts?',
        a: 'Yes, we offer early-bird discounts, sibling packages, and need-based scholarships for talented students from grassroots backgrounds. Apply during enrollment.',
      },
      {
        q: 'What is the refund policy for cancellations?',
        a: 'Cancellations made 14 days prior to the camp start date are eligible for a full refund. Cancellations within 14 days are issued as credits for future programs.',
      },
    ],
  },
];

export default function SignatureExperiences() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="flex-1 bg-background w-full">

      {/* ── Typographic Hero ── */}
      <PageHero
        eyebrow="Flagship Events"
        title="Signature Experiences"
        description="Curated events that bring energy, community, and real-world exposure into the learning experience — connecting students, educators, and industry experts."
        illustration={editorialIllustrations.events}
      />

      {/* ── Events: horizontal list with 1px top border dividers ── */}
      <section className="py-20 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="border-t border-border/50 divide-y divide-border/50">
          {EVENTS.map((evt) => (
            <div key={evt.title} className="py-12 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 hover:bg-secondary transition-colors duration-200 px-4 -mx-4">
              {/* Left: meta */}
              <div className="flex flex-col gap-2">
                <span className={`text-[11px] font-semibold uppercase tracking-wider ${evt.active ? 'text-primary' : 'text-muted-foreground'}`}>
                  {evt.status}
                </span>
                <h3 className="text-[24px] font-medium text-foreground">{evt.title}</h3>
                <p className="text-[14px] text-muted-foreground italic">{evt.subtitle}</p>
                <div className="mt-2 flex flex-col gap-1 text-[13px] text-muted-foreground">
                  <span>{evt.duration}</span>
                  <span>{evt.target}</span>
                </div>
              </div>
              {/* Right: content */}
              <div>
                <p className="text-[16px] text-muted-foreground leading-relaxed mb-8 max-w-[55ch]">{evt.desc}</p>
                <BulletList className="mb-8">
                  {evt.highlights.map((h) => (
                    <BulletItem key={h}>{h}</BulletItem>
                  ))}
                </BulletList>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ: 1px top border dividers, no icons ── */}
      <section className="py-32 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-4 block">
          FAQ
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-[16px] text-muted-foreground leading-relaxed mb-16 max-w-2xl">
          Got questions about our camps or fair? Find answers below, or{' '}
          <Link to="/contact" className="text-primary hover:underline" /* ui-ignore */>contact our team</Link>.
        </p>

        {FAQS.map((cat) => (
          <div key={cat.category} className="mb-12">
            <h3 className="text-[17px] font-medium text-foreground mb-6 pb-4 border-b border-border/50">
              {cat.category}
            </h3>
            <div className="flex flex-col">
              {cat.items.map((item, idx) => {
                const key = `${cat.category}-${idx}`;
                const isOpen = openFaq === key;
                return (
                  <div key={key} className="border-b border-border/50">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className={`w-full flex items-center justify-between py-5 text-left gap-8 group ${FOCUS_RING_CLASSES}`}
                    >
                      <span className="text-[15px] font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                        {item.q}
                      </span>
                      <span className="text-muted-foreground text-xl leading-none shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-6">
                        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[60ch]">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
