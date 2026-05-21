import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { X } from 'lucide-react';

interface Program {
  title: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  outcomes: string[];
}

const PROGRAMS_DATA: Program[] = [
  {
    title: 'FuturePath Navigator',
    tagline: 'Discover Your True Potential',
    shortDesc: 'Decodes natural strengths, interests, and aptitudes using scientific psychometric assessments and DMIT evaluations for smarter stream selection.',
    longDesc: `FuturePath Navigator helps school students understand who they are before deciding where to go. Through scientifically designed psychometric assessments and DMIT-based evaluations, we decode each learner's natural strengths, interests, and aptitudes. This data-driven insight becomes the foundation for smarter academic and career choices.\n\nStudents receive one-on-one counseling sessions with certified professionals who translate assessment outcomes into clear, relatable guidance. We build detailed career maps that connect personality traits, academic performance, and real-world opportunities, highlighting both emerging and traditional fields. Learners also receive direction on subject selection aligned with their long-term goals, making board and stream choices more confident and informed.`,
    outcomes: ['Scientific Strengths Mapping', '1-on-1 Counseling Sessions', 'Custom academic and career roadmaps', 'Board & subject selection clarity']
  },
  {
    title: 'LifeSkills Lab',
    tagline: "Building Tomorrow's Leaders Today",
    shortDesc: 'Equips students with critical communication, critical thinking, emotional intelligence, financial literacy, and adaptability workshops.',
    longDesc: `LifeSkills Lab equips students with the non-negotiable soft skills and human capabilities that define success beyond grades. In a world where automation and AI reshape work, communication, critical thinking, emotional intelligence, and adaptability become differentiators. Our program ensures learners don't just perform in exams—they thrive in life.\n\nCore modules cover verbal, written, and presentation skills so that students can express themselves clearly and confidently in any setting. We develop analytical reasoning and problem-solving abilities through scenario-based challenges and decision-making frameworks. Emotional intelligence modules build self-awareness, empathy, and relationship management skills. We also train students in time management, organization, leadership, teamwork, financial literacy, and digital literacy.`,
    outcomes: ['Aesthetic verbal & written communication', 'Critical analytical reasoning skills', 'Emotional resilience and collaboration', 'Budgeting & financial literacy basics']
  },
  {
    title: 'Expert Connect Live',
    tagline: 'Learn from the Best',
    shortDesc: 'Interactive mentorship and live Q&A sessions connecting students directly with corporate professionals, academics, and global leaders.',
    longDesc: `Once learners identify their areas of interest, Expert Connect Live connects them directly with people who live and work in those worlds. Students engage with subject matter experts, industry leaders, and experienced academics who offer insights far beyond textbooks.\n\nThrough live Q&A sessions, webinars, panel discussions, mentorship conversations, and hands-on project guidance, students see how concepts translate into careers. Mentors help them understand real job roles, industry expectations, future trends, and pathways to build relevant skills. For ambitious learners, these sessions often become the first step toward internships, collaborations, and long-term professional networks.`,
    outcomes: ['Direct global professional networks', 'Real-world career path exposure', 'Live interactive mentoring workshops', 'Project-based coaching']
  },
  {
    title: 'Global Admissions Studio',
    tagline: 'Your Gateway to Global Education',
    shortDesc: 'End-to-end guidance for domestic competitive prep (JEE/NEET) and international admissions (SAT/GRE/essay writing/visas).',
    longDesc: `Global Admissions Studio simplifies complex higher education journeys—both within India and abroad. For domestic pathways, we guide learners through competitive exam ecosystems such as JEE, NEET, CUET, CLAT, and other entrance exams, aligning preparation with target institutions and career goals.\n\nWe support students in college selection by considering rankings, course relevance, faculty quality, campus culture, and long-term outcomes. Our team assists with applications, documentation, and scholarship or financial aid information.\n\nFor international education, we advise on university shortlisting across the USA, UK, Canada, Australia, Europe, and Asia. We support standardized test preparation—including SAT, ACT, GRE, GMAT, IELTS, and TOEFL—alongside guidance for crafting compelling Statements of Purpose and admissions essays. We also provide detailed visa guidance, interview preparation, and pre-departure briefings.`,
    outcomes: ['Domestic & international application support', 'Standardized test strategies (SAT, IELTS, etc.)', 'Compelling Statement of Purpose guidance', 'Visa documentation and mock interview prep']
  },
  {
    title: 'Career Launchpad',
    tagline: 'Launch Your Career with Confidence',
    shortDesc: 'Bridges talent to opportunities with resume building, LinkedIn optimization, mock interviews, and local/global placements.',
    longDesc: `Career Launchpad connects skilled individuals to real opportunities in India and abroad, closing the loop between learning and employment. We work with fresh graduates, career switchers, and experienced professionals seeking global exposure.\n\nOur placement services include resume and portfolio building, LinkedIn profile optimization, and targeted interview preparation through mock sessions and feedback loops. We leverage an extensive network of corporate partners and recruiters to match candidates with roles aligned to their skills, interests, and career goals.\n\nOpportunities span IT, healthcare, finance, engineering, management, and more, covering metro hubs as well as emerging Tier-2 and Tier-3 cities in India. For international careers, we support placements and opportunities across the Middle East, Europe, North America, Asia-Pacific, and Africa.`,
    outcomes: ['Resume and LinkedIn portfolio design', 'Rigorous mock interview evaluations', 'Tier-1 & international placement channels', 'Career transitions counseling']
  },
  {
    title: 'Innovation Studio & Educator Academy',
    tagline: 'Innovation in Education Starts Here',
    shortDesc: 'Sets up school STEM/robotics spaces for project incubation, alongside modern pedagogical training and growth tracks for teachers.',
    longDesc: `Innovation Studio transforms schools into hubs of creativity, research, and entrepreneurship. We design and set up innovation labs, STEM and robotics spaces, and creative learning environments that encourage students to experiment, build, and solve real problems. Through guided research projects, competitions, and entrepreneurship programs, learners prototype ideas, explore startup thinking, and understand how to convert concepts into impact.\n\nEducator Academy is our dedicated track for teachers and school leaders. We offer advanced training in modern pedagogy, classroom management, and curriculum delivery, alongside workshops on integrating technology, digital platforms, and e-learning tools. Subject-specific sessions deepen content delivery and assessment strategies, and professional development tracks focus on leadership, emotional intelligence, and career growth for educators.`,
    outcomes: ['STEM & Robotics lab installation models', 'Alpha Project incubation support', 'Modern pedagogy and e-learning training', 'Educator mentorship and resources']
  }
];

export default function Programs() {
  const [mounted, setMounted] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/CurriculumVisual.png"
        category="Curriculum Pathways"
        titleNormal="Future-Ready"
        titleHighlighted="Programs"
        description="At EduPlus Skills, our programs are designed as interconnected modules that support learners at every milestone—from discovering their strengths to launching global careers."
        telemetryLeft="EXPLORATION_STUDIO // VR_ACTIVE"
        telemetryRight="FUTURE_PATHWAYS // SYS_ADMIS"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Pillars Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {PROGRAMS_DATA.map((prog, index) => (
            <Card
              key={prog.title}
              onClick={() => setSelectedIdx(index)}
              className="cursor-pointer group hover:border-primary/40 hover:shadow-md transition-all duration-500 flex flex-col justify-between h-[360px]"
            >
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-sans text-primary tracking-wider uppercase block mb-3 opacity-60">
                    {prog.tagline}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-light text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {prog.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-4">
                    {prog.shortDesc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-sans font-medium text-primary mt-6 group-hover:translate-x-2 transition-transform duration-300">
                  Explore Curriculum &rarr;
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Program Detail Overlay Sheet */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-background/60 backdrop-blur-sm animate-fade-in">
          {/* Backdrop Closer */}
          <div className="absolute inset-0" onClick={() => setSelectedIdx(null)} />

          {/* Details Drawer */}
          <div className="relative w-full max-w-xl md:max-w-2xl h-full bg-card border-l border-border p-8 md:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl z-10">
            <div>
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedIdx(null)}
                className="absolute top-6 right-6"
              >
                <X className="size-5" />
              </Button>

              <span className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-primary block mb-4">
                {PROGRAMS_DATA[selectedIdx].tagline}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-8">
                {PROGRAMS_DATA[selectedIdx].title}
              </h2>

              <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed font-sans whitespace-pre-wrap">
                {PROGRAMS_DATA[selectedIdx].longDesc}
              </div>

              {/* Core Outcomes */}
              <div className="mt-10">
                <h4 className="font-heading text-lg font-light text-foreground mb-4">Key Focus Areas:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground font-sans">
                  {PROGRAMS_DATA[selectedIdx].outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">&bull;</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-border flex justify-end">
              <Button variant="outline" onClick={() => setSelectedIdx(null)}>
                Close Panel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
