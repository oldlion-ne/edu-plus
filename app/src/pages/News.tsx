import { Link, useParams } from 'react-router';
import { EditorialMedia } from '@/components/ui/editorial-media';
import { PageHero } from '@/components/ui/page-hero';
import { editorialIllustrations } from '@/lib/editorialIllustrations';
import { FOCUS_RING_CLASSES } from '@/lib/utils';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { MagicCard } from '@/components/magicui/MagicCard';

const ARTICLES = [
  {
    title: 'MBBS in Vietnam: Gateway for Indian Students',
    date: 'July 6, 2026',
    category: 'Medical Admissions',
    desc: 'Holistic Eduplus Skills announces affordable, high-quality MBBS programs at Hong Bang International University and Dong A University, featuring modern clinical exposure and NMC compliance.',
    illustration: editorialIllustrations.newsCommunity,
  },
  {
    title: 'Dubai Job Placement Walk-in Drive',
    date: 'July 3, 2026',
    category: 'Global Careers',
    desc: 'Ready to build your career in Dubai? Eduplus Skills is hosting walk-in interviews with leading companies across multiple industries offering attractive salary packages.',
    illustration: editorialIllustrations.newsCoaching,
  },
  {
    title: 'Summer Camp Imphal 2026 Kicks Off!',
    date: 'June 25, 2026',
    category: 'Skill Development',
    desc: 'An exciting journey of skill-building in collaboration with NIELIT Imphal, Manipur University, RIMS Dental College, and CIPET Takyel, featuring IoT, Robotics, and Plastic Engineering.',
    illustration: editorialIllustrations.newsSpeech,
  },
  {
    title: 'IMU CET Results Out: Chart Your Maritime Course',
    date: 'June 24, 2026',
    category: 'Admissions Support',
    desc: 'The IMU CET results are out! Step-by-step admission and counseling guidance is now available for students securing their seats in the Merchant Navy.',
    illustration: editorialIllustrations.newsEnergy,
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
          {ARTICLES.map((article, i) => (
            <ScrollReveal key={article.title} delay={i * 0.1}>
              <MagicCard
                className="group flex flex-col gap-6 p-10 bg-transparent hover:bg-secondary transition-colors duration-200 h-full rounded-none border border-border/30"
                gradientColor="oklch(var(--primary) / 0.08)"
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
              </MagicCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </div>
  );
}
