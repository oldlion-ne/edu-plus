import { useEffect, useState } from 'react';
import { CustomIcon } from '../components/ui/custom-icon';
import { Link } from 'react-router';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { MapPin, ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Card } from '../components/ui/card';
import { OrbitingCircles } from '../components/ui/orbiting-circles';

const translations = {
  heroCategory: "Leadership & Global Expert Council",
  heroTitleNormal: "Expert",
  heroTitleHighlighted: "Council",
  heroDesc: "The people powering EduPlus Skills - uniting researchers, corporate leaders, and community builders across Asia, Europe, and North America.",
  councilStructureForum: "Council Structure // Methodology Forum",
  innovativeCouncil: "Innovative Methodology Council",
  councilDescription: "The Council comprises five distinct committees of academics, industry experts, and community leaders. Together, they deliberate, analyze, and design future-ready curricula to ensure teaching methodology bridges the gap between regional potential and global opportunity.",
  seatingChart: "Advisory Seating Chart // Interactive Assembly Table",
  selectChairSeat: "SELECT A CHAIR SEAT ABOVE TO INSPECT ADVISOR CREDENTIALS",
  panelSeatCount: "Panel Seat Count // 0",
  dossierLabel: "Dossier \u2192",
  panelAffiliations: "Panel Affiliations:",
  
  // Linkages
  networkTitle: "Institutional Linkages & Networks",
  networkDesc: "The Council coordinates academic standards, research projects, and corporate internships with leading organizations globally, connecting local talent directly to regional hubs.",
  networkCtaText: "Request Collaboration Pathway",

  // Testimonials
  testimonialsCategory: "What Our Customers Say // Global Impact",
  testimonialsTitle: "What Our Customers Say",
  testimonialsDesc: "Hear from the teams and individuals who have transformed their workflow and learning pathways with our platform.",
  eduLabel: "Edu"
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

interface CouncilMember {
  name: string;
  role: string;
  location: string;
  categories: ('Founders' | 'Academic Research' | 'Industry Experts' | 'Community Leads')[];
  panel: string;
  bio: string;
  seatId: string;
  status: string;
  avatar: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    name: 'Mr. Bikash Oinam',
    role: 'Founder, EduPlus Skills',
    location: 'Manipur',
    categories: ['Founders', 'Community Leads'],
    panel: 'Steering Committee & Founders',
    bio: 'An education entrepreneur dedicated to cultural revival and transformative learning. With seven years of research focused on culture and education, he designs learning experiences that reinforce modern skills and local roots.',
    seatId: 'SEAT_01',
    status: 'CHAIR',
    avatar: '/images/male_avatar.png',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Mr. Roshan Khumukcham',
    role: 'Founder, EduPlus Skills',
    location: 'Kolkata',
    categories: ['Founders', 'Industry Experts'],
    panel: 'Steering Committee & Founders',
    bio: 'Fitness and career mentor with over two decades of corporate leadership experience in the automotive industry (Hyundai, Hero Honda, LML). Focuses on discipline, professional resilience, and student mentoring.',
    seatId: 'SEAT_02',
    status: 'FOUNDER',
    avatar: '/images/male_avatar.png',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Mr. Ronen Akoijam',
    role: 'Co‑Founder, EduPlus Skills',
    location: 'Singapore',
    categories: ['Founders', 'Academic Research'],
    panel: 'Steering Committee & Founders',
    bio: 'Senior Speech Therapist and language interventions expert under the Ministry of Education in Singapore. With over 20 years of experience, he steers our inclusive learning and communication strategies.',
    seatId: 'SEAT_03',
    status: 'CO-FOUNDER',
    avatar: '/images/male_avatar.png',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Dr. Soram Bobby Singh',
    role: 'Principal Scientist, Green Hydrogen',
    location: 'South Korea',
    categories: ['Academic Research'],
    panel: 'Scientific Research & Technology',
    bio: 'Leading researcher in green hydrogen and energy materials with 15+ years of experience in materials science and water-splitting technologies. Dedicated to future-focused tech incubation.',
    seatId: 'SEAT_04',
    status: 'PRINCIPAL_SCIENTIST',
    avatar: '/images/male_avatar.png',
    social: { linkedin: '#' }
  },
  {
    name: 'Shri Romen Ningthoujam',
    role: 'Operational Lead, NE States, Goonj',
    location: 'North East India',
    categories: ['Community Leads'],
    panel: 'Grassroots Impact & Cultural Pedagogy',
    bio: 'Holds M.Ed., Ph.D. (Education) and Applied Psychology diploma. Over a decade of community development, education equity, and grassroots impact leadership at Goonj.',
    seatId: 'SEAT_05',
    status: 'GRASSR0OTS_DELEGATE',
    avatar: '/images/male_avatar.png',
    social: { linkedin: '#' }
  },
  {
    name: 'Shri Khumukcham Roshaan Singh',
    role: 'Career Coach & Executive Mentor',
    location: 'Kolkata, India',
    categories: ['Industry Experts'],
    panel: 'Corporate & Legal Advisory',
    bio: '20+ years of automotive corporate experience (Hyundai, Hero, LML). Mechanical Engineer and author of "Smart Behaviour Installation Guide", focusing on professional and behavioral readiness.',
    seatId: 'SEAT_06',
    status: 'EXECUTIVE_ADVISOR',
    avatar: '/images/male_avatar.png',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Smt. Nutan Nongthongbam',
    role: 'Life Skills Trainer & Public Health Speaker',
    location: 'India & Global',
    categories: ['Industry Experts', 'Community Leads'],
    panel: 'Grassroots Impact & Cultural Pedagogy',
    bio: 'Certified Life Skills Trainer and recognized public health speaker at national and international levels, specializing in health communication, emotional resilience, and holistic leadership.',
    seatId: 'SEAT_07',
    status: 'TRAINING_ADVISOR',
    avatar: '/images/female_avatar.png',
    social: { instagram: '#' }
  },
  {
    name: 'Ms. Geetarani Takhellambam, LL.M.',
    role: 'GM & Head Legal, Powerica Ltd.',
    location: 'Pune & Manipur',
    categories: ['Industry Experts'],
    panel: 'Corporate & Legal Advisory',
    bio: 'Dual-qualified legal expert (India & UK) with 20+ years of corporate law practice, arbitration, and compliance leadership in the renewable energy sector.',
    seatId: 'SEAT_08',
    status: 'LEGAL_COUNSEL',
    avatar: '/images/female_avatar.png',
    social: { linkedin: '#' }
  },
  {
    name: 'Shri Rojit Keisham',
    role: 'Faculty, Indian Maritime University',
    location: 'Kolkata',
    categories: ['Academic Research', 'Industry Experts'],
    panel: 'Scientific Research & Technology',
    bio: '14+ years of maritime operations experience across the USA, Australia, Europe, and Asia in the Merchant Navy. Bridges global seafaring competence with academic excellence.',
    seatId: 'SEAT_09',
    status: 'MARITIME_CHAIR',
    avatar: '/images/male_avatar.png',
    social: { linkedin: '#' }
  },
  {
    name: 'Dr. Ngangbam Shantikumar Meetei',
    role: 'Professor of English, HKUT',
    location: 'Taiwan',
    categories: ['Academic Research'],
    panel: 'Global Pedagogy & Early Childhood',
    bio: '25+ years teaching public speaking and linguistics at Hungkuo Delin University of Technology. A decorated natural bodybuilder with 12 international titles, representing physical and mental balance.',
    seatId: 'SEAT_10',
    status: 'PEDAGOGY_PROFESSOR',
    avatar: '/images/male_avatar.png',
    social: { twitter: '#', instagram: '#' }
  },
  {
    name: 'Shri Ronendrojit Akoijam',
    role: 'Senior Speech Language Therapist',
    location: 'Singapore',
    categories: ['Academic Research'],
    panel: 'Global Pedagogy & Early Childhood',
    bio: '20+ years designing speech and language intervention programs for children. Leading clinical expertise in student-centered support, language development, and speech therapy.',
    seatId: 'SEAT_11',
    status: 'THERAPY_ADVISOR',
    avatar: '/images/male_avatar.png',
    social: { linkedin: '#' }
  },
  {
    name: 'Smt. Purnimashi Moirangthem',
    role: 'Assistant Director, ECE Center',
    location: 'Dallas, Texas, USA',
    categories: ['Academic Research', 'Industry Experts'],
    panel: 'Global Pedagogy & Early Childhood',
    bio: 'Delhi University graduate, early childhood manager, and certified CDA. Combines 17 years of IT/finance corporate experience (HCL, IBM, NIIT) with early cognitive development expertise.',
    seatId: 'SEAT_12',
    status: 'COGNITIVE_LEAD',
    avatar: '/images/female_avatar.png',
    social: { linkedin: '#' }
  },
  {
    name: 'Dr. Tomba Singh Thokchom',
    role: 'Associate Professor, KSV University',
    location: 'Gujarat',
    categories: ['Academic Research'],
    panel: 'Global Pedagogy & Early Childhood',
    bio: 'Academic leader in teacher education and modern pedagogical innovation. Contributes extensively to curriculum design, educator training, and learning quality development.',
    seatId: 'SEAT_13',
    status: 'PEDAGOGICAL_COACH',
    avatar: '/images/male_avatar.png',
    social: { linkedin: '#' }
  },
  {
    name: 'Dr. Usham Rojio',
    role: 'Assistant Professor, Visva-Bharati University',
    location: 'West Bengal',
    categories: ['Academic Research', 'Community Leads'],
    panel: 'Grassroots Impact & Cultural Pedagogy',
    bio: 'Academic, poet, and experimental theatre practitioner. Explores literature, performing arts, and social expression, collaborating on grassroots cultural and community-led theatre.',
    seatId: 'SEAT_14',
    status: 'CULTURAL_ADVISOR',
    avatar: '/images/male_avatar.png',
    social: { instagram: '#' }
  }
];

const PANELS = [
  'Steering Committee & Founders',
  'Scientific Research & Technology',
  'Corporate & Legal Advisory',
  'Global Pedagogy & Early Childhood',
  'Grassroots Impact & Cultural Pedagogy'
] as const;

interface Testimonial {
  avatar: string;
  name: string;
  role: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    avatar: '/images/male_avatar.png',
    name: 'Khumukcham Premkumar Singh',
    role: 'Software Trainee, Imphal',
    quote: 'EduPlus Skills has been a game-changer for my career path. It bridged the gap between my local training in Imphal and global tech opportunities.',
  },
  {
    avatar: '/images/female_avatar.png',
    name: 'Laishram Tombisana Devi',
    role: 'Vocational Student, Imphal',
    quote: 'The community-centric pedagogy at EduPlus allowed me to build vocational skills while preserving my family\'s heritage.',
  },
  {
    avatar: '/images/male_avatar.png',
    name: 'Thokchom Ibomcha Singh',
    role: 'Grassroots Educator, Manipur',
    quote: 'As an educator, EduPlus provided the tools to redesign classroom learning in Manipur, making education highly collaborative and interactive.',
  },
  {
    avatar: '/images/female_avatar.png',
    name: 'Ningthoujam Shanti Devi',
    role: 'Primary School Teacher, Imphal West',
    quote: 'EduPlus Skills transformed how we teach early cognitive concepts to children, integrating localized play-based methodologies.',
  },
];

export default function Council() {
  const [mounted, setMounted] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CouncilMember | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSeatClick = (member: CouncilMember) => {
    setSelectedMember(member);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        category={t('heroCategory')}
        titleNormal={t('heroTitleNormal')}
        titleHighlighted={t('heroTitleHighlighted')}
        description={t('heroDesc')}
        telemetryLeft="COUNCIL_MEMBERS // ACTIVE"
        telemetryRight="GLOBAL_REPRESENTATION // STABLE"
      />

      <div className={`max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-20 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Page Explanation */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary block mb-2">
            {t('councilStructureForum')}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            {t('innovativeCouncil')}
          </h2>
          <p className="font-sans text-muted-foreground text-base leading-relaxed">
            {t('councilDescription')}
          </p>
        </div>

        {/* Unified Collapsible Accordion Council */}
        <div className="max-w-4xl mx-auto mb-20">
          <Accordion type="single" collapsible defaultValue="panel-0" className="w-full space-y-4">
            {PANELS.map((panelName, panelIndex) => {
              const members = COUNCIL_MEMBERS.filter(m => m.panel === panelName);
              return (
                <AccordionItem key={panelName} value={`panel-${panelIndex}`} className="border border-border/80 bg-card/10 px-6 py-2 rounded-none">
                  <AccordionTrigger className="hover:text-primary focus:text-primary focus:outline-none transition-colors text-sm font-semibold tracking-tight uppercase no-underline hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span>{panelName}</span>
                      <span className="font-mono text-[9px] text-muted-foreground/60 tracking-widest">[ SEATS: {members.length} ]</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 pb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {members.map((member) => (
                        <button key={member.seatId} onClick={() => handleSeatClick(member)} className="group flex flex-col items-start gap-3 p-3 border border-border/40 bg-card/30 hover:border-primary/50 hover:bg-muted/5 focus:border-primary/50 focus:bg-muted/5 focus:outline-none transition-all duration-300 rounded-none text-left w-full" title={`${member.name} - ${member.role}`}>
                          <div className="w-full aspect-square border border-border/40 overflow-hidden shrink-0">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-full h-full object-cover transition-all duration-300 grayscale brightness-[0.65] group-hover:grayscale-0 group-hover:brightness-100 group-focus:grayscale-0 group-focus:brightness-100"
                            />
                          </div>
                          <div className="w-full space-y-1">
                            <h4 className="text-xs font-semibold text-foreground group-hover:text-primary group-focus:text-primary transition-colors leading-tight">
                              {member.name}
                            </h4>
                            <p className="text-[10px] text-muted-foreground leading-normal truncate">
                              {member.role}
                            </p>
                            <div className="flex items-center justify-between w-full pt-1.5 border-t border-border/20">
                              <span className="text-[8px] font-mono text-muted-foreground/50 uppercase">
                                {member.location}
                              </span>
                              {/* Social links */}
                              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                                {member.social?.linkedin && (
                                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-0.5 text-muted-foreground hover:text-primary focus:text-primary focus:outline-none transition-colors" title="LinkedIn">
                                    <CustomIcon type="brands" name="linkedin-in" className="size-2.5" />
                                  </a>
                                )}
                                {member.social?.twitter && (
                                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-0.5 text-muted-foreground hover:text-primary focus:text-primary focus:outline-none transition-colors" title="X / Twitter">
                                    <CustomIcon type="brands" name="x-twitter" className="size-2.5" />
                                  </a>
                                )}
                                {member.social?.instagram && (
                                  <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-0.5 text-muted-foreground hover:text-primary focus:text-primary focus:outline-none transition-colors" title="Instagram">
                                    <CustomIcon type="brands" name="instagram" className="size-2.5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Testimonials Section */}
        <section className="mt-32 border-t border-border/60 pt-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-4 text-center md:text-left mb-12">
              <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary block mb-2">
                {t('testimonialsCategory')}
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
                {t('testimonialsTitle')}
              </h2>
              <p className="font-sans text-muted-foreground text-sm max-w-2xl">
                {t('testimonialsDesc')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((testimonial, index) => (
                <Card
                  key={index}
                  variant="outline"
                  className="text-foreground flex flex-col sm:flex-row items-start sm:items-end gap-4 p-6 border border-border bg-card/30 backdrop-blur-sm hover:border-primary/45 transition-all duration-300"
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="size-10 rounded-none object-cover border border-border shrink-0 shadow-sm"
                  />
                  <div className="space-y-4 flex-grow min-w-0 w-full">
                    <p className="text-foreground text-[13px] italic font-sans leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    <div className="space-y-0.5 border-t border-border/30 pt-3">
                      <p className="text-foreground text-xs font-mono tracking-wider uppercase font-semibold">{testimonial.name}</p>
                      <p className="text-muted-foreground text-[10px] uppercase font-mono tracking-wider">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Institutional Linkages Section */}
        <section className="mt-32 border-t border-border/60 pt-20">
          <div className="max-w-2xl mx-auto">
            <PartnerNetworkIllustration />
            
            <div className="mx-auto mt-12 max-w-md text-center">
              <h3 className="font-heading text-2xl font-semibold text-foreground tracking-tight">
                {t('networkTitle')}
              </h3>
              <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
                {t('networkDesc')}
              </p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="mt-8 gap-2 font-mono text-[9px] uppercase tracking-wider h-9 px-4 hover:border-primary/50"
              >
                <Link to="/contact" /* ui-ignore */>
                  {t('networkCtaText')}
                  <ChevronRight className="size-3" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </div>

      {/* Profile Detail Dialog */}
      <Dialog open={selectedMember !== null} onOpenChange={(open) => !open && setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="max-w-lg p-8 rounded-none border border-border bg-card/95 backdrop-blur-md">
            <DialogHeader className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-primary">
                <span>{selectedMember.seatId} // {selectedMember.status}</span>
                <span className="flex items-center gap-1.5 border border-border px-2.5 py-0.5 bg-background/50">
                  <MapPin className="size-2.5 text-primary" /> {selectedMember.location}
                </span>
              </div>
              
              <div className="flex items-center gap-4 border-b border-border pb-3">
                <Avatar className="size-16 border border-border shrink-0 shadow-sm">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} className="object-cover" />
                  <AvatarFallback className="text-base font-bold font-mono bg-muted text-muted-foreground uppercase">
                    {selectedMember.name.split(' ').filter(n => !n.includes('.') && n !== 'LL.M.').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 min-w-0">
                  <DialogTitle className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-none">
                    {selectedMember.name}
                  </DialogTitle>
                  <div className="text-xs font-mono text-muted-foreground uppercase leading-snug">
                    {selectedMember.role}
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <DialogDescription className="text-sm font-sans text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {selectedMember.bio}
              </DialogDescription>

              <div className="space-y-2 pt-4 border-t border-border">
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground block font-bold">
                  {t('panelAffiliations')}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-[9px] uppercase tracking-widest font-mono rounded-none py-0.5 px-2 bg-muted/40">
                    {selectedMember.panel}
                  </Badge>
                  {selectedMember.categories.map(cat => (
                    <Badge key={cat} variant="secondary" className="text-[9px] uppercase tracking-widest font-mono rounded-none py-0.5 px-2">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

const PartnerNode = ({ name, title }: { name: string; title: string }) => {
  return (
    <div 
      className="bg-card border border-border flex items-center justify-center rounded-none px-3 py-1.5 shadow-sm hover:border-primary/55 hover:bg-muted/10 transition-all duration-300 group relative cursor-help"
      title={title}
    >
      <span className="font-mono text-[9px] font-bold text-foreground tracking-wider uppercase">{name}</span>
    </div>
  );
};

const PartnerNetworkIllustration = () => {
  return (
    <div className="relative flex h-[480px] w-full flex-col items-center justify-center overflow-hidden bg-background select-none mt-8 border border-border/40">
      {/* Center Node */}
      <div className="z-20 border border-primary/20 bg-background rounded-none p-1 shadow-md shadow-primary/5 ring-1 ring-primary/10">
        <div className="bg-card border border-primary/40 flex h-10 items-center rounded-none px-5 shadow-sm">
          <div className="flex items-center gap-0">
            <span className="font-heading font-bold text-sm text-foreground tracking-tight">{t('eduLabel')}</span>
            <span className="text-primary font-light text-sm">+</span>
          </div>
        </div>
      </div>

      {/* Inner Orbit (Radius: 100, Speed/Duration: 24, Clockwise) */}
      <OrbitingCircles
        className="animate-orbit-pause z-10"
        radius={100}
        duration={24}
        path={true}
      >
        <PartnerNode name="SG MOE" title="Ministry of Education, Singapore // Speech Interventions" />
        <PartnerNode name="US ECE" title="Early Childhood Education Center, Dallas, USA // Cognitive Pedagogy" />
        <PartnerNode name="GOONJ NE" title="Grassroots Community Development, North East India // Education Equity" />
      </OrbitingCircles>

      {/* Outer Orbit (Radius: 180, Speed/Duration: 36, Counter-Clockwise) */}
      <OrbitingCircles
        className="animate-orbit-pause z-10"
        radius={180}
        duration={36}
        reverse
        path={true}
      >
        <PartnerNode name="KR LAB" title="Green Hydrogen & Energy Lab, South Korea // STEM Internships" />
        <PartnerNode name="MARITIME" title="Indian Maritime University / Global Seafaring Competence" />
        <PartnerNode name="POWERICA" title="Corporate Legal & Renewable Energy Advisory // Profile Mentorship" />
      </OrbitingCircles>
    </div>
  );
};
