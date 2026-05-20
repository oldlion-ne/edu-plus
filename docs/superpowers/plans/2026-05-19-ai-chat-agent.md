# AI Chat Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate a smart, persistent cybernetic-themed AI Chat Agent into the Edu+ React site to assist visitors, provide career guidance, and explain services/council members.

**Architecture:** A floating chat card sits in the bottom-right viewport and interacts with OpenRouter API (Gemini model) for responses and Supabase DB to load and store persistent conversation histories based on a client-side session ID. The ScrollToTop button is moved to the bottom-left to prevent overlap.

**Tech Stack:** React (Vite, TS), Tailwind CSS, `@supabase/supabase-js`, Vitest, OpenRouter API.

---

### Task 1: Add Dependencies & Update Vite Config

**Files:**
- Modify: `app/package.json`
- Modify: `app/vite.config.ts`

- [ ] **Step 1: Install `@supabase/supabase-js`**
  
  Run this command in the `c:\edu-plus\app` directory:
  `pnpm add @supabase/supabase-js`
  
- [ ] **Step 2: Update `vite.config.ts` to expose `OPENROUTER_API`**
  
  Update `app/vite.config.ts` to load env variables from `.env.local` and define `process.env.OPENROUTER_API` for the browser.
  
  Replace the contents of `app/vite.config.ts` with:
  ```typescript
  import path from "path"
  import react from "@vitejs/plugin-react"
  import { defineConfig, loadEnv } from "vite"
  import { inspectAttr } from 'kimi-plugin-inspect-react'

  // https://vite.dev/config/
  export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      base: './',
      plugins: [inspectAttr(), react()],
      server: {
        port: 3000,
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      define: {
        'process.env.OPENROUTER_API': JSON.stringify(env.OPENROUTER_API || process.env.OPENROUTER_API),
      },
      test: {
        environment: "jsdom",
        globals: true,
      },
    };
  });
  ```

- [ ] **Step 3: Run type check and verify build**
  
  Run: `pnpm tsc -b` inside `c:\edu-plus\app`
  Expected: Command finishes successfully with no errors.

---

### Task 2: Supabase Database Migration

**Files:**
- Create: `app/scripts/migration.sql` (reference file)

- [ ] **Step 1: Execute SQL in Supabase DB**
  
  Execute the following SQL using the `supabase-mcp-server` `execute_sql` tool on project `bichdmoktcdnppctjmrc` or via the Supabase Dashboard SQL Editor:
  
  ```sql
  create extension if not exists "uuid-ossp";

  -- 1. Create Conversations Table
  create table if not exists public.conversations (
      id uuid primary key default gen_random_uuid(),
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- 2. Create Messages Table
  create table if not exists public.messages (
      id uuid primary key default gen_random_uuid(),
      conversation_id uuid references public.conversations(id) on delete cascade not null,
      role text check (role in ('user', 'assistant', 'system')) not null,
      content text not null,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Indexing for lookup speed
  create index if not exists messages_conversation_id_idx on public.messages(conversation_id);

  -- Enable RLS
  alter table public.conversations enable row level security;
  alter table public.messages enable row level security;

  -- Create permissive policies for guest users
  create policy "Allow public insert for conversations" on public.conversations for insert with check (true);
  create policy "Allow public select for conversations" on public.conversations for select using (true);
  create policy "Allow public insert for messages" on public.messages for insert with check (true);
  create policy "Allow public select for messages" on public.messages for select using (true);
  ```

- [ ] **Step 2: Confirm table creation**
  
  Run the `list_tables` tool for project `bichdmoktcdnppctjmrc` via the `supabase-mcp-server` to confirm `conversations` and `messages` tables are active.
  Expected: JSON list contains both `conversations` and `messages`.

---

### Task 3: Create Supabase Client and OpenRouter Utilities

**Files:**
- Create: `app/src/lib/supabaseClient.ts`
- Create: `app/src/lib/openRouter.ts`
- Create: `app/src/lib/openRouter.test.ts`

- [ ] **Step 1: Implement `supabaseClient.ts`**
  
  Create `app/src/lib/supabaseClient.ts`:
  ```typescript
  import { createClient } from '@supabase/supabase-js';

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing in env variables.');
  }

  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  ```

- [ ] **Step 2: Implement `openRouter.ts`**
  
  Create `app/src/lib/openRouter.ts`:
  ```typescript
  export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
  }

  const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

  export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
    const apiKey = process.env.OPENROUTER_API;
    if (!apiKey) {
      throw new Error('OpenRouter API key is not configured.');
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://eduplus.co',
        'X-Title': 'EduPlus AI Agent',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error('Invalid response structure from OpenRouter API.');
    }
    return reply;
  }
  ```

- [ ] **Step 3: Create tests for `openRouter.ts`**
  
  Create `app/src/lib/openRouter.test.ts`:
  ```typescript
  import { describe, it, expect, vi, beforeEach } from 'vitest';
  import { sendChatMessage } from './openRouter';

  describe('openRouter helper', () => {
    beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn());
      process.env.OPENROUTER_API = 'test-key';
    });

    it('successfully calls OpenRouter API and returns content', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Hello, I am EduPlus Assistant.'
            }
          }
        ]
      };

      (fetch as any).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const reply = await sendChatMessage([{ role: 'user', content: 'hi' }]);
      expect(reply).toBe('Hello, I am EduPlus Assistant.');
    });

    it('throws error when OpenRouter API key is missing', async () => {
      process.env.OPENROUTER_API = '';
      await expect(sendChatMessage([{ role: 'user', content: 'hi' }])).rejects.toThrow(
        'OpenRouter API key is not configured.'
      );
    });
  });
  ```

- [ ] **Step 4: Run unit tests to verify**
  
  Run: `pnpm test run src/lib/openRouter.test.ts`
  Expected: Tests pass.

---

### Task 4: Relocate ScrollToTop Component to Bottom-Left

**Files:**
- Modify: `app/src/components/ScrollToTop.tsx`

- [ ] **Step 1: Edit ScrollToTop button layout**
  
  Update `app/src/components/ScrollToTop.tsx` line 64. Change `right-8` to `left-8`.
  
  ```typescript
  // Find line 64 and replace className right-8 with left-8:
  className={`fixed bottom-8 left-8 z-50 p-3 bg-[#0B0F14]/85 border border-[#7DF9FF]/20 text-[#E6EDF3] rounded-none shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#7DF9FF] hover:text-[#7DF9FF] hover:shadow-[0_0_20px_rgba(125,249,255,0.25)] focus:outline-none focus:ring-1 focus:ring-[#7DF9FF] focus:border-[#7DF9FF] ${showButton ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}
  ```

- [ ] **Step 2: Run all tests to make sure layout tests are unaffected**
  
  Run: `pnpm test run`
  Expected: App routing tests and unit tests pass.

---

### Task 5: Implement the AIChatAgent Component

**Files:**
- Create: `app/src/components/AIChatAgent.tsx`
- Create: `app/src/components/AIChatAgent.test.tsx`

- [ ] **Step 1: Write `AIChatAgent.tsx` containing system prompt contexts and UI**
  
  Create `app/src/components/AIChatAgent.tsx`:
  ```typescript
  import { useEffect, useState, useRef } from 'react';
  import { supabase } from '../lib/supabaseClient';
  import { sendChatMessage, type ChatMessage } from '../lib/openRouter';

  const SYSTEM_PROMPT = `You are the Edu+ AI Cognitive Advisor, a highly smart, professional, and helpful site guide & academic counselor.
  Your goal is to guide visitors through Edu+ services and help students explore career/academic options.

  Edu+ Services/Programs:
  1. FuturePath Navigator: Decodes strengths, psychometrics, DMIT assessments for subject/stream selection. Includes 1-on-1 counseling.
  2. LifeSkills Lab: Teaches soft skills, communication, emotional resilience, financial literacy.
  3. Expert Connect Live: Connects students to industry experts, academics, researchers for mentorship.
  4. Global Admissions Studio: End-to-end guidance for domestic competitive prep (JEE, NEET, CUET) and international admissions (SAT, GRE, IELTS, Statement of Purpose essays, visas).
  5. Career Launchpad: Resume/LinkedIn building, mock interviews, global placements.
  6. Innovation Studio & Educator Academy: Sets up STEM/robotics spaces in schools; provides modern pedagogical growth training for teachers.

  Edu+ Founders & Key Council Members:
  - Mr. Bikash Oinam: Founder, cultural/education entrepreneur, designs learning experiences.
  - Mr. Roshan Khumukcham (also Shri Khumukcham Roshaan Singh): Founder & Career Coach, 20+ years automotive corporate experience, author of "Smart Behaviour Installation Guide".
  - Mr. Ronen Akoijam: Co-Founder, Speech Language Therapist in Ministry of Education Singapore, 20+ years clinical early language development expertise.
  - Dr. Soram Bobby Singh: Principal Scientist (Green Hydrogen, South Korea), material science researcher.
  - Shri Romen Ningthoujam: Operational Lead NE States for Goonj, M.Ed., Ph.D. in Education & Applied Psychology.
  - Smt. Nutan Nongthongbam: Life Skills Trainer & recognized Public Health Speaker.
  - Ms. Geetarani Takhellambam, LL.M.: GM & Head Legal (Powerica Ltd), UK/India qualified legal expert.
  - Shri Rojit Keisham: Faculty at Indian Maritime University, 14+ years Merchant Navy operations.
  - Dr. Ngangbam Shantikumar Meetei: Professor of English (Taiwan), natural bodybuilder with 12 world titles.
  - Smt. Purnimashi Moirangthem: Early Childhood ECE Center Assistant Director (Dallas, USA).
  - Dr. Tomba Singh Thokchom: Associate Professor at KSV University, curriculum expert.
  - Dr. Usham Rojio: Assistant Professor (Visva-Bharati), poet, theatre practitioner.

  Style Guidelines:
  - Sound futuristic, highly professional, encouraging, and supportive. Use tech/telemetry vocabulary subtly (e.g. "exploration node", "telemetry active", "counseling matrix").
  - Keep answers structured with bullet points where appropriate.
  - Encourage the user to explore the website pages (Programs, About, Council, Contact). If they express a strong interest in registering, guide them to use the Connect page/form (/contact).`;

  export default function AIChatAgent() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load or create conversation session
    useEffect(() => {
      const initSession = async () => {
        let session = localStorage.getItem('edu_plus_chat_session_id');
        if (!session) {
          // Create conversation in Supabase
          const { data, error } = await supabase
            .from('conversations')
            .insert({})
            .select()
            .single();

          if (error) {
            console.error('Error creating chat session in Supabase:', error);
            // Fallback: local session ID
            session = crypto.randomUUID();
            localStorage.setItem('edu_plus_chat_session_id', session);
            setConversationId(session);
            return;
          }

          session = data.id;
          localStorage.setItem('edu_plus_chat_session_id', session);
        }

        setConversationId(session);

        // Fetch messages history
        const { data: history, error: historyErr } = await supabase
          .from('messages')
          .select('role, content')
          .eq('conversation_id', session)
          .order('created_at', { ascending: true });

        if (historyErr) {
          console.error('Error loading chat history:', historyErr);
          return;
        }

        if (history && history.length > 0) {
          setMessages(history.map(h => ({ role: h.role as any, content: h.content })));
        } else {
          // Welcome greeting
          const welcomeMsg: ChatMessage = {
            role: 'assistant',
            content: 'Welcome to Edu+ Telemetry Link. I am your cognitive guidance node. Are you looking for career counseling, programs exploration, or academic advisory?'
          };
          setMessages([welcomeMsg]);
          
          // Save welcome message to Supabase
          await supabase.from('messages').insert({
            conversation_id: session,
            role: 'assistant',
            content: welcomeMsg.content
          });
        }
      };

      initSession();
    }, []);

    // Scroll to bottom when messages list changes
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (text: string) => {
      if (!text.trim() || isLoading || !conversationId) return;

      const userMsg: ChatMessage = { role: 'user', content: text };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInputValue('');
      setIsLoading(true);

      // Save user message to Supabase
      const { error: saveErr } = await supabase.from('messages').insert({
        conversation_id: conversationId,
        role: 'user',
        content: text
      });

      if (saveErr) {
        console.error('Error saving user message to Supabase:', saveErr);
      }

      try {
        const fullPayload: ChatMessage[] = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...updatedMessages
        ];

        const responseContent = await sendChatMessage(fullPayload);

        const agentMsg: ChatMessage = { role: 'assistant', content: responseContent };
        setMessages(prev => [...prev, agentMsg]);

        // Save agent response to Supabase
        const { error: saveAgentErr } = await supabase.from('messages').insert({
          conversation_id: conversationId,
          role: 'assistant',
          content: responseContent
        });

        if (saveAgentErr) {
          console.error('Error saving agent response to Supabase:', saveAgentErr);
        }
      } catch (err: any) {
        console.error('Chat error:', err);
        const errMsg: ChatMessage = {
          role: 'assistant',
          content: 'ALERT // Connection interruption. Please verify environment API credentials and transmit query again.'
        };
        setMessages(prev => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="fixed bottom-8 right-8 z-50 font-sans">
        {/* Toggle Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center h-12 w-12 bg-transparent border border-[#7DF9FF]/40 text-[#7DF9FF] hover:border-[#7DF9FF] hover:shadow-[0_0_15px_rgba(125,249,255,0.3)] transition-all duration-300 cursor-pointer rounded-none relative"
            aria-label="Open AI chat support"
          >
            <span className="font-heading font-medium text-xs tracking-wider">AI</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7DF9FF] animate-pulse"></span>
          </button>
        )}

        {/* Chat Widget Panel */}
        {isOpen && (
          <div className="w-[360px] sm:w-[400px] h-[480px] bg-[#0B0F14]/95 border border-[#7DF9FF] shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col rounded-none animate-in fade-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#7DF9FF]/5 border-b border-[#7DF9FF]/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#7DF9FF] shadow-[0_0_8px_#7DF9FF]"></span>
                <span className="font-mono text-xs font-bold tracking-widest text-[#7DF9FF]">EDU+ COGNITIVE LINK</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8B949E] hover:text-[#7DF9FF] transition-colors text-xl font-heading focus:outline-none"
              >
                &times;
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#7DF9FF]/20">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-1 max-w-[85%] ${
                    msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto'
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] tracking-wider ${
                      msg.role === 'user' ? 'text-[#8B949E]' : 'text-[#7DF9FF]'
                    }`}
                  >
                    {msg.role === 'user' ? '[USER]' : '[AGENT.SYS]'}
                  </span>
                  <div
                    className={`p-3 text-xs leading-relaxed rounded-none border ${
                      msg.role === 'user'
                        ? 'bg-white/[0.03] border-white/10 text-[#E6EDF3]'
                        : 'bg-[#7DF9FF]/5 border-[#7DF9FF]/10 text-[#E6EDF3]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col gap-1 mr-auto max-w-[85%]">
                  <span className="font-mono text-[9px] tracking-wider text-[#7DF9FF]">[AGENT.SYS]</span>
                  <div className="p-3 text-xs bg-[#7DF9FF]/5 border border-[#7DF9FF]/10 text-[#7DF9FF] rounded-none font-mono">
                    COMPUTING_RESPONSE...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-[#7DF9FF]/10 flex flex-wrap gap-2">
                <button
                  onClick={() => handleSendMessage('Explore EduPlus Programs')}
                  className="px-2.5 py-1 text-[10px] font-sans border border-[#7DF9FF]/30 text-[#7DF9FF] hover:border-[#7DF9FF] hover:bg-[#7DF9FF]/5 transition-all duration-200 rounded-none cursor-pointer"
                >
                  Programs Exploration
                </button>
                <button
                  onClick={() => handleSendMessage('I need career counseling')}
                  className="px-2.5 py-1 text-[10px] font-sans border border-[#7DF9FF]/30 text-[#7DF9FF] hover:border-[#7DF9FF] hover:bg-[#7DF9FF]/5 transition-all duration-200 rounded-none cursor-pointer"
                >
                  Career Counselling
                </button>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-[#7DF9FF]/10 bg-[#0B0F14] flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Transmit query..."
                disabled={isLoading}
                className="flex-1 bg-[#0B0F14] border border-[#7DF9FF]/20 text-[#E6EDF3] text-xs px-3 py-2 outline-none focus:border-[#7DF9FF] disabled:opacity-50 font-sans rounded-none transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-[#7DF9FF] hover:bg-[#FFFFFF] disabled:bg-[#7DF9FF]/20 text-[#0B0F14] disabled:text-[#7DF9FF]/40 font-mono text-[10px] font-bold tracking-wider transition-colors duration-300 rounded-none cursor-pointer"
              >
                SEND
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
  ```

- [ ] **Step 2: Create unit tests for `AIChatAgent.tsx`**
  
  Create `app/src/components/AIChatAgent.test.tsx`:
  ```typescript
  import { render, screen, fireEvent } from '@testing-library/react';
  import { describe, it, expect, vi, beforeEach } from 'vitest';
  import AIChatAgent from './AIChatAgent';

  // Mock supabase
  vi.mock('../lib/supabaseClient', () => ({
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: { id: 'test-conversation-id' }, error: null })),
          eq: vi.fn(() => ({
            order: vi.fn(() => Promise.resolve({ data: [], error: null }))
          }))
        })),
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({ data: { id: 'test-conversation-id' }, error: null }))
          }))
        }))
      }))
    }
  }));

  // Mock scrollIntoView
  window.HTMLElement.prototype.scrollIntoView = vi.fn();

  describe('AIChatAgent component', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('renders initial AI toggle button', () => {
      render(<AIChatAgent />);
      expect(screen.getByRole('button', { name: /open ai chat support/i })).toBeDefined();
    });

    it('opens chat window on toggle button click', async () => {
      render(<AIChatAgent />);
      const button = screen.getByRole('button', { name: /open ai chat support/i });
      fireEvent.click(button);
      
      expect(screen.getByText('EDU+ COGNITIVE LINK')).toBeDefined();
      expect(screen.getByPlaceholderText('Transmit query...')).toBeDefined();
    });
  });
  ```

- [ ] **Step 3: Run Vitest to check AIChatAgent component tests**
  
  Run: `pnpm test run src/components/AIChatAgent.test.tsx`
  Expected: All tests pass.

---

### Task 6: Integrate AIChatAgent component in App.tsx

**Files:**
- Modify: `app/src/App.tsx`

- [ ] **Step 1: Edit `src/App.tsx` to add `AIChatAgent` component**
  
  Insert `<AIChatAgent />` inside the root container.
  
  ```typescript
  // Import the new component at the top of App.tsx:
  import AIChatAgent from './components/AIChatAgent';

  // Add <AIChatAgent /> inside the main return block right next to <ScrollToTop />:
  function App() {
    return (
      <div className="relative min-h-screen bg-[#0B0F14] flex flex-col justify-between overflow-x-hidden">
        <ScrollToTop />
        <AIChatAgent />
        <Navigation />
        {/* ... */}
      </div>
    );
  }
  ```

- [ ] **Step 2: Start local server and compile code**
  
  Run: `pnpm run build` inside `c:\edu-plus\app` to verify type safety and bundle compiling.
  Expected: Build finishes with no TypeScript or build errors.

---
