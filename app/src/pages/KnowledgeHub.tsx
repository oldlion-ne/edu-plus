import { useState, useEffect, useRef } from 'react';
import { EditorialMedia } from '@/components/ui/editorial-media';
import { PageHero } from '@/components/ui/page-hero';
import { editorialIllustrations } from '@/lib/editorialIllustrations';
import { supabase } from '../lib/supabaseClient';

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

const CATEGORY_TABS = ['all', 'tutorial', 'podcast', 'webinar', 'study_material'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  tutorial: 'Tutorials',
  podcast: 'Podcasts',
  webinar: 'Webinars',
  study_material: 'Study Material',
};

export default function KnowledgeHub() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<KnowledgeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
    if (!selectedVideo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    
    setTimeout(() => closeButtonRef.current?.focus(), 10);
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  useEffect(() => {
    let filtered = items;
    if (activeTab !== 'all') {
      filtered = filtered.filter((item) => item.category === activeTab);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.author_name.toLowerCase().includes(q),
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
    <div className="min-h-screen bg-background w-full">

      {/* ── Typographic Hero ── */}
      <PageHero
        eyebrow="Ecosystem Nodes"
        title="Knowledge Hub"
        illustration={editorialIllustrations.knowledge}
        description="Access elite technical tutorials, educational webinars, and expert podcasts compiled to accelerate your academic and skill roadmap."
      />

      {/* ── Content Grid ── */}
      <section className="py-20 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">

        {/* Controls row — text link tabs + plain search input */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12">
          <div className="flex gap-6 border-b border-border/50 w-full md:w-auto">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-[14px] font-medium whitespace-nowrap transition-colors duration-150 border-b-2 -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  activeTab === tab
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {CATEGORY_LABELS[tab]}
              </button>
            ))}
          </div>
          <div className="w-full md:w-72">
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-none border-border/50 text-[14px]"
            />
          </div>
        </div>

        {/* Items grid */}
        {loading ? (
          <div className="py-20 text-center text-[14px] text-muted-foreground">
            Loading resources...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center text-[14px] text-muted-foreground">
            <EditorialMedia
              asset={editorialIllustrations.knowledgeEmpty}
              decorative
              frameClassName="mb-8 max-w-[240px]"
            />
            <p>No resources match your query.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {filteredItems.map((item) => {
              const isYoutube = item.media_type === 'video_embed' && getYoutubeId(item.url);
              const youtubeId = isYoutube ? getYoutubeId(item.url) : null;
              return (
                <div
                  key={item.id}
                  className="group flex flex-col gap-4 p-8 bg-transparent hover:bg-secondary transition-colors duration-200"
                >
                  {/* 3:2 thumbnail */}
                  {youtubeId ? (
                    <div className="aspect-[3/2] w-full overflow-hidden bg-border/30">
                      <img
                        src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/2] w-full bg-secondary flex items-center justify-center text-muted-foreground">
                      <span className="text-[11px] uppercase tracking-wide">{CATEGORY_LABELS[item.category] || item.category}</span>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex-1 flex flex-col gap-2">
                    <span className="text-[12px] text-muted-foreground">{item.author_name}</span>
                    <h3 className="text-[17px] font-medium text-foreground leading-snug">{item.title}</h3>
                    {item.description && (
                      <p className="text-[14px] text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    {isYoutube ? (
                      <button
                        onClick={() => setSelectedVideo(item.url)}
                        className="text-[14px] font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        Watch &rarr;
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        /* ui-ignore */
                      >
                        Open resource &rarr;
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Video overlay — stripped of cyber headers */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-title"
        >
          <div className="w-full max-w-4xl bg-background border border-border/50 relative">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <span id="video-title" className="text-[13px] font-medium text-foreground">Video Playback</span>
              <button
                ref={closeButtonRef}
                onClick={() => setSelectedVideo(null)}
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Close video"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo)}?autoplay=1`}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
