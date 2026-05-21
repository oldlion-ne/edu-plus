import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

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
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/CouncilVisual.png"
        category="Leadership & Global Expert Council"
        titleNormal="Expert"
        titleHighlighted="Council"
        description="The people powering EduPlus Skills — uniting researchers, corporate leaders, and community builders across Asia, Europe, and North America."
        telemetryLeft="COUNCIL_MEMBERS // ACTIVE"
        telemetryRight="GLOBAL_REPRESENTATION // STABLE"
      />

      <div className={`max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 border-y border-border py-6">
          {FILTERS.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <Card
              key={member.name}
              onClick={() => setSelectedMember(member)}
              className="relative h-[380px] overflow-hidden cursor-pointer group hover:border-primary/40 hover:shadow-md transition-all duration-500 flex flex-col justify-between"
            >
              <CardContent className="p-8 flex flex-col justify-between h-full">
                {/* Default Front State */}
                <div className="space-y-4">
                  <span className="text-xs font-sans font-medium text-primary tracking-widest uppercase block opacity-80">
                    {member.location}
                  </span>
                  <h3 className="font-heading text-2xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {member.role}
                  </p>
                </div>

                {/* Action and categories tags */}
                <div className="space-y-4">
                  <div className="text-xs font-sans font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    READ PROFILE // &rarr;
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.categories.map(cat => (
                      <Badge key={cat} variant="secondary">{cat}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Profile Detail Dialog */}
      <Dialog open={selectedMember !== null} onOpenChange={(open) => !open && setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="max-w-lg p-8">
            <DialogHeader>
              <span className="text-xs font-sans font-medium text-primary tracking-[0.2em] uppercase block mb-1">
                {selectedMember.location} // PROFILE_ACTIVE
              </span>
              <DialogTitle className="font-heading text-3xl font-light text-foreground">
                {selectedMember.name}
              </DialogTitle>
              <div className="text-sm font-sans text-muted-foreground border-b border-border pb-4 mb-4">
                {selectedMember.role}
              </div>
            </DialogHeader>

            <DialogDescription className="text-sm font-sans text-foreground leading-relaxed mb-6 whitespace-pre-wrap">
              {selectedMember.bio}
            </DialogDescription>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
              {selectedMember.categories.map(cat => (
                <Badge key={cat} variant="secondary">{cat}</Badge>
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
