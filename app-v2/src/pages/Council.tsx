import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';

interface CouncilMember {
  name: string;
  role: string;
  location: string;
  categories: ('Founders' | 'Academic Research' | 'Industry Experts' | 'Community Leads')[];
  bio: string;
}

const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    name: 'Mr. Bikash Oinam',
    role: 'Founder, EduPlus Skills',
    location: 'Manipur',
    categories: ['Founders', 'Community Leads'],
    bio: 'An education entrepreneur dedicated to cultural revival and transformative learning. With seven years of research focused on culture and education, he designs learning experiences that reinforce modern skills and local roots.'
  },
  {
    name: 'Mr. Roshan Khumukcham',
    role: 'Founder, EduPlus Skills',
    location: 'Kolkata',
    categories: ['Founders', 'Industry Experts'],
    bio: 'Fitness and career mentor with over two decades of corporate leadership experience in the automotive industry (Hyundai, Hero Honda, LML). Focuses on discipline, professional resilience, and student mentoring.'
  },
  {
    name: 'Mr. Ronen Akoijam',
    role: 'Co‑Founder, EduPlus Skills',
    location: 'Singapore',
    categories: ['Founders', 'Academic Research'],
    bio: 'Senior Speech Therapist and language interventions expert under the Ministry of Education in Singapore. With over 20 years of experience, he steers our inclusive learning and communication strategies.'
  },
  {
    name: 'Dr. Soram Bobby Singh',
    role: 'Principal Scientist, Green Hydrogen',
    location: 'South Korea',
    categories: ['Academic Research'],
    bio: 'Leading researcher in green hydrogen and energy materials with 15+ years of experience in materials science and water-splitting technologies. Dedicated to future-focused tech incubation.'
  },
  {
    name: 'Shri Romen Ningthoujam',
    role: 'Operational Lead, NE States, Goonj',
    location: 'North East India',
    categories: ['Community Leads'],
    bio: 'Holds M.Ed., Ph.D. (Education) and Applied Psychology diploma. Over a decade of community development, education equity, and grassroots impact leadership at Goonj.'
  },
  {
    name: 'Shri Khumukcham Roshaan Singh',
    role: 'Career Coach & Executive Mentor',
    location: 'Kolkata, India',
    categories: ['Industry Experts'],
    bio: '20+ years of automotive corporate experience (Hyundai, Hero, LML). Mechanical Engineer and author of "Smart Behaviour Installation Guide", focusing on professional and behavioral readiness.'
  },
  {
    name: 'Smt. Nutan Nongthongbam',
    role: 'Life Skills Trainer & Public Health Speaker',
    location: 'India & Global',
    categories: ['Industry Experts', 'Community Leads'],
    bio: 'Certified Life Skills Trainer and recognized public health speaker at national and international levels, specializing in health communication, emotional resilience, and holistic leadership.'
  },
  {
    name: 'Ms. Geetarani Takhellambam, LL.M.',
    role: 'GM & Head Legal, Powerica Ltd.',
    location: 'Pune & Manipur',
    categories: ['Industry Experts'],
    bio: 'Dual-qualified legal expert (India & UK) with 20+ years of corporate law practice, arbitration, and compliance leadership in the renewable energy sector.'
  },
  {
    name: 'Shri Rojit Keisham',
    role: 'Faculty, Indian Maritime University',
    location: 'Kolkata',
    categories: ['Academic Research', 'Industry Experts'],
    bio: '14+ years of maritime operations experience across the USA, Australia, Europe, and Asia in the Merchant Navy. Bridges global seafaring competence with academic excellence.'
  },
  {
    name: 'Dr. Ngangbam Shantikumar Meetei',
    role: 'Professor of English, HKUT',
    location: 'Taiwan',
    categories: ['Academic Research'],
    bio: '25+ years teaching public speaking and linguistics at Hungkuo Delin University of Technology. A decorated natural bodybuilder with 12 international titles, representing physical and mental balance.'
  },
  {
    name: 'Shri Ronendrojit Akoijam',
    role: 'Senior Speech Language Therapist',
    location: 'Singapore',
    categories: ['Academic Research'],
    bio: '20+ years designing speech and language intervention programs for children. Leading clinical expertise in student-centered support, language development, and speech therapy.'
  },
  {
    name: 'Smt. Purnimashi Moirangthem',
    role: 'Assistant Director, ECE Center',
    location: 'Dallas, Texas, USA',
    categories: ['Academic Research', 'Industry Experts'],
    bio: 'Delhi University graduate, early childhood manager, and certified CDA. Combines 17 years of IT/finance corporate experience (HCL, IBM, NIIT) with early cognitive development expertise.'
  },
  {
    name: 'Dr. Tomba Singh Thokchom',
    role: 'Associate Professor, KSV University',
    location: 'Gujarat',
    categories: ['Academic Research'],
    bio: 'Academic leader in teacher education and modern pedagogical innovation. Contributes extensively to curriculum design, educator training, and learning quality development.'
  },
  {
    name: 'Dr. Usham Rojio',
    role: 'Assistant Professor, Visva-Bharati University',
    location: 'West Bengal',
    categories: ['Academic Research', 'Community Leads'],
    bio: 'Academic, poet, and experimental theatre practitioner. Explores literature, performing arts, and social expression, collaborating on grassroots cultural and community-led theatre.'
  }
];

const FILTERS = ['All', 'Founders', 'Academic Research', 'Industry Experts', 'Community Leads'] as const;
type FilterType = typeof FILTERS[number];

export default function Council() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedMember, setSelectedMember] = useState<CouncilMember | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredMembers = COUNCIL_MEMBERS.filter(member => {
    if (activeFilter === 'All') return true;
    return member.categories.includes(activeFilter as any);
  });

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#7DF9FF]/3 rounded-none blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#7DF9FF]/3 rounded-none blur-[160px] pointer-events-none" />

      {/* Immersive Top Hero Viewport with Holographic Ring */}
      <ImmersiveHero
        bgImage="/images/CouncilVisual.png"
        category="Global Vision. Local Impact."
        titleNormal="Expert"
        titleHighlighted="Council"
        description="Uniting researchers, corporate leaders, and community builders across Asia, Europe, and North America."
        telemetryLeft="COUNCIL_MEMBERS // ACTIVE"
        telemetryRight="GLOBAL_REPRESENTATION // STABLE"
      />

      <div className={`max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 border-y border-[#7DF9FF]/10 py-6">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-xs md:text-sm font-sans tracking-wide transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-[#7DF9FF] text-[#0B0F14] font-medium'
                  : 'text-[#E6EDF3] border border-[#E6EDF3]/10 hover:border-[#7DF9FF]/30 hover:text-[#7DF9FF]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <div
              key={member.name}
              onClick={() => setSelectedMember(member)}
              className="liquid-glass relative p-8 h-[380px] overflow-hidden group hover:border-[#7DF9FF]/40 hover:scale-[1.01] hover:shadow-lg hover:shadow-[#7DF9FF]/5 cursor-pointer transition-all duration-500 flex flex-col justify-between rounded-none border border-white/[0.08]"
            >
              {/* Default Front State */}
              <div className="space-y-4">
                <span className="text-xs font-sans font-medium text-[#7DF9FF] tracking-widest uppercase block opacity-80">
                  {member.location}
                </span>
                <h3 className="font-heading text-2xl font-light text-[#E6EDF3] group-hover:text-[#7DF9FF] transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="font-sans text-sm text-[#8B949E] leading-relaxed">
                  {member.role}
                </p>
              </div>

              {/* Action and categories tags */}
              <div className="space-y-4">
                <div className="text-xs font-sans font-medium text-[#7DF9FF] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  READ PROFILE // &rarr;
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.categories.map(cat => (
                    <span key={cat} className="text-[10px] font-sans px-2.5 py-0.5 bg-[#7DF9FF]/10 text-[#7DF9FF] border border-[#7DF9FF]/10 rounded-none">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Detail Dialog */}
      <Dialog open={selectedMember !== null} onOpenChange={(open) => !open && setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="bg-[#0E131A] border border-[#7DF9FF]/20 text-[#E6EDF3] max-w-lg p-8 rounded-none shadow-2xl before:absolute before:inset-0 before:-z-1 before:bg-[#0B0F14]/90 before:backdrop-blur-xl">
            {/* Retro dot matrix grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                 style={{ 
                   backgroundImage: `radial-gradient(circle, #7DF9FF 1px, transparent 1px)`, 
                   backgroundSize: '16px 16px' 
                 }} 
            />
            <DialogHeader className="relative z-10">
              <span className="text-xs font-sans font-medium text-[#7DF9FF] tracking-[0.2em] uppercase block mb-1">
                {selectedMember.location} // PROFILE_ACTIVE
              </span>
              <DialogTitle className="font-heading text-3xl font-light text-[#E6EDF3]">
                {selectedMember.name}
              </DialogTitle>
              <div className="text-sm font-sans text-[#8B949E] border-b border-[#7DF9FF]/10 pb-4 mb-4">
                {selectedMember.role}
              </div>
            </DialogHeader>
            
            <DialogDescription className="relative z-10 text-sm font-sans text-[#E6EDF3] leading-relaxed mb-6 whitespace-pre-wrap">
              {selectedMember.bio}
            </DialogDescription>
            
            <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-white/[0.04]">
              {selectedMember.categories.map(cat => (
                <span key={cat} className="text-xs font-sans px-3 py-1 bg-[#7DF9FF]/10 text-[#7DF9FF] border border-[#7DF9FF]/10 rounded-none">
                  {cat}
                </span>
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
