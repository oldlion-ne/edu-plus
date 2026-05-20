import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ImmersiveHero from '../components/effects/ImmersiveHero';

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
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/5 rounded-none blur-[130px] pointer-events-none" />

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
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 border-b border-[#7DF9FF]/10 pb-8">
          <div className="flex flex-wrap gap-2">
            {['all', 'tutorial', 'podcast', 'webinar', 'study_material'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all duration-300 rounded-none border ${
                  activeTab === tab
                    ? 'border-[#7DF9FF] bg-[#7DF9FF]/10 text-[#7DF9FF] shadow-[0_0_10px_rgba(125,249,255,0.2)]'
                    : 'border-white/10 text-[#8B949E] hover:border-white/20 hover:text-white'
                } uppercase cursor-pointer`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="SEARCH TRANSMISSIONS..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-[#7DF9FF]/20 text-[#E6EDF3] text-xs px-4 py-2.5 outline-none focus:border-[#7DF9FF] font-mono tracking-wider rounded-none transition-colors"
            />
          </div>
        </div>

        {/* Grid display */}
        {loading ? (
          <div className="text-center py-20 font-mono text-[#7DF9FF] text-sm tracking-widest animate-pulse">
            LOADING_HUBNODES_TELEMETRY...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 font-mono text-white/40 text-sm tracking-widest border border-white/5 bg-white/[0.01] rounded-none">
            NO TRANSMISSIONS MATCHING THE QUERY.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const isYoutube = item.media_type === 'video_embed' && getYoutubeId(item.url);
              return (
                <div
                  key={item.id}
                  className="liquid-glass border border-white/10 p-6 flex flex-col justify-between hover:border-[#7DF9FF]/30 transition-all duration-300 group rounded-none relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#7DF9FF]/5 border-b border-l border-white/10 text-[8px] font-mono text-[#7DF9FF] tracking-widest uppercase">
                    {item.category.replace('_', ' ')}
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#7DF9FF] tracking-widest block mb-2 uppercase">
                      SRC // {item.media_type.replace('_', ' ')}
                    </span>
                    <h3 className="font-heading text-lg font-light text-white mb-2 leading-snug group-hover:text-[#7DF9FF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#8B949E] leading-relaxed mb-6">
                      {item.description || 'No supplementary data stream available.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-white/50 uppercase">
                      NODE: {item.author_name}
                    </span>
                    {isYoutube ? (
                      <button
                        onClick={() => setSelectedVideo(item.url)}
                        className="px-3 py-1 bg-[#7DF9FF]/10 border border-[#7DF9FF]/30 hover:bg-[#7DF9FF] hover:text-[#0B0F14] transition-all duration-300 font-mono text-[9px] font-bold tracking-wider text-[#7DF9FF] rounded-none cursor-pointer"
                      >
                        LAUNCH PLAYBACK
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-white/5 border border-white/10 hover:border-white hover:bg-white hover:text-[#0B0F14] transition-all duration-300 font-mono text-[9px] font-bold tracking-wider text-[#E6EDF3] rounded-none"
                      >
                        OPEN DIRECTLINK
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Overlaid Cinema */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B0F14]/90 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-4xl bg-[#0B0F14] border border-[#7DF9FF] shadow-[0_0_30px_rgba(125,249,255,0.3)] rounded-none relative">
            <div className="flex items-center justify-between p-3 border-b border-[#7DF9FF]/20 bg-[#7DF9FF]/5">
              <span className="font-mono text-[10px] font-bold tracking-widest text-[#7DF9FF]">IMMERSIVE CINEMA LINK</span>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-white hover:text-[#7DF9FF] font-mono text-xs cursor-pointer focus:outline-none"
              >
                [ CLOSE TRANSMISSION ]
              </button>
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
