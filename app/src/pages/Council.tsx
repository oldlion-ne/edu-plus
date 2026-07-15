import { useState, useEffect, useRef } from 'react';
import { PageHero } from '@/components/ui/page-hero';
import { councilPortraits, editorialIllustrations } from '@/lib/editorialIllustrations';

interface CouncilMember {
  name: string;
  role: string;
  location: string;
  bio: string;
}

const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    name: 'Mr. Bikash Oinam',
    role: 'Founder, EduPlus Skills',
    location: 'Manipur',
    bio: 'An education entrepreneur dedicated to cultural revival and transformative learning. Designs learning experiences that reinforce modern skills and local roots.',
  },
  {
    name: 'Mr. Roshan Khumukcham',
    role: 'Founder, EduPlus Skills',
    location: 'Kolkata',
    bio: 'Fitness and career mentor with over two decades of corporate leadership experience in the automotive industry (Hyundai, Hero Honda, LML).',
  },
  {
    name: 'Mr. Ronen Akoijam',
    role: 'Co‑Founder, EduPlus Skills',
    location: 'Singapore',
    bio: 'Senior Speech Therapist and language interventions expert under the Ministry of Education in Singapore. Steers our inclusive learning and communication strategies.',
  },
  {
    name: 'Dr. Soram Bobby Singh',
    role: 'Principal Scientist, Green Hydrogen',
    location: 'South Korea',
    bio: 'Leading researcher in green hydrogen and energy materials with 15+ years of experience in materials science and water-splitting technologies.',
  },
  {
    name: 'Shri Romen Ningthoujam',
    role: 'Operational Lead, NE States, Goonj',
    location: 'North East India',
    bio: 'Holds M.Ed., Ph.D. (Education) and Applied Psychology diploma. Over a decade of community development, education equity, and grassroots impact leadership at Goonj.',
  },
  {
    name: 'Shri Khumukcham Roshaan Singh',
    role: 'Career Coach & Executive Mentor',
    location: 'Kolkata, India',
    bio: '20+ years of automotive corporate experience (Hyundai, Hero, LML). Mechanical Engineer and author of "Smart Behaviour Installation Guide".',
  },
  {
    name: 'Smt. Nutan Nongthongbam',
    role: 'Life Skills Trainer & Public Health Speaker',
    location: 'India & Global',
    bio: 'Certified Life Skills Trainer and recognized public health speaker at national and international levels, specializing in health communication, emotional resilience, and holistic leadership.',
  },
  {
    name: 'Ms. Takhellambam Geetarani, LL.M.',
    role: 'GM & Head Legal, Powerica Ltd.',
    location: 'Pune & Manipur',
    bio: 'Dual-qualified legal expert (India & UK) with 20+ years of corporate law practice, arbitration, and compliance leadership in the renewable energy sector.',
  },
  {
    name: 'Shri Rojit Keisham',
    role: 'Faculty, Indian Maritime University',
    location: 'Kolkata',
    bio: '14+ years of maritime operations experience across the USA, Australia, Europe, and Asia in the Merchant Navy. Bridges global seafaring competence with academic excellence.',
  },
  {
    name: 'Dr. Ngangbam Shantikumar Meetei',
    role: 'Professor of English, HKUT',
    location: 'Taiwan',
    bio: '25+ years teaching public speaking and linguistics at Hungkuo Delin University of Technology. A decorated natural bodybuilder with 12 international titles.',
  },
  {
    name: 'Shri Ronendrojit Akoijam',
    role: 'Senior Speech Language Therapist',
    location: 'Singapore',
    bio: '20+ years designing speech and language intervention programs for children. Leading clinical expertise in student-centered support, language development, and speech therapy.',
  },
  {
    name: 'Smt. Purnimashi Moirangthem',
    role: 'Assistant Director, ECE Center',
    location: 'Dallas, Texas, USA',
    bio: 'Delhi University graduate, early childhood manager, and certified CDA. Combines 17 years of IT/finance corporate experience (HCL, IBM, NIIT) with early cognitive development expertise.',
  },
  {
    name: 'Dr. Tomba Singh Thokchom',
    role: 'Associate Professor, KSV University',
    location: 'Gujarat',
    bio: 'Academic leader in teacher education and modern pedagogical innovation. Contributes extensively to curriculum design, educator training, and learning quality development.',
  },
  {
    name: 'Dr. Usham Rojio',
    role: 'Assistant Professor, Visva-Bharati University',
    location: 'West Bengal',
    bio: 'Academic, poet, and experimental theatre practitioner. Explores literature, performing arts, and social expression, collaborating on grassroots cultural and community-led theatre.',
  }
];

const councilMembers = COUNCIL_MEMBERS.map((member, index) => ({
  ...member,
  portrait: councilPortraits[index],
}));

export default function Council() {
  const [selectedMember, setSelectedMember] = useState<CouncilMember | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedMember) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Focus the close button when the modal opens
    setTimeout(() => closeButtonRef.current?.focus(), 10);
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember]);

  return (
    <div className="bg-background w-full min-h-screen">
      
      {/* ── Typographic Hero ── */}
      <PageHero
        eyebrow="Leadership &amp; Advisory Council"
        title="Global Expert Council"
        illustration={editorialIllustrations.council}
        description="The people powering EduPlus Skills — uniting researchers, corporate leaders, and community builders across Asia, Europe, and North America."
      />

      {/* ── 3-Column Grid of Members ── */}
      <section className="py-20 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {councilMembers.map((member) => (
            <div
              key={member.name}
              onClick={() => setSelectedMember(member)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedMember(member);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${member.name}, ${member.role}`}
              className="group cursor-pointer flex flex-col items-start p-10 bg-transparent transition-colors duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {/* 4:5 portrait frame */}
              <div className="aspect-[4/5] w-full bg-secondary flex items-center justify-center text-muted-foreground mb-6 overflow-hidden">
                <img
                  src={member.portrait}
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-[filter] duration-200 grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0"
                />
              </div>
              <h3 className="text-[20px] font-medium text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-[14px] text-muted-foreground leading-snug mb-1">
                {member.role}
              </p>
              <span className="text-[12px] text-primary/70 uppercase tracking-wide">
                {member.location}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Center Testimonial Quote ── */}
      <section className="py-32 border-t border-border/50 bg-secondary px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl font-light text-foreground leading-relaxed mb-8">
            "EduPlus Skills has been a game-changer for my career path. It bridged the gap between my local training in Imphal and global tech opportunities."
          </blockquote>
          <cite className="text-[14px] font-medium text-muted-foreground not-italic">
            — Khumukcham Premkumar Singh, Software Trainee
          </cite>
        </div>
      </section>

      {/* ── Dialog/Detail view ── */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <div className="w-full max-w-lg bg-background border border-border/50 p-10 relative">
            <button
              ref={closeButtonRef}
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-xl"
              aria-label="Close dialog"
            >
              &times;
            </button>
            <span className="text-[12px] text-primary uppercase tracking-wider mb-2 block">{selectedMember.location}</span>
            <h3 id="dialog-title" className="text-2xl font-medium text-foreground mb-1">{selectedMember.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">{selectedMember.role}</p>
            <p className="text-[15px] text-muted-foreground leading-relaxed">{selectedMember.bio}</p>
          </div>
        </div>
      )}

    </div>
  );
}
