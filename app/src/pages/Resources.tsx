import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Button } from '../components/ui/button';
import { NeonGradientCard } from '../components/ui/neon-gradient-card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { X, Globe, BookOpen, Briefcase, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  category: 'tutorial' | 'podcast' | 'webinar' | 'study_material';
  media_type: 'video_embed' | 'document_url' | 'external_link';
  url: string;
  author_name: string;
  created_at: string;
  cover_image_url?: string;
}

const HUB_TABS = ['all', 'tutorial', 'podcast', 'webinar', 'study_material'];

const translations = {
  heroCategory: "Updates & Learning",
  heroTitleNormal: "Resources &",
  heroTitleHighlighted: "Insights",
  heroDesc: "Explore our archive of technical tutorials, podcasts, webinars, and editorial news highlighting the intersection of learning, research, and career paths.",
  
  // News translations
  readArticleLabel: "Read \u2192",
  editorialHeader: "Editorial Focus & Columns",
  editorialDesc: "Our news stream covers the intersection of grassroots learning, academic research, and career preparedness.",
  col1Title: "Grassroots Impact",
  col1Desc: "Documenting school transformations, rural learning labs, and community-driven education initiatives across the North East.",
  col2Title: "Academic Research",
  col2Desc: "Bringing insights on language pathology, early childhood cognitive interventions, and STEM standards from global universities.",
  col3Title: "Career Readiness",
  col3Desc: "Analyzing professional transitions, corporate soft skills, maritime competence, and real-world placement routing.",
  
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
  art4ReadTime: "3 min read",

  // Knowledge Hub translations
  searchPlaceholder: "Search resources...",
  loadingResources: "LOADING RESOURCES...",
  noResources: "NO RESOURCES MATCHING QUERY.",
  srcPrefix: "SRC // ",
  noSupplementaryData: "No supplementary data available.",
  nodePrefix: "NODE: ",
  launchPlayback: "PLAY",
  openLink: "OPEN",
  videoPlayback: "VIDEO PLAYBACK"
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

interface ArticleKeys {
  titleKey: keyof typeof translations;
  categoryKey: keyof typeof translations;
  dateKey: keyof typeof translations;
  excerptKey: keyof typeof translations;
  readTimeKey: keyof typeof translations;
  image: string;
}

const ARTICLES_KEYS: ArticleKeys[] = [
  {
    titleKey: 'art1Title',
    categoryKey: 'art1Category',
    dateKey: 'art1Date',
    excerptKey: 'art1Excerpt',
    readTimeKey: 'art1ReadTime',
    image: '/assets/news-learning-center.png'
  },
  {
    titleKey: 'art2Title',
    categoryKey: 'art2Category',
    dateKey: 'art2Date',
    excerptKey: 'art2Excerpt',
    readTimeKey: 'art2ReadTime',
    image: '/assets/news-speech-interventions.png'
  },
  {
    titleKey: 'art3Title',
    categoryKey: 'art3Category',
    dateKey: 'art3Date',
    excerptKey: 'art3Excerpt',
    readTimeKey: 'art3ReadTime',
    image: '/assets/news-green-hydrogen.png'
  },
  {
    titleKey: 'art4Title',
    categoryKey: 'art4Category',
    dateKey: 'art4Date',
    excerptKey: 'art4Excerpt',
    readTimeKey: 'art4ReadTime',
    image: '/assets/news-behavioral-transformation.png'
  }
];

export default function Resources() {
  const [mounted, setMounted] = useState(false);
  const [activePageTab, setActivePageTab] = useState<'news' | 'hub'>('news');
  
  // Knowledge Hub states
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<KnowledgeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHubTab, setActiveHubTab] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (window.location.hash === '#hub') {
      setActivePageTab('hub');
    } else if (window.location.hash === '#news') {
      setActivePageTab('news');
    }
  }, []);

  // Fetch Knowledge items on mount
  useEffect(() => {
    async function fetchItems() {
      try {
        const { data, error } = await supabase
          .from('knowledge_hub')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setItems(data || []);
        setFilteredItems(data || []);
      } catch (err) {
        console.error('Error fetching hub content:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  // Filter Knowledge items when query or category tab changes
  useEffect(() => {
    let filtered = items;
    if (activeHubTab !== 'all') {
      filtered = filtered.filter(item => item.category === activeHubTab);
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.author_name.toLowerCase().includes(query)
      );
    }
    setFilteredItems(filtered);
  }, [searchQuery, activeHubTab, items]);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden font-sans">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-none blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/3 rounded-none blur-[150px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        category={t('heroCategory')}
        titleNormal={t('heroTitleNormal')}
        titleHighlighted={t('heroTitleHighlighted')}
        description={t('heroDesc')}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        
        {/* Main Tab Controls */}
        <div className="flex border-b border-border mb-12">
          <button /* ui-ignore */
            onClick={() => setActivePageTab('news')}
            className={cn(
              "px-6 py-3 font-mono text-sm tracking-wider uppercase border-b-2 transition-all duration-300 outline-none focus:outline-none focus:ring-1 focus:ring-primary/40 hover:text-foreground",
              activePageTab === 'news'
                ? "border-primary text-foreground font-semibold"
                : "border-transparent text-muted-foreground"
            )}
          >
            News & Insights
          </button>
          <button /* ui-ignore */
            onClick={() => setActivePageTab('hub')}
            className={cn(
              "px-6 py-3 font-mono text-sm tracking-wider uppercase border-b-2 transition-all duration-300 outline-none focus:outline-none focus:ring-1 focus:ring-primary/40 hover:text-foreground",
              activePageTab === 'hub'
                ? "border-primary text-foreground font-semibold"
                : "border-transparent text-muted-foreground"
            )}
          >
            Learning Hub
          </button>
        </div>

        {/* Tab Content 1: News & Insights */}
        {activePageTab === 'news' && (
          <div className="space-y-16 animate-fade-in">
            {/* Editorial Focus Columns Section */}
            <section className={`transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                <NeonGradientCard
                  key={idx}
                  className="border border-border/50 h-auto min-h-[300px]"
                >
                  <div className="flex flex-col justify-between h-full space-y-4">
                    {/* Visual Top Header Box with Diorama Image */}
                    <div className="relative w-[calc(100%+3rem)] aspect-video border-b border-border/80 overflow-hidden -mx-6 -mt-6 mb-2 group/article-image">
                      {/* Image Background */}
                      <img
                        src={article.image}
                        alt={t(article.titleKey)}
                        className="absolute inset-0 w-full h-full object-cover opacity-95 transition-transform duration-700 group-hover/article-image:scale-105"
                      />
                      {/* Overlay gradient to keep text highly readable */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-[1]" />
                    </div>

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

                    <div className="flex items-center justify-between pt-4 border-t border-border/60 text-muted-foreground">
                      <span className="text-[10px] font-mono">{t(article.readTimeKey)}</span>
                      <Button variant="outline" size="sm" className="font-mono text-[8px] tracking-wider uppercase h-7 px-2 py-0 hover:border-primary/50">
                        {t('readArticleLabel')} <ArrowRight className="size-3" />
                      </Button>
                    </div>
                  </div>
                </NeonGradientCard>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 2: Learning Hub */}
        {activePageTab === 'hub' && (
          <div className="space-y-10 animate-fade-in">
            {/* Controls Matrix */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center border-b border-border pb-8">
              <div className="flex flex-wrap gap-2">
                {HUB_TABS.map(tab => (
                  <Button
                    key={tab}
                    variant={activeHubTab === tab ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveHubTab(tab)}
                    className={cn(
                      "uppercase tracking-wider font-mono text-xs rounded-none",
                      activeHubTab === tab ? "" : "liquid-glass"
                    )}
                  >
                    {tab.replace('_', ' ')}
                  </Button>
                ))}
              </div>

              <div className="w-full md:w-80">
                <Input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="font-mono tracking-wider text-xs liquid-glass bg-background/50 rounded-none"
                />
              </div>
            </div>

            {/* Grid display */}
            {loading ? (
              <div className="text-center py-20 font-mono text-primary text-sm tracking-widest animate-pulse">
                {t('loadingResources')}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20 font-mono text-muted-foreground text-sm tracking-widest border border-border bg-muted/20">
                {t('noResources')}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => {
                  const isYoutube = item.media_type === 'video_embed' && getYoutubeId(item.url);
                  return (
                    <NeonGradientCard
                      key={item.id}
                      className="border border-border/50 h-[300px] md:h-[320px] overflow-hidden"
                    >
                      <div className="flex flex-col justify-between h-full space-y-4">
                        <div>
                          <div className="flex justify-between items-center text-[8px] font-mono text-primary tracking-widest uppercase border-b border-border/50 pb-2 mb-3">
                            <span>{t('srcPrefix')}{item.media_type.replace('_', ' ')}</span>
                            <span>{item.category.replace('_', ' ')}</span>
                          </div>
                          
                          <h3 className="font-heading text-lg font-semibold text-foreground tracking-tight mb-2 leading-snug hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-3">
                            {item.description || t('noSupplementaryData')}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-border flex items-center justify-between">
                          <span className="text-[9px] font-mono text-muted-foreground uppercase">
                            {t('nodePrefix')}{item.author_name}
                          </span>
                          {isYoutube ? (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setSelectedVideo(item.url)}
                              className="font-mono text-[9px] tracking-wider uppercase h-8 liquid-glass rounded-none"
                            >
                              {t('launchPlayback')}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                              className="h-8 liquid-glass rounded-none"
                            >
                              <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] tracking-wider uppercase" /* ui-ignore */>
                                {t('openLink')}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </NeonGradientCard>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Overlay */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-4xl bg-card border border-border shadow-2xl relative">
            <div className="flex items-center justify-between p-3 border-b border-border bg-muted">
              <span className="font-mono text-[10px] font-bold tracking-widest text-primary">{t('videoPlayback')}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video"
                className="rounded-none"
              >
                <X className="size-4" />
              </Button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo)}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
