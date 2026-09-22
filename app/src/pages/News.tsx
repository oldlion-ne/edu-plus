import { useState, useEffect } from 'react';
import { PageMeta } from '@/components/PageMeta';
import { Link, useParams } from 'react-router';
import { EditorialMedia } from '@/components/ui/editorial-media';
import { PageHero } from '@/components/ui/page-hero';
import { editorialIllustrations } from '@/lib/editorialIllustrations';
import { FOCUS_RING_CLASSES } from '@/lib/utils';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { MagicCard } from '@/components/magicui/MagicCard';
import { supabase } from '@/lib/supabaseClient';

const INITIAL_ARTICLES = [
 {
 title: 'MBBS in Vietnam: Gateway for Indian Students',
 date: 'July 6, 2026',
 category: 'Medical Admissions',
 desc: 'Holistic Eduplus Skills announces affordable, high-quality MBBS programs at Hong Bang International University and Dong A University, featuring modern clinical exposure and NMC compliance.',
 illustration: editorialIllustrations.newsCommunity,
 slug: 'mbbs-in-vietnam-gateway-for-indian-students'
 },
 {
 title: 'Dubai Job Placement Walk-in Drive',
 date: 'July 3, 2026',
 category: 'Global Careers',
 desc: 'Ready to build your career in Dubai? Eduplus Skills is hosting walk-in interviews with leading companies across multiple industries offering attractive salary packages.',
 illustration: editorialIllustrations.newsCoaching,
 slug: 'dubai-job-placement-walk-in-drive'
 },
 {
 title: 'Summer Camp Imphal 2026 Kicks Off!',
 date: 'June 25, 2026',
 category: 'Skill Development',
 desc: 'An exciting journey of skill-building in collaboration with NIELIT Imphal, Manipur University, RIMS Dental College, and CIPET Takyel, featuring IoT, Robotics, and Plastic Engineering.',
 illustration: editorialIllustrations.newsSpeech,
 slug: 'summer-camp-imphal-2026-kicks-off'
 },
 {
 title: 'IMU CET Results Out: Chart Your Maritime Course',
 date: 'June 24, 2026',
 category: 'Admissions Support',
 desc: 'The IMU CET results are out! Step-by-step admission and counseling guidance is now available for students securing their seats in the Merchant Navy.',
 illustration: editorialIllustrations.newsEnergy,
 slug: 'imu-cet-results-out-chart-your-maritime-course'
 },
];

const CATEGORIES = ['All', 'Medical Admissions', 'Global Careers', 'Skill Development', 'Admissions Support'];

export default function News() {
 const { slug } = useParams();
 const [articles, setArticles] = useState<any[]>(INITIAL_ARTICLES);
 const [activeCategory, setActiveCategory] = useState('All');

 useEffect(() => {
 async function loadNews() {
 try {
 const { data, error } = await supabase
 .from('cms_news')
 .select('*')
 .eq('is_published', true)
 .order('published_at', { ascending: false });

 if (!error && data && data.length > 0) {
 const dbArticles = data.map(item => ({
 title: item.title,
 date: new Date(item.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
 category: item.category,
 desc: item.body || item.excerpt,
 slug: item.slug,
 illustration: editorialIllustrations.newsCommunity,
 cover_image: item.cover_image
 }));
 setArticles(dbArticles);
 }
 } catch (err) {
 // Fallback to initial articles on network error
 }
 }
 loadNews();
 }, []);

 if (slug) {
 const article = articles.find(a => (a.slug || a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')) === slug);
 if (!article) {
 return (
 <div className=" w-full flex-1 pt-40 px-6">
      <PageMeta title="News & Updates"
        description="Stay up to date with EduPlus Skills news, partnerships, and community stories."
      />
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
 <div className=" w-full flex-1">
 <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-12 mt-16">
 <div className="max-w-3xl mx-auto">
 <div className="mb-12">
 <Link to="/news" className={`inline-block text-[14px] font-medium text-primary hover:underline ${FOCUS_RING_CLASSES}`}>
 &larr; Back to News
 </Link>
 </div>
 <span className="text-[12px] font-medium text-primary uppercase tracking-wide block mb-4">
 {article.category}
 </span>
 <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
 {article.title}
 </h1>
 <span className="text-[14px] text-muted-foreground block mb-12">
 {article.date}
 </span>
 <div className="mb-12 border border-border/50">
 {article.cover_image ? (
 <img src={article.cover_image} alt={article.title} className="w-full object-cover" />
 ) : (
 <EditorialMedia asset={article.illustration} />
 )}
 </div>
 <p className="text-[16px] text-foreground leading-relaxed">
 {article.desc}
 </p>
 </div>
 </section>
 </div>
 );
 }

 return (
 <div className=" w-full flex-1">

 {/* ── Typographic Hero ── */}
 <PageHero
 eyebrow="Updates &amp; Publications"
 title="News &amp; Insights"
 illustration={editorialIllustrations.news}
 description="Success stories, event highlights, and perspectives on the evolving world of education, technology, and work."
 />

  {/* ── Category Filters ── */}
  <section className="pt-12 px-6 md:px-12 max-w-[1440px] mx-auto">
    <div className="flex gap-4 overflow-x-auto pb-4 border-b border-border/50 no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          aria-pressed={activeCategory === cat}
          className={`whitespace-nowrap pb-2 text-[14px] font-medium transition-colors border-b-2 -mb-[17px] ${FOCUS_RING_CLASSES} ${
            activeCategory === cat
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </section>

  {/* ── Clean Article Grid ── */}
  <section className="py-12 border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
  {articles
    .filter(a => activeCategory === 'All' || a.category === activeCategory)
    .map((article: any, i: number) => {
  const articleSlug = article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const isFeatured = i === 0 && activeCategory === 'All';
  return (
  <ScrollReveal key={article.title} delay={i * 0.05} className={isFeatured ? 'md:col-span-2 lg:col-span-3' : ''}>
  <MagicCard
  className={`group flex flex-col ${isFeatured ? 'md:flex-row' : ''} gap-6 p-8 bg-transparent hover:bg-secondary transition-colors duration-200 h-full rounded-none border border-border/30`}
  gradientColor="oklch(var(--primary) / 0.08)"
  >
  {article.cover_image ? (
  <div className={`w-full overflow-hidden border border-border/50 ${isFeatured ? 'md:w-1/2 md:h-[400px]' : 'h-48'}`}>
  <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
  </div>
  ) : (
  <div className={`${isFeatured ? 'md:w-1/2' : ''}`}>
    <EditorialMedia asset={article.illustration} />
  </div>
  )}

  {/* Text content */}
  <div className={`space-y-4 flex flex-col justify-center ${isFeatured ? 'md:w-1/2 md:pl-6' : ''}`}>
  <span className="text-[12px] font-medium text-primary uppercase tracking-wide block">{article.category}</span>
  <h3 className={`${isFeatured ? 'text-[28px] md:text-[36px]' : 'text-[20px]'} font-medium text-foreground leading-snug group-hover:text-primary transition-colors`}>
  {article.title}
  </h3>
  <span className="text-[12px] text-muted-foreground block mb-2">{article.date}</span>
  <p className="text-[15px] text-muted-foreground leading-relaxed">
  {article.desc}
  </p>
  {/* Link */}
  <div className="pt-4 mt-auto">
  <Link to={`/news/${articleSlug}`} className={`text-[14px] font-medium text-primary hover:underline ${FOCUS_RING_CLASSES}`}>
  Read Article &rarr;
  </Link>
  </div>
  </div>
 </MagicCard>
 </ScrollReveal>
 );
 })}
 </div>
 </section>

 </div>
 );
}
