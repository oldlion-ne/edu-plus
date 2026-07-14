import { Link } from 'react-router';
import { PageHero } from '@/components/ui/page-hero';

const ARTICLES = [
  {
    title: 'Transforming Learning at Mommy Complex, Nambol Bazar',
    date: 'May 12, 2026',
    category: 'Grassroots Impact',
    desc: 'Establishing our new offline learning center in Manipur to deliver immersive psychometric evaluations, career mapping, and life skills workshops to schools across the Bishnupur district.',
  },
  {
    title: "Bridging Singapore's Clinical Speech Interventions to Local Classrooms",
    date: 'April 28, 2026',
    category: 'Academic Insights',
    desc: 'Co-founder Ronen Akoijam highlights the importance of language development and inclusive education practices in early childhood curriculums, standardizing student accessibility.',
  },
  {
    title: 'Green Hydrogen Internships: South Korea to Manipur Dialogues',
    date: 'April 15, 2026',
    category: 'Global Research',
    desc: 'Council expert Dr. Soram Bobby Singh outlines the future of green energy and energy materials science, detailing new research internship paths for high school STEM cohorts.',
  },
  {
    title: 'Behavioral Transformation: Launching the "Smart Behaviour Installation Guide"',
    date: 'March 30, 2026',
    category: 'Professional Prep',
    desc: 'Executive mentor Khumukcham Roshaan Singh releases his new guide detailing auto-industry ready soft skills and behavioral standards now integrated into Career Launchpad.',
  },
];

export default function News() {
  return (
    <div className="bg-background w-full min-h-screen">

      {/* ── Typographic Hero ── */}
      <PageHero
        eyebrow="Updates &amp; Publications"
        title="News &amp; Insights"
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
              {/* 3:2 contained thumbnail placeholder */}
              <div className="aspect-[3/2] w-full bg-secondary flex items-center justify-center text-muted-foreground">
                <span className="text-[11px] uppercase tracking-wide">{article.category}</span>
              </div>

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
                <Link to={`/news/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-[14px] font-medium text-primary hover:underline">
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
