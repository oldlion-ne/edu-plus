# Knowledge Hub & Cyberpunk Portal Command Center (Approach A) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a stunning, high-performance cyberpunk Admin Command Center (`/dashboard`) and front-facing filterable multimedia directory (`/knowledge-hub`) fully connected to Supabase Auth, DB, and Realtime with customized sonner notifications, bespoke onboarding tour spotlight overlays, and dynamic chatbot knowledge integration.

**Architecture:** Highly optimized modular design matching the core deep-slate/neon-cyan look. Uses real-time Supabase subscriptions for contact notifications, client-side dynamic prompt compilation for immediate chatbot training, and a custom JS-spotlight overlay for onboarding to avoid third-party libraries.

**Tech Stack:** React 19, TypeScript, React Router v7, Supabase, Tailwind CSS, Sonner (Toasts).

---

### Task 1: Supabase Database Migration Setup

**Files:**
- Create: `c:\edu-plus\app\scripts\migration.sql`

- [ ] **Step 1: Write SQL migration file**
  Create the SQL migration script to set up all four required tables (`user_roles`, `knowledge_hub`, `kb_documents`, `contact_messages`), including check constraints, foreign keys, RLS enabling, and RLS policies.

  ```sql
  -- 1. Create user_roles Table
  CREATE TABLE IF NOT EXISTS public.user_roles (
      id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      role text NOT NULL CHECK (role IN ('admin', 'educator', 'resource_person')),
      created_at timestamp with time zone DEFAULT now() NOT NULL
  );

  -- 2. Create knowledge_hub Table
  CREATE TABLE IF NOT EXISTS public.knowledge_hub (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      description text,
      category text NOT NULL CHECK (category IN ('tutorial', 'podcast', 'webinar', 'study_material')),
      media_type text NOT NULL CHECK (media_type IN ('video_embed', 'document_url', 'external_link')),
      url text NOT NULL,
      uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
      author_name text NOT NULL,
      created_at timestamp with time zone DEFAULT now() NOT NULL
  );

  -- 3. Create kb_documents Table
  CREATE TABLE IF NOT EXISTS public.kb_documents (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      question text NOT NULL,
      answer text NOT NULL,
      is_active boolean DEFAULT true NOT NULL,
      created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
      created_at timestamp with time zone DEFAULT now() NOT NULL
  );

  -- 4. Create contact_messages Table
  CREATE TABLE IF NOT EXISTS public.contact_messages (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      email text NOT NULL,
      profile text NOT NULL,
      message text NOT NULL,
      status text DEFAULT 'unread' NOT NULL CHECK (status IN ('unread', 'read', 'archived')),
      created_at timestamp with time zone DEFAULT now() NOT NULL
  );

  -- Enable Row Level Security (RLS) on all tables
  ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.knowledge_hub ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.kb_documents ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

  -- Create RLS Policies
  -- user_roles policies
  CREATE POLICY "Allow public read access to roles" ON public.user_roles 
      FOR SELECT USING (true);
  CREATE POLICY "Allow admin to manage roles" ON public.user_roles 
      FOR ALL TO authenticated USING (
          EXISTS (
              SELECT 1 FROM public.user_roles 
              WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'
          )
      );

  -- knowledge_hub policies
  CREATE POLICY "Allow public read access to knowledge content" ON public.knowledge_hub 
      FOR SELECT USING (true);
  CREATE POLICY "Allow authenticated staff to manage knowledge content" ON public.knowledge_hub 
      FOR ALL TO authenticated USING (
          EXISTS (
              SELECT 1 FROM public.user_roles 
              WHERE user_roles.id = auth.uid() AND user_roles.role IN ('admin', 'educator', 'resource_person')
          )
      );

  -- kb_documents policies
  CREATE POLICY "Allow public read access to kb" ON public.kb_documents 
      FOR SELECT USING (true);
  CREATE POLICY "Allow staff to manage kb documents" ON public.kb_documents 
      FOR ALL TO authenticated USING (
          EXISTS (
              SELECT 1 FROM public.user_roles 
              WHERE user_roles.id = auth.uid() AND user_roles.role IN ('admin', 'educator')
          )
      );

  -- contact_messages policies
  CREATE POLICY "Allow public insert contact messages" ON public.contact_messages 
      FOR INSERT WITH CHECK (true);
  CREATE POLICY "Allow staff to read/update contact messages" ON public.contact_messages 
      FOR ALL TO authenticated USING (
          EXISTS (
              SELECT 1 FROM public.user_roles 
              WHERE user_roles.id = auth.uid() AND user_roles.role IN ('admin', 'educator')
          )
      );
  ```

- [ ] **Step 2: Run migration query**
  Use the Supabase MCP server `execute_sql` tool on project `bichdmoktcdnppctjmrc` to execute this SQL script. Verify the tables are successfully created.

---

### Task 2: Front-facing Knowledge Hub Component & Page

**Files:**
- Create: `c:\edu-plus\app\src\pages\KnowledgeHub.tsx`

- [ ] **Step 1: Code the Knowledge Hub page**
  Create `KnowledgeHub.tsx`. Provide a glowing filter matrix dashboard layout. Public users can search and filter multimedia files.
  Strict straight-line rule compliance: all items are `rounded-none`. Uses deep `#0B0F14` color palette. Youtube videos render inside a custom overlay modal rather than navigating away.

  ```tsx
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
  ```

---

### Task 3: Contact Form Database Integration

**Files:**
- Modify: `c:\edu-plus\app\src\pages\Contact.tsx`

- [ ] **Step 1: Connect form submissions to Supabase**
  Change the `handleSubmit` routine inside `Contact.tsx` to insert submissions into the `contact_messages` database table in Supabase rather than just modifying local component states. If Supabase fails, catch the error clean but submit anyway.

  ```diff
  <<<<
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      setFormData({ name: '', email: '', profile: 'student', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    };
  ====
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const { error } = await supabase.from('contact_messages').insert({
          name: formData.name,
          email: formData.email,
          profile: formData.profile,
          message: formData.message,
          status: 'unread'
        });
        if (error) throw error;
      } catch (err) {
        console.error('Error sending message to Supabase database:', err);
      } finally {
        setSubmitted(true);
        setFormData({ name: '', email: '', profile: 'student', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    };
  >>>>
  ```
  Ensure `supabase` import is correct at the top of the file:
  `import { supabase } from '../lib/supabaseClient';`

---

### Task 4: AI Chat Agent Custom Context Training Hook & Integration

**Files:**
- Modify: `c:\edu-plus\app\src\components\AIChatAgent.tsx`

- [ ] **Step 1: Dynamically load AI database training rules**
  Modify `AIChatAgent.tsx` to fetch the custom facts from the `kb_documents` table in Supabase. Dynamic data is compiled and appended directly onto the system prompt payload sent to OpenRouter.

  ```diff
  <<<<
      try {
        const fullPayload: ChatMessage[] = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...updatedMessages
        ];
  
        const responseContent = await sendChatMessage(fullPayload);
  ====
      try {
        // Fetch active custom knowledge injections
        let dynamicContext = '';
        try {
          const { data: kbDocs } = await supabase
            .from('kb_documents')
            .select('question, answer')
            .eq('is_active', true);
  
          if (kbDocs && kbDocs.length > 0) {
            dynamicContext = '\n\n[DYNAMIC SECURE KNOWLEDGE RETRIEVED]\nPrioritize these specific dynamic custom facts during this conversation:\n' +
              kbDocs.map((doc, idx) => `${idx + 1}. Topic: ${doc.question} -> Fact: ${doc.answer}`).join('\n');
          }
        } catch (dbErr) {
          console.error('Error fetching dynamic AI context:', dbErr);
        }
  
        const compiledSystemPrompt = SYSTEM_PROMPT + dynamicContext;
  
        const fullPayload: ChatMessage[] = [
          { role: 'system', content: compiledSystemPrompt },
          ...updatedMessages
        ];
  
        const responseContent = await sendChatMessage(fullPayload);
  >>>>
  ```

---

### Task 5: Custom Cyberpunk Spotlight Guided Onboarding Tour

**Files:**
- Create: `c:\edu-plus\app\src\components\DashboardOnboardingTour.tsx`

- [ ] **Step 1: Develop custom guided spotlight component**
  Write a high-end, custom spotlight walkthrough overlay styled to look like telemetry. Target five core items:
  1. `#nav-roles` (The Role Switcher dev panel)
  2. `#tab-overview` (The Analytics Telemetry node)
  3. `#tab-uploader` (The Upload Node uploader station)
  4. `#tab-ai-matrix` (The AI Chat Training matrix)
  5. `#tab-messages` (The Sonar Message logs)

  The spotlight computes boundary coordinates dynamically and spotlight-spots them with a neon border.

  ```tsx
  import { useEffect, useState } from 'react';

  interface TourStep {
    targetId: string;
    title: string;
    text: string;
  }

  const TOUR_STEPS: TourStep[] = [
    {
      targetId: 'nav-roles',
      title: 'TELEMETRY ACCESS MATRIX',
      text: 'Switch authorized profiles instantly using this developer simulator. Explore layout access for Admin, Educator, and Resource Persons.'
    },
    {
      targetId: 'tab-overview',
      title: 'DIAGNOSTICS & ANALYTICS',
      text: 'Track real-time content volumes, load statistics, active chatbot factual matrices, and system telemetry from a high-level viewport.'
    },
    {
      targetId: 'tab-uploader',
      title: 'CONTENT UPLOADER',
      text: 'Upload and categorize online webinars, tutorials, or study materials. Authorized roles can update content nodes instantly.'
    },
    {
      targetId: 'tab-ai-matrix',
      title: 'AI COGNITIVE KNOWLEDGE GRID',
      text: 'Train the Edu+ AI Cognitive Advisor. Add custom facts or specific QA points that compile dynamically into chatbot core prompts.'
    },
    {
      targetId: 'tab-messages',
      title: 'SONAR MESSAGE TERMINAL',
      text: 'Sync and read messages sent from the Contact page. Real-time sonar channels alert you instantly when a new inquire pings.'
    }
  ];

  export default function DashboardOnboardingTour({ onComplete }: { onComplete: () => void }) {
    const [stepIndex, setStepIndex] = useState(0);
    const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({ display: 'none' });

    const currentStep = TOUR_STEPS[stepIndex];

    useEffect(() => {
      function calculatePosition() {
        const element = document.getElementById(currentStep.targetId);
        if (!element) {
          setBoxStyle({ display: 'none' });
          return;
        }

        const rect = element.getBoundingClientRect();
        setBoxStyle({
          position: 'fixed',
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
          border: '2px solid #7DF9FF',
          boxShadow: '0 0 18px rgba(125,249,255,0.6), inset 0 0 8px rgba(125,249,255,0.3)',
          transition: 'all 0.3s ease-in-out',
          zIndex: 99,
          pointerEvents: 'none'
        });
      }

      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      return () => window.removeEventListener('resize', calculatePosition);
    }, [stepIndex]);

    const handleNext = () => {
      if (stepIndex < TOUR_STEPS.length - 1) {
        setStepIndex(prev => prev + 1);
      } else {
        localStorage.setItem('edu_plus_onboarding_completed', 'true');
        onComplete();
      }
    };

    const handleBack = () => {
      if (stepIndex > 0) {
        setStepIndex(prev => prev - 1);
      }
    };

    const handleSkip = () => {
      localStorage.setItem('edu_plus_onboarding_completed', 'true');
      onComplete();
    };

    return (
      <div className="fixed inset-0 z-[98] pointer-events-auto">
        {/* Dark Screen Matrix */}
        <div className="absolute inset-0 bg-[#0B0F14]/80 backdrop-blur-[2px]" />

        {/* Cyberpunk Highlight Box */}
        <div style={boxStyle} className="rounded-none animate-pulse" />

        {/* floating Instruction Guidance Card */}
        <div
          className="fixed z-[100] w-[320px] bg-[#0E131A] border border-[#7DF9FF]/30 p-5 rounded-none shadow-[0_0_20px_rgba(0,0,0,0.8)] text-[#E6EDF3] transition-all duration-300 font-sans"
          style={{
            top: boxStyle.top ? Number(boxStyle.top) + Number(boxStyle.height) + 16 : '40%',
            left: boxStyle.left ? Math.max(16, Math.min(window.innerWidth - 336, Number(boxStyle.left))) : '50%'
          }}
        >
          <div className="flex items-center gap-1.5 mb-2 border-b border-[#7DF9FF]/10 pb-2">
            <span className="w-1.5 h-1.5 bg-[#7DF9FF] shadow-[0_0_6px_#7DF9FF]"></span>
            <span className="font-mono text-[9px] font-bold tracking-widest text-[#7DF9FF]">
              {currentStep.title} (STEP {stepIndex + 1}/{TOUR_STEPS.length})
            </span>
          </div>

          <p className="text-[11px] leading-relaxed mb-4 text-[#8B949E] min-h-[44px]">
            {currentStep.text}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <button
              onClick={handleSkip}
              className="text-[9px] font-mono text-[#8B949E] hover:text-white cursor-pointer uppercase"
            >
              [ SKIP TOUR ]
            </button>
            <div className="flex gap-2">
              {stepIndex > 0 && (
                <button
                  onClick={handleBack}
                  className="px-2.5 py-1 bg-white/5 border border-white/10 hover:border-white hover:text-[#0B0F14] transition-all duration-200 text-[9px] font-mono rounded-none cursor-pointer"
                >
                  PREV
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-3 py-1 bg-[#7DF9FF] hover:bg-white text-[#0B0F14] font-bold transition-all duration-200 text-[9px] font-mono rounded-none cursor-pointer"
              >
                {stepIndex === TOUR_STEPS.length - 1 ? 'COMPLETE' : 'NEXT'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  ```

---

### Task 6: Cyberpunk Admin Dashboard Core & Tabs UI

**Files:**
- Create: `c:\edu-plus\app\src\pages\Dashboard.tsx`

- [ ] **Step 1: Write dashboard layout file**
  Create the `/dashboard` administrative command interface in `Dashboard.tsx`.
  It must import and load `<DashboardOnboardingTour />` if `localStorage` onboarding checklist indicates it is uncompleted. It must also subscribe to Realtime notifications, show custom sonner alerts, have the quick-login role panels, and support adding knowledge resources & training documents.

  ```tsx
  import { useEffect, useState } from 'react';
  import { supabase } from '../lib/supabaseClient';
  import { toast } from 'sonner';
  import DashboardOnboardingTour from '../components/DashboardOnboardingTour';

  type UserRole = 'admin' | 'educator' | 'resource_person' | 'none';

  export default function Dashboard() {
    const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
    const [activeTab, setActiveTab] = useState<'overview' | 'uploader' | 'ai-matrix' | 'messages'>('overview');
    const [showTour, setShowTour] = useState(false);
    const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
    const [showBellDropdown, setShowBellDropdown] = useState(false);

    // Database state collections
    const [knowledgeHubItems, setKnowledgeHubItems] = useState<any[]>([]);
    const [kbDocuments, setKbDocuments] = useState<any[]>([]);
    const [contactMessages, setContactMessages] = useState<any[]>([]);

    // Form inputs
    const [newHubItem, setNewHubItem] = useState({
      title: '',
      description: '',
      category: 'tutorial',
      media_type: 'video_embed',
      url: '',
      author_name: ''
    });

    const [newKbDoc, setNewKbDoc] = useState({
      question: '',
      answer: ''
    });

    useEffect(() => {
      const completed = localStorage.getItem('edu_plus_onboarding_completed');
      if (!completed) {
        setShowTour(true);
      }
      fetchData();
    }, []);

    // Subscribe to real-time additions to contact_messages
    useEffect(() => {
      const channel = supabase
        .channel('realtime-messages')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'contact_messages' },
          (payload) => {
            const newMsg = payload.new;
            setContactMessages(prev => [newMsg, ...prev]);
            setUnreadMessagesCount(c => c + 1);

            // Trigger Sonar notification alert
            toast(`[ALERT // NEW INQUIRY TRANSMITTED]`, {
              description: `Sender: ${newMsg.name} (${newMsg.profile})`,
              style: {
                background: '#0E131A',
                border: '1px solid #7DF9FF',
                color: '#E6EDF3',
                fontFamily: 'monospace',
                borderRadius: '0px'
              }
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }, []);

    const fetchData = async () => {
      try {
        const { data: hub } = await supabase.from('knowledge_hub').select('*').order('created_at', { ascending: false });
        const { data: kb } = await supabase.from('kb_documents').select('*').order('created_at', { ascending: false });
        const { data: contact } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });

        setKnowledgeHubItems(hub || []);
        setKbDocuments(kb || []);
        setContactMessages(contact || []);

        const unread = contact?.filter((m: any) => m.status === 'unread').length || 0;
        setUnreadMessagesCount(unread);
      } catch (err) {
        console.error('Error fetching dashboard telemetry:', err);
      }
    };

    const handleCreateHubItem = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const { error } = await supabase.from('knowledge_hub').insert({
          title: newHubItem.title,
          description: newHubItem.description,
          category: newHubItem.category,
          media_type: newHubItem.media_type,
          url: newHubItem.url,
          author_name: newHubItem.author_name || 'Staff Advisor'
        });

        if (error) throw error;

        toast.success('[TRANSMISSION SUCCESSFUL]', {
          description: 'Knowledge node has been compiled to public database.',
          style: { background: '#0E131A', border: '1px solid #7DF9FF', color: '#E6EDF3', borderRadius: '0px' }
        });

        setNewHubItem({
          title: '',
          description: '',
          category: 'tutorial',
          media_type: 'video_embed',
          url: '',
          author_name: ''
        });

        fetchData();
      } catch (err) {
        toast.error('TRANSMISSION_ERROR', { description: 'Unauthorized role or empty input variables.' });
      }
    };

    const handleCreateKbDoc = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const { error } = await supabase.from('kb_documents').insert({
          question: newKbDoc.question,
          answer: newKbDoc.answer,
          is_active: true
        });

        if (error) throw error;

        toast.success('[COGNITIVE COMPILATION SUCCESS]', {
          description: 'AI custom factual guideline loaded dynamically.',
          style: { background: '#0E131A', border: '1px solid #7DF9FF', color: '#E6EDF3', borderRadius: '0px' }
        });

        setNewKbDoc({ question: '', answer: '' });
        fetchData();
      } catch (err) {
        toast.error('COMPILATION_ERROR', { description: 'Failed to write fact to AI matrix.' });
      }
    };

    const handleToggleKbActive = async (id: string, current: boolean) => {
      try {
        const { error } = await supabase.from('kb_documents').update({ is_active: !current }).eq('id', id);
        if (error) throw error;
        fetchData();
      } catch (err) {
        console.error('Failed to change document status:', err);
      }
    };

    const handleMarkMessageRead = async (id: string) => {
      try {
        const { error } = await supabase.from('contact_messages').update({ status: 'read' }).eq('id', id);
        if (error) throw error;
        fetchData();
      } catch (err) {
        console.error('Failed to update status:', err);
      }
    };

    const hasPermission = (allowed: UserRole[]) => {
      return allowed.includes(selectedRole);
    };

    return (
      <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-24 relative overflow-hidden font-sans pt-[80px]">
        {/* Onboarding Tour Spotlight */}
        {showTour && <DashboardOnboardingTour onComplete={() => setShowTour(false)} />}

        {/* Global HUD elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/3 rounded-none blur-[140px] pointer-events-none" />

        {/* Top Control Bar */}
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 mt-6 flex justify-between items-center bg-[#0E131A] border border-[#7DF9FF]/10 p-4 rounded-none">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#7DF9FF] tracking-wider">SECURE LINK STATUS: ACTIVE</span>
            <span className="w-2 h-2 bg-[#7DF9FF] shadow-[0_0_8px_#7DF9FF]"></span>
          </div>

          <div className="flex items-center gap-6">
            {/* Sonar Bell Drops */}
            <div className="relative">
              <button
                id="bell-sonar"
                onClick={() => {
                  setShowBellDropdown(!showBellDropdown);
                  setUnreadMessagesCount(0);
                }}
                className="relative p-2 text-[#7DF9FF] hover:text-white transition-colors cursor-pointer"
              >
                <span className="font-mono text-xs tracking-widest">[ SONAR_PING ]</span>
                {unreadMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-none animate-ping"></span>
                )}
              </button>

              {showBellDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0E131A] border border-[#7DF9FF]/30 p-4 shadow-[0_0_24px_rgba(0,0,0,0.85)] z-50 rounded-none text-left">
                  <h4 className="font-mono text-[10px] font-bold text-[#7DF9FF] tracking-wider border-b border-[#7DF9FF]/20 pb-2 mb-2 uppercase">
                    Unread Signal Inbound
                  </h4>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto">
                    {contactMessages.filter(m => m.status === 'unread').length === 0 ? (
                      <p className="text-[10px] text-white/40 font-mono py-4">NO ACTIVE INBOUND PINGS.</p>
                    ) : (
                      contactMessages
                        .filter(m => m.status === 'unread')
                        .map(m => (
                          <div key={m.id} className="border-b border-white/5 pb-2 text-[10px]">
                            <p className="font-mono text-[#7DF9FF]">{m.name} // {m.profile.toUpperCase()}</p>
                            <p className="text-white/60 line-clamp-1 mt-0.5">{m.message}</p>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick-Login Panel */}
            <div id="nav-roles" className="flex items-center gap-2 border-l border-white/10 pl-6">
              <span className="font-mono text-[9px] text-[#8B949E]">ROLE_SIM:</span>
              <div className="flex gap-1">
                {(['admin', 'educator', 'resource_person'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`px-2 py-0.5 text-[9px] font-mono rounded-none uppercase transition-all duration-300 cursor-pointer ${
                      selectedRole === r
                        ? 'bg-[#7DF9FF]/10 border border-[#7DF9FF] text-[#7DF9FF]'
                        : 'border border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {r.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard split */}
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 mt-8 grid lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <div id="nav-sidebar" className="lg:col-span-3 space-y-2">
            <button
              id="tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left p-4 font-mono text-xs tracking-wider transition-all duration-300 rounded-none border ${
                activeTab === 'overview'
                  ? 'border-[#7DF9FF] bg-[#7DF9FF]/5 text-[#7DF9FF] shadow-[0_0_8px_rgba(125,249,255,0.15)]'
                  : 'border-white/5 text-[#8B949E] hover:border-white/10 hover:text-white'
              } cursor-pointer`}
            >
              [ 01 // Overview Telemetry ]
            </button>
            <button
              id="tab-uploader"
              onClick={() => setActiveTab('uploader')}
              className={`w-full text-left p-4 font-mono text-xs tracking-wider transition-all duration-300 rounded-none border ${
                activeTab === 'uploader'
                  ? 'border-[#7DF9FF] bg-[#7DF9FF]/5 text-[#7DF9FF] shadow-[0_0_8px_rgba(125,249,255,0.15)]'
                  : 'border-white/5 text-[#8B949E] hover:border-white/10 hover:text-white'
              } cursor-pointer`}
            >
              [ 02 // Upload Station ]
            </button>
            <button
              id="tab-ai-matrix"
              onClick={() => setActiveTab('ai-matrix')}
              className={`w-full text-left p-4 font-mono text-xs tracking-wider transition-all duration-300 rounded-none border ${
                activeTab === 'ai-matrix'
                  ? 'border-[#7DF9FF] bg-[#7DF9FF]/5 text-[#7DF9FF] shadow-[0_0_8px_rgba(125,249,255,0.15)]'
                  : 'border-white/5 text-[#8B949E] hover:border-white/10 hover:text-white'
              } cursor-pointer`}
            >
              [ 03 // AI Chat Training ]
            </button>
            <button
              id="tab-messages"
              onClick={() => setActiveTab('messages')}
              className={`w-full text-left p-4 font-mono text-xs tracking-wider transition-all duration-300 rounded-none border ${
                activeTab === 'messages'
                  ? 'border-[#7DF9FF] bg-[#7DF9FF]/5 text-[#7DF9FF] shadow-[0_0_8px_rgba(125,249,255,0.15)]'
                  : 'border-white/5 text-[#8B949E] hover:border-white/10 hover:text-white'
              } cursor-pointer`}
            >
              [ 04 // Message Hub ]
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('edu_plus_onboarding_completed');
                setShowTour(true);
              }}
              className="w-full text-center py-2.5 border border-[#7DF9FF]/20 hover:border-[#7DF9FF] text-[10px] text-[#7DF9FF] font-mono tracking-widest uppercase cursor-pointer rounded-none"
            >
              Run Tutorial Protocol
            </button>
          </div>

          {/* Main workspace container viewport */}
          <div className="lg:col-span-9 liquid-glass border border-white/10 p-8 rounded-none min-h-[500px]">
            {/* TAB OVERVIEW */}
            {activeTab === 'overview' && (
              <div id="view-overview" className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-[#7DF9FF]/10 pb-4">
                  <h2 className="font-heading text-2xl font-light">Ecosystem Overview</h2>
                  <p className="font-mono text-xs text-[#8B949E] mt-1">TELEMETRY_LINK // DIAGNOSTIC_ACTIVE</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div className="border border-white/5 p-5 bg-white/[0.01] rounded-none">
                    <span className="font-mono text-[9px] text-[#7DF9FF] tracking-wider block mb-1">HUB RESOURCES</span>
                    <span className="font-heading text-3xl font-light">{knowledgeHubItems.length}</span>
                  </div>
                  <div className="border border-white/5 p-5 bg-white/[0.01] rounded-none">
                    <span className="font-mono text-[9px] text-[#7DF9FF] tracking-wider block mb-1">AI TRAINING RULES</span>
                    <span className="font-heading text-3xl font-light">{kbDocuments.length}</span>
                  </div>
                  <div className="border border-white/5 p-5 bg-white/[0.01] rounded-none">
                    <span className="font-mono text-[9px] text-[#7DF9FF] tracking-wider block mb-1">INBOUND INQUIRIES</span>
                    <span className="font-heading text-3xl font-light">{contactMessages.length}</span>
                  </div>
                </div>

                {/* dynamic visual simulation chart built via CSS metrics */}
                <div className="border border-white/5 p-6 bg-white/[0.01] rounded-none">
                  <h3 className="font-mono text-[10px] font-bold text-[#7DF9FF] tracking-wider mb-4 uppercase">Content Category Distribution</h3>
                  <div className="space-y-4">
                    {['tutorial', 'podcast', 'webinar', 'study_material'].map(cat => {
                      const count = knowledgeHubItems.filter(i => i.category === cat).length;
                      const percent = knowledgeHubItems.length > 0 ? (count / knowledgeHubItems.length) * 100 : 0;
                      return (
                        <div key={cat} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="uppercase">{cat.replace('_', ' ')}</span>
                            <span>{count} NODES ({percent.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-[#0B0F14] h-2 border border-white/5 rounded-none">
                            <div
                              style={{ width: `${percent}%` }}
                              className="h-full bg-[#7DF9FF] shadow-[0_0_8px_#7DF9FF] rounded-none"
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB UPLOADER */}
            {activeTab === 'uploader' && (
              <div id="view-uploader" className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-[#7DF9FF]/10 pb-4">
                  <h2 className="font-heading text-2xl font-light">Content Upload Station</h2>
                  <p className="font-mono text-xs text-[#8B949E] mt-1">Compile new courses, files, and lectures.</p>
                </div>

                {hasPermission(['admin', 'educator', 'resource_person']) ? (
                  <form onSubmit={handleCreateHubItem} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider block">Title</label>
                        <input
                          type="text"
                          required
                          value={newHubItem.title}
                          onChange={e => setNewHubItem(p => ({ ...p, title: e.target.value }))}
                          placeholder="Technical Introduction to React 19..."
                          className="w-full bg-[#0B0F14] border border-white/10 text-xs px-4 py-2.5 outline-none focus:border-[#7DF9FF] rounded-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider block">Author Name</label>
                        <input
                          type="text"
                          required
                          value={newHubItem.author_name}
                          onChange={e => setNewHubItem(p => ({ ...p, author_name: e.target.value }))}
                          placeholder="e.g., Roshan Khumukcham"
                          className="w-full bg-[#0B0F14] border border-white/10 text-xs px-4 py-2.5 outline-none focus:border-[#7DF9FF] rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider block">Category</label>
                        <select
                          value={newHubItem.category}
                          onChange={e => setNewHubItem(p => ({ ...p, category: e.target.value }))}
                          className="w-full bg-[#0B0F14] border border-white/10 text-xs px-4 py-2.5 outline-none focus:border-[#7DF9FF] rounded-none text-white"
                        >
                          <option value="tutorial">Tutorial</option>
                          <option value="podcast">Podcast</option>
                          <option value="webinar">Webinar</option>
                          <option value="study_material">Study Material</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider block">Media Type</label>
                        <select
                          value={newHubItem.media_type}
                          onChange={e => setNewHubItem(p => ({ ...p, media_type: e.target.value }))}
                          className="w-full bg-[#0B0F14] border border-white/10 text-xs px-4 py-2.5 outline-none focus:border-[#7DF9FF] rounded-none text-white"
                        >
                          <option value="video_embed">YouTube/Video link (Embedded player)</option>
                          <option value="document_url">Study PDF link</option>
                          <option value="external_link">Generic External Link</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider block">Resource URL</label>
                      <input
                        type="url"
                        required
                        value={newHubItem.url}
                        onChange={e => setNewHubItem(p => ({ ...p, url: e.target.value }))}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full bg-[#0B0F14] border border-white/10 text-xs px-4 py-2.5 outline-none focus:border-[#7DF9FF] rounded-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider block">Brief Description</label>
                      <textarea
                        value={newHubItem.description}
                        onChange={e => setNewHubItem(p => ({ ...p, description: e.target.value }))}
                        placeholder="A concise synopsis detailing what core concepts this resource node will cover..."
                        rows={3}
                        className="w-full bg-[#0B0F14] border border-white/10 text-xs px-4 py-2.5 outline-none focus:border-[#7DF9FF] rounded-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#7DF9FF] text-[#0B0F14] hover:bg-white hover:text-[#0B0F14] transition-all duration-300 font-mono text-[10px] font-bold tracking-widest uppercase cursor-pointer rounded-none"
                    >
                      COMPILE RESOURCE
                    </button>
                  </form>
                ) : (
                  <div className="p-8 text-center text-[#8B949E] font-mono text-xs border border-red-500/20 bg-red-500/5">
                    ACCESS DENIED. USER PROTOCOL REQUIRES LEVEL: STAFF, EDUCATOR, OR ADMIN.
                  </div>
                )}
              </div>
            )}

            {/* TAB AI MATRIX */}
            {activeTab === 'ai-matrix' && (
              <div id="view-ai-matrix" className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-[#7DF9FF]/10 pb-4">
                  <h2 className="font-heading text-2xl font-light">AI Cognitive Training Matrix</h2>
                  <p className="font-mono text-xs text-[#8B949E] mt-1">Inject custom facts directly into the site advisor chatbot.</p>
                </div>

                {hasPermission(['admin', 'educator']) ? (
                  <div className="space-y-8">
                    <form onSubmit={handleCreateKbDoc} className="space-y-4 border border-[#7DF9FF]/10 p-5 bg-white/[0.01] rounded-none">
                      <h3 className="font-mono text-[10px] font-bold text-[#7DF9FF] tracking-wider uppercase mb-2">New Factual Guideline Influx</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          required
                          value={newKbDoc.question}
                          onChange={e => setNewKbDoc(p => ({ ...p, question: e.target.value }))}
                          placeholder="Fact Topic (e.g. Founder Bikash Oinam Email?)"
                          className="w-full bg-[#0B0F14] border border-white/10 text-xs px-4 py-2.5 outline-none focus:border-[#7DF9FF] rounded-none"
                        />
                        <textarea
                          required
                          value={newKbDoc.answer}
                          onChange={e => setNewKbDoc(p => ({ ...p, answer: e.target.value }))}
                          placeholder="Factual Knowledge Answer (e.g. Mr. Bikash Oinam can be reached at info@eduplus.in)"
                          rows={2}
                          className="w-full bg-[#0B0F14] border border-white/10 text-xs px-4 py-2.5 outline-none focus:border-[#7DF9FF] rounded-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#7DF9FF]/10 border border-[#7DF9FF]/30 text-[#7DF9FF] hover:bg-[#7DF9FF] hover:text-[#0B0F14] transition-all duration-300 font-mono text-[9px] font-bold tracking-wider rounded-none cursor-pointer"
                      >
                        TRAIN COGNITIVE ADVISOR
                      </button>
                    </form>

                    {/* Loaded Rules */}
                    <div className="space-y-3">
                      <h3 className="font-mono text-[10px] font-bold text-white/50 tracking-wider uppercase">Active Fact Matrix</h3>
                      {kbDocuments.length === 0 ? (
                        <p className="text-xs text-white/30 font-mono">NO TRAINING INJECTIONS RECORDED.</p>
                      ) : (
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {kbDocuments.map(doc => (
                            <div key={doc.id} className="border border-white/5 p-4 flex justify-between items-center rounded-none bg-[#0E131A]/30">
                              <div className="text-left max-w-[80%]">
                                <p className="font-mono text-[10px] text-[#7DF9FF]">TOPIC: {doc.question}</p>
                                <p className="text-xs text-[#8B949E] mt-1">{doc.answer}</p>
                              </div>
                              <button
                                onClick={() => handleToggleKbActive(doc.id, doc.is_active)}
                                className={`px-2 py-1 text-[8px] font-mono rounded-none uppercase transition-all duration-300 cursor-pointer ${
                                  doc.is_active
                                    ? 'bg-green-500/10 border border-green-500/40 text-green-500'
                                    : 'bg-red-500/10 border border-red-500/40 text-red-500'
                                }`}
                              >
                                {doc.is_active ? 'ACTIVE' : 'DEACTIVATED'}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-[#8B949E] font-mono text-xs border border-red-500/20 bg-red-500/5">
                    ACCESS DENIED. AI COMPILING CAPABILITIES REQUIRE SECURITY LEVEL: EDUCATOR OR ADMIN.
                  </div>
                )}
              </div>
            )}

            {/* TAB MESSAGES */}
            {activeTab === 'messages' && (
              <div id="view-message-hub" className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-[#7DF9FF]/10 pb-4">
                  <h2 className="font-heading text-2xl font-light">Sonar Inquiries Terminal</h2>
                  <p className="font-mono text-xs text-[#8B949E] mt-1">Signals received from public contact nodes.</p>
                </div>

                {hasPermission(['admin', 'educator']) ? (
                  <div className="space-y-4">
                    {contactMessages.length === 0 ? (
                      <p className="text-center py-10 font-mono text-white/40 text-xs uppercase">No inquiries received yet.</p>
                    ) : (
                      <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2">
                        {contactMessages.map(msg => (
                          <div
                            key={msg.id}
                            className={`p-5 border text-left transition-colors duration-300 rounded-none ${
                              msg.status === 'unread'
                                ? 'border-[#7DF9FF]/40 bg-[#7DF9FF]/5 shadow-[0_0_8px_rgba(125,249,255,0.05)]'
                                : 'border-white/5 bg-[#0E131A]/30'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="font-mono text-[9px] text-[#7DF9FF] uppercase tracking-wider block">
                                  {msg.profile} inquiry
                                </span>
                                <h4 className="font-heading text-base font-light text-white mt-1">{msg.name}</h4>
                                <span className="font-mono text-[10px] text-white/50 block mt-0.5">{msg.email}</span>
                              </div>
                              {msg.status === 'unread' && (
                                <button
                                  onClick={() => handleMarkMessageRead(msg.id)}
                                  className="px-2.5 py-0.5 bg-[#7DF9FF] hover:bg-white text-[#0B0F14] transition-colors font-mono text-[8px] font-bold tracking-wider uppercase rounded-none cursor-pointer"
                                >
                                  Mark Read
                                </button>
                              )}
                            </div>
                            <p className="font-sans text-xs text-[#8B949E] leading-relaxed mt-4 pt-4 border-t border-white/5">
                              {msg.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 text-center text-[#8B949E] font-mono text-xs border border-red-500/20 bg-red-500/5">
                    ACCESS DENIED. COMPROMISED CLEARANCE LEVEL. REQUIRED NODES: EDUCATOR OR ADMIN.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  ```

---

### Task 7: Routing and Navigation Link Matrix Update

**Files:**
- Modify: `c:\edu-plus\app\src\App.tsx`
- Modify: `c:\edu-plus\app\src\sections\Navigation.tsx`

- [ ] **Step 1: Mount Knowledge Hub and Dashboard pages in App routes**
  Update `App.tsx` to import the two newly built pages, and mount routes `/knowledge-hub` and `/dashboard` cleanly.

  ```diff
  <<<<
  import News from './pages/News';
  import Contact from './pages/Contact';
  
  function App() {
  ====
  import News from './pages/News';
  import Contact from './pages/Contact';
  import KnowledgeHub from './pages/KnowledgeHub';
  import Dashboard from './pages/Dashboard';
  
  function App() {
  >>>>
  ```

  ```diff
  <<<<
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
  ====
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/knowledge-hub" element={<KnowledgeHub />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
  >>>>
  ```

- [ ] **Step 2: Add nav paths to header navigation menu**
  Modify `Navigation.tsx` to add `Knowledge Hub` and `Portal Console` (Dashboard) in the navigation links array so users can access them instantly.

  ```diff
  <<<<
  const NAV_LINKS = [
    { label: 'About', path: '/about' },
    { label: 'Programs', path: '/programs' },
    { label: 'Events', path: '/events' },
    { label: 'Council', path: '/council' },
    { label: 'Guidance', path: '/guidance' },
    { label: 'News', path: '/news' },
  ];
  ====
  const NAV_LINKS = [
    { label: 'About', path: '/about' },
    { label: 'Programs', path: '/programs' },
    { label: 'Knowledge Hub', path: '/knowledge-hub' },
    { label: 'Events', path: '/events' },
    { label: 'Council', path: '/council' },
    { label: 'Guidance', path: '/guidance' },
    { label: 'News', path: '/news' },
    { label: 'Dashboard', path: '/dashboard' },
  ];
  >>>>
  ```

---

### Task 8: Global CSS and Glassmorphic Custom Style Polish

**Files:**
- Modify: `c:\edu-plus\app\src\index.css`

- [ ] **Step 1: Verify and expand cyberpunk telemetry utility styling**
  Verify the glassmorphic custom variables and add an optional pulsing animation keyframe class inside `index.css` if missing. Ensure `rounded-none` operates perfectly.

  ```diff
  <<<<
  /* Utility classes */
  .liquid-glass {
  ====
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fade-in {
    animation: fadeIn 0.25s ease-out forwards;
  }

  /* Utility classes */
  .liquid-glass {
  >>>>
  ```

- [ ] **Step 2: Validate TypeScript build**
  Execute `pnpm tsc -b` to make sure there are no syntax or type compiler conflicts in the whole repository.
  Run: `pnpm tsc -b` inside `c:\edu-plus\app`
  Expected: Command succeeds with zero error diagnostics.

- [ ] **Step 3: Run unit and integration tests**
  Execute `pnpm run test:run` inside `c:\edu-plus\app` to guarantee existing components and newly connected hooks run fully securely.
  Run: `pnpm run test:run`
  Expected: All tests pass.
