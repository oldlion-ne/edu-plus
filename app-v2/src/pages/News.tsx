import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { MagicCard } from '../components/effects/CyberVisualizations';
import { Badge } from '../components/ui/badge';
import { Globe, BookOpen, Briefcase } from 'lucide-react';

const translations = {
  heroCategory: "Updates & Publications",
  heroTitleNormal: "News &",
  heroTitleHighlighted: "Insights",
  heroDesc: "This space brings you closer to the people, programs, and impact behind EduPlus Skills. We share success stories, event highlights, and perspectives on the evolving world of education and work.",
  readArticleLabel: "Read Article \u2192",
  
  // Editorial Focus
  editorialHeader: "Editorial Focus & Columns",
  editorialDesc: "Our news stream covers the intersection of grassroots learning, academic research, and career preparedness.",
  col1Title: "Grassroots Impact",
  col1Desc: "Documenting school transformations, rural learning labs, and community-driven education initiatives across the North East.",
  col2Title: "Academic Research",
  col2Desc: "Bringing insights on language pathology, early childhood cognitive interventions, and STEM standards from global universities.",
  col3Title: "Career Readiness",
  col3Desc: "Analyzing professional transitions, corporate soft skills, maritime competence, and real-world placement routing.",
  
  // Articles data keys
  art1Title: "Transforming Learning at Mommy Complex, Nambol Bazar",
  art1Category: "Grassroots Impact",
  art1Date: "May 12, 2026",
  art1Excerpt: "Establishing our new offline learning center in Manipur to deliver immersive psychometric evaluations, career mapping, and life skills workshops to schools across the Bishnupur district.",
  art1ReadTime: "4 min read",

  art2Title: "Bridging Singapore's Clinical Speech Interventions to Local Classrooms",
  art2Category: "Academic Insights",
  art2Date: "April 28, 2026",
  art2Excerpt: "Co-founder Ronen Akoijam highlights the importance of language development and inclusive education practices in early childhood curriculums, standardizing student accessibility.",
  art2ReadTime: "6 min read",

  art3Title: "Green Hydrogen Internships: South Korea to Manipur Dialogues",
  art3Category: "Global Research",
  art3Date: "April 15, 2026",
  art3Excerpt: "Council expert Dr. Soram Bobby Singh outlines the future of green energy and energy materials science, detailing new research internship paths for high school STEM cohorts.",
  art3ReadTime: "5 min read",

  art4Title: "Behavioral Transformation: Launching the \"Smart Behaviour Installation Guide\"",
  art4Category: "Professional Prep",
  art4Date: "March 30, 2026",
  art4Excerpt: "Executive mentor Khumukcham Roshaan Singh releases his new guide detailing auto-industry ready soft skills and behavioral standards now integrated into Career Launchpad.",
  art4ReadTime: "3 min read"
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

interface ArticleKeys {
  titleKey: keyof typeof translations;
  categoryKey: keyof typeof translations;
  dateKey: keyof typeof translations;
  excerptKey: keyof typeof translations;
  readTimeKey: keyof typeof translations;
}

const ARTICLES_KEYS: ArticleKeys[] = [
  {
    titleKey: 'art1Title',
    categoryKey: 'art1Category',
    dateKey: 'art1Date',
    excerptKey: 'art1Excerpt',
    readTimeKey: 'art1ReadTime'
  },
  {
    titleKey: 'art2Title',
    categoryKey: 'art2Category',
    dateKey: 'art2Date',
    excerptKey: 'art2Excerpt',
    readTimeKey: 'art2ReadTime'
  },
  {
    titleKey: 'art3Title',
    categoryKey: 'art3Category',
    dateKey: 'art3Date',
    excerptKey: 'art3Excerpt',
    readTimeKey: 'art3ReadTime'
  },
  {
    titleKey: 'art4Title',
    categoryKey: 'art4Category',
    dateKey: 'art4Date',
    excerptKey: 'art4Excerpt',
    readTimeKey: 'art4ReadTime'
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
        category={t('heroCategory')}
        titleNormal={t('heroTitleNormal')}
        titleHighlighted={t('heroTitleHighlighted')}
        description={t('heroDesc')}
        telemetryLeft="BROADCAST_NODE // STABLE"
        telemetryRight="UTC_COORD_NEWS_STREAM"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Editorial Focus Columns Section */}
        <section className={`mb-20 transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="border border-border bg-card/30 p-8 backdrop-blur-sm">
            <div className="space-y-3 mb-10 max-w-xl">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                {t('editorialHeader')}
              </h2>
              <p className="text-muted-foreground text-xs font-sans leading-relaxed">
                {t('editorialDesc')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs border-t border-border/60 pt-8">
              <div className="space-y-3">
                <Globe className="text-primary size-5" />
                <h4 className="font-heading text-sm font-semibold text-foreground tracking-tight">{t('col1Title')}</h4>
                <p className="text-muted-foreground leading-relaxed font-sans">
                  {t('col1Desc')}
                </p>
              </div>

              <div className="space-y-3">
                <BookOpen className="text-primary size-5" />
                <h4 className="font-heading text-sm font-semibold text-foreground tracking-tight">{t('col2Title')}</h4>
                <p className="text-muted-foreground leading-relaxed font-sans">
                  {t('col2Desc')}
                </p>
              </div>

              <div className="space-y-3">
                <Briefcase className="text-primary size-5" />
                <h4 className="font-heading text-sm font-semibold text-foreground tracking-tight">{t('col3Title')}</h4>
                <p className="text-muted-foreground leading-relaxed font-sans">
                  {t('col3Desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {ARTICLES_KEYS.map((article, idx) => (
            <MagicCard
              key={idx}
              heightClass="h-[300px] md:h-[320px]"
            >
              <div className="flex flex-col justify-between h-full space-y-4 p-2">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground border-b border-border/50 pb-2 mb-4">
                    <Badge variant="secondary" className="font-mono text-[9px] py-0.5 px-1.5 rounded-none">
                      {t(article.categoryKey)}
                    </Badge>
                    <span>{t(article.dateKey)}</span>
                  </div>
                  
                  <h3 className="font-heading text-xl font-semibold text-foreground tracking-tight hover:text-primary transition-colors duration-300 mb-3 leading-snug">
                    {t(article.titleKey)}
                  </h3>
                  
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {t(article.excerptKey)}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono pt-4 border-t border-border/60 text-muted-foreground">
                  <span>{t(article.readTimeKey)}</span>
                  <span className="text-primary hover:translate-x-1 transition-transform duration-300 cursor-pointer">
                    {t('readArticleLabel')}
                  </span>
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </div>
  );
}
