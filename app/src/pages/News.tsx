import { Link, useParams } from 'react-router';
import { EditorialMedia } from '@/components/ui/editorial-media';
import { PageHero } from '@/components/ui/page-hero';
import { editorialIllustrations } from '@/lib/editorialIllustrations';
import { FOCUS_RING_CLASSES } from '@/lib/utils';

const ARTICLES = [
  {
    title: 'Transforming Learning at Mommy Complex, Nambol Bazar',
    date: 'May 12, 2026',
    category: 'Grassroots Impact',
    desc: 'Establishing our new offline learning center in Manipur to deliver immersive psychometric evaluations, career mapping, and life skills workshops to schools across the Bishnupur district.',
    illustration: editorialIllustrations.newsCommunity,
  },
  {
    title: "Bridging Singapore's Clinical Speech Interventions to Local Classrooms",
    date: 'April 28, 2026',
    category: 'Academic Insights',
    desc: 'Co-founder Ronen Akoijam highlights the importance of language development and inclusive education practices in early childhood curriculums, standardizing student accessibility.',
    illustration: editorialIllustrations.newsSpeech,
  },
  {
    title: 'Green Hydrogen Internships: South Korea to Manipur Dialogues',
    date: 'April 15, 2026',
    category: 'Global Research',
    desc: 'Council expert Dr. Soram Bobby Singh outlines the future of green energy and energy materials science, detailing new research internship paths for high school STEM cohorts.',
    illustration: editorialIllustrations.newsEnergy,
  },
  {
    title: 'Behavioral Transformation: Launching the "Smart Behaviour Installation Guide"',
    date: 'March 30, 2026',
    category: 'Professional Prep',
    desc: 'Executive mentor Khumukcham Roshaan Singh releases his new guide detailing auto-industry ready soft skills and behavioral standards now integrated into Career Launchpad.',
    illustration: editorialIllustrations.newsCoaching,
  },
];

export default function News() {
  const { slug } = useParams();

  if (slug) {
    const article = ARTICLES.find(a => a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
    if (!article) {
      return (
        <div className="bg-background w-full min-h-screen pt-40 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-medium text-foreground mb-4">Article not found</h1>
            <p className="text-muted-foreground mb-8">We could not find the news article you are looking for.</p>
            <Link to="/news" className={`inline-block text-[14px] font-medium text-primary hover:underline ${FOCUS_RING_CLASSES}`}>
              Back to News
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-background w-full min-h-screen pt-32 px-6 pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <Link to="/news" className={`inline-block text-[14px] font-medium text-primary hover:underline ${FOCUS_RING_CLASSES}`}>
              Back to News
            </Link>
          </div>
          <span className="text-[12px] font-medium text-primary uppercase tracking-wide block mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl font-medium text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
          <span className="text-[14px] text-muted-foreground block mb-12">
            {article.date}
          </span>
          <div className="mb-12">
            <EditorialMedia asset={article.illustration} />
          </div>
          <p className="text-lg text-foreground leading-relaxed">
            {article.desc}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background w-full min-h-screen">

      {/* ── Typographic Hero ── */}
      <PageHero
        eyebrow="Updates &amp; Publications"
        title="News &amp; Insights"
        illustration={editorialIllustrations.news}
        description="Success stories, event highlights, and perspectives on the evolving world of education, technology, and work."
      />

      {/* ── Clean Article Grid ── */}
      <section className="py-20 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {ARTICLES.map((article) => (
            <div
              key={article.title}
              className="group flex flex-col gap-6 p-10 bg-transparent hover:bg-secondary transition-colors duration-200"
            >
              <EditorialMedia asset={article.illustration} />

              {/* Text content */}
              <div className="space-y-4">
                <span className="text-[12px] text-muted-foreground block">{article.date}</span>
                <h3 className="text-[20px] font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {article.desc}
                </p>
              </div>

              {/* Link */}
              <div className="pt-2">
                <Link to={`/news/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className={`text-[14px] font-medium text-primary hover:underline ${FOCUS_RING_CLASSES}`}>
                  Read Article &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
