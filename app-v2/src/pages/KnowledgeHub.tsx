import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { X } from 'lucide-react';

interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  category: 'tutorial' | 'podcast' | 'webinar' | 'study_material';
  media_type: 'video_embed' | 'document_url' | 'external_link';
  url: string;
  author_name: string;
  created_at: string;
}

const TABS = ['all', 'tutorial', 'podcast', 'webinar', 'study_material'];

export default function KnowledgeHub() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<KnowledgeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

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
          item.author_name.toLowerCase().includes(query)
      );
    }
    setFilteredItems(filtered);
  }, [searchQuery, activeTab, items]);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden font-sans">
      <ImmersiveHero
        bgImage="/images/HubVisual.png"
        category="Ecosystem Nodes"
        titleNormal="Knowledge"
        titleHighlighted="Hub"
        description="Access elite technical tutorials, educational webinars, and expert podcasts compiled to accelerate your academic and skill roadmap."
        telemetryLeft="RESOURCES_DATABASE // ONLINE"
        telemetryRight="COORD_LEARNING_MATRIX"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-12">
        {/* Controls Matrix */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 border-b border-border pb-8">
          <div className="flex flex-wrap gap-2">
            {TABS.map(tab => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="uppercase tracking-wider font-mono text-xs"
              >
                {tab.replace('_', ' ')}
              </Button>
            ))}
          </div>

          <div className="w-full md:w-80">
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="font-mono tracking-wider text-xs"
            />
          </div>
        </div>

        {/* Grid display */}
        {loading ? (
          <div className="text-center py-20 font-mono text-primary text-sm tracking-widest animate-pulse">
            LOADING RESOURCES...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 font-mono text-muted-foreground text-sm tracking-widest border border-border bg-muted/20">
            NO RESOURCES MATCHING QUERY.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const isYoutube = item.media_type === 'video_embed' && getYoutubeId(item.url);
              return (
                <Card
                  key={item.id}
                  className="flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-primary/5 border-b border-l border-border text-[8px] font-mono text-primary tracking-widest uppercase">
                    {item.category.replace('_', ' ')}
                  </div>

                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[10px] font-mono text-primary tracking-widest block mb-2 uppercase">
                        SRC // {item.media_type.replace('_', ' ')}
                      </span>
                      <h3 className="font-heading text-lg font-light text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-6">
                        {item.description || 'No supplementary data available.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-[9px] font-mono text-muted-foreground uppercase">
                        NODE: {item.author_name}
                      </span>
                      {isYoutube ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedVideo(item.url)}
                          className="font-mono text-[9px] tracking-wider uppercase"
                        >
                          LAUNCH PLAYBACK
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] tracking-wider uppercase">
                            OPEN LINK
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Overlay */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-4xl bg-card border border-border shadow-2xl relative">
            <div className="flex items-center justify-between p-3 border-b border-border bg-muted">
              <span className="font-mono text-[10px] font-bold tracking-widest text-primary">VIDEO PLAYBACK</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedVideo(null)}
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
