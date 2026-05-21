import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

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
    title: 'Bridging Singapore\'s Clinical Speech Interventions to Local Classrooms',
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
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
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
            <Card
              key={idx}
              className="hover:border-primary/40 hover:shadow-md transition-all duration-500 flex flex-col justify-between group"
            >
              <CardContent className="p-8 md:p-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between text-xs font-sans text-muted-foreground mb-6">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-light text-foreground group-hover:text-primary transition-colors duration-300 mb-4 leading-snug">
                    {article.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-8">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-sans pt-4 border-t border-border text-muted-foreground">
                  <span>{article.readTime}</span>
                  <span className="text-primary group-hover:translate-x-1.5 transition-transform duration-300">
                    Read Article &rarr;
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
