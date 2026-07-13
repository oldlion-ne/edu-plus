import { useEffect, useState } from 'react';
import { loadPublishedResources, type PublishedResource } from '../lib/content/public-content';
import { EditorialHero } from '../components/layout/EditorialHero';
import { Button } from '../components/ui/button';
import { SurfaceCard } from '../components/effects/SurfaceCard';
import { Input } from '../components/ui/input';
import { X } from 'lucide-react';

const TABS = ['all', 'tutorial', 'podcast', 'webinar', 'study_material'];

const translations = {
  heroCategory: "Ecosystem Nodes",
  heroTitleNormal: "Knowledge",
  heroTitleHighlighted: "Hub",
  heroDesc: "Access elite technical tutorials, educational webinars, and expert podcasts compiled to accelerate your academic and skill roadmap.",
  searchPlaceholder: "Search resources...",
  loadingResources: "LOADING RESOURCES...",
  noResources: "NO RESOURCES MATCHING QUERY.",
  srcPrefix: "SRC // ",
  noSupplementaryData: "No supplementary data available.",
  nodePrefix: "NODE: ",
  launchPlayback: "LAUNCH PLAYBACK",
  openLink: "OPEN LINK",
  videoPlayback: "VIDEO PLAYBACK"
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

export default function KnowledgeHub() {
  const [items, setItems] = useState<PublishedResource[]>([]);
  const [filteredItems, setFilteredItems] = useState<PublishedResource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await loadPublishedResources();
        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        console.error('Error fetching hub content:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    let filtered = items;
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.category === activeTab);
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }
    setFilteredItems(filtered);
  }, [searchQuery, activeTab, items]);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden font-sans">
      <EditorialHero
        image="/images/HubVisual.webp"
        imageAlt="East Asian community members sharing learning resources"
        eyebrow={t('heroCategory')}
        title={<>{t('heroTitleNormal')} <span className="text-primary">{t('heroTitleHighlighted')}</span></>}
        description={t('heroDesc')}
        layout="split"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-12">
        {/* Resource controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 border-b border-border pb-8">
          <div className="flex flex-wrap gap-2">
            {TABS.map(tab => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="uppercase tracking-wider font-sans text-xs"
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
              className="font-sans tracking-wider text-xs"
            />
          </div>
        </div>

        {/* Grid display */}
        {loading ? (
          <div className="text-center py-20 text-primary text-sm tracking-wider">
            {t('loadingResources')}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 font-sans text-muted-foreground text-sm tracking-widest border border-border bg-muted/20">
            {t('noResources')}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const resourceUrl = item.external_url;
              const isYoutube = resourceUrl && item.media_type === 'video_embed' && getYoutubeId(resourceUrl);
              return (
                <SurfaceCard
                  key={item.id}
                  heightClass="h-[300px] md:h-[320px]"
                >
                  <div className="flex flex-col justify-between h-full space-y-4">
                    <div>
                      <div className="flex justify-between items-center text-[8px] font-sans text-primary tracking-widest uppercase border-b border-border/50 pb-2 mb-3">
                        <span>{t('srcPrefix')}{item.media_type.replace('_', ' ')}</span>
                        <span>{item.category.replace('_', ' ')}</span>
                      </div>
                      
                      <h3 className="font-heading text-lg font-semibold text-foreground tracking-tight mb-2 leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {item.description || t('noSupplementaryData')}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-[9px] font-sans text-muted-foreground uppercase">
                        {t('nodePrefix')}EDUPLUS
                      </span>
                      {isYoutube ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedVideo(resourceUrl)}
                          className="font-sans text-[9px] tracking-wider uppercase h-8"
                        >
                          {t('launchPlayback')}
                        </Button>
                      ) : resourceUrl ? (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="h-8"
                        >
                          <a href={resourceUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-[9px] tracking-wider uppercase" /* ui-ignore */>
                            {t('openLink')}
                          </a>
                        </Button>
                      ) : <span className="font-sans text-[9px] uppercase text-muted-foreground">File available to members</span>}
                    </div>
                  </div>
                </SurfaceCard>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Overlay */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90  animate-fade-in">
          <div className="w-full max-w-4xl bg-card border border-border shadow-2xl relative">
            <div className="flex items-center justify-between p-3 border-b border-border bg-muted">
              <span className="font-sans text-[10px] font-bold tracking-widest text-primary">{t('videoPlayback')}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video"
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
