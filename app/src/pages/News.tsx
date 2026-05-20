import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';

interface Article {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
}

const ARTICLES: Article[] = [
  {
    title: 'Transforming Learning at Mommy Complex, Nambol Bazar',
    category: 'Grassroots Impact',
    date: 'May 12, 2026',
    excerpt: 'Establishing our new offline learning center in Manipur to deliver immersive psychometric evaluations, career mapping, and life skills workshops to schools across the Bishnupur district.',
    readTime: '4 min read'
  },
  {
    title: 'Bridging Singapore’s Clinical Speech Interventions to Local Classrooms',
    category: 'Academic Insights',
    date: 'April 28, 2026',
    excerpt: 'Co-founder Ronen Akoijam highlights the importance of language development and inclusive education practices in early childhood curriculums, standardizing student accessibility.',
    readTime: '6 min read'
  },
  {
    title: 'Green Hydrogen Internships: South Korea to Manipur Dialogues',
    category: 'Global Research',
    date: 'April 15, 2026',
    excerpt: 'Council expert Dr. Soram Bobby Singh outlines the future of green energy and energy materials science, detailing new research internship paths for high school STEM cohorts.',
    readTime: '5 min read'
  },
  {
    title: 'Behavioral Transformation: Launching the "Smart Behaviour Installation Guide"',
    category: 'Professional Prep',
    date: 'March 30, 2026',
    excerpt: 'Executive mentor Khumukcham Roshaan Singh releases his new guide detailing auto-industry ready soft skills and behavioral standards now integrated into Career Launchpad.',
    readTime: '3 min read'
  }
];

export default function News() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Decorative radial glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#7DF9FF]/4 rounded-none blur-[140px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/NewsVisual.png"
        category="Updates & Publications"
        titleNormal="News &"
        titleHighlighted="Insights"
        description="This space brings you closer to the people, programs, and impact behind EduPlus Skills. We share success stories, event highlights, and perspectives on the evolving world of education and work."
        telemetryLeft="BROADCAST_NODE // STABLE"
        telemetryRight="UTC_COORD_NEWS_STREAM"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">

        {/* Articles Grid */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {ARTICLES.map((article, idx) => (
            <div
              key={idx}
              className="liquid-glass p-8 md:p-10 hover:border-[#7DF9FF]/30 transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-sans text-[#8B949E] mb-6">
                  <span className="text-[#7DF9FF] bg-[#7DF9FF]/10 px-3 py-1 rounded-none border border-[#7DF9FF]/20 font-medium">
                    {article.category}
                  </span>
                  <span>{article.date}</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-light text-[#E6EDF3] group-hover:text-[#7DF9FF] transition-colors duration-300 mb-4 leading-snug">
                  {article.title}
                </h3>
                <p className="font-sans text-sm text-[#8B949E] leading-relaxed mb-8">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-sans pt-4 border-t border-[#7DF9FF]/5 text-[#8B949E]">
                <span>{article.readTime}</span>
                <span className="text-[#7DF9FF] group-hover:translate-x-1.5 transition-transform duration-300">
                  Read Article &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
