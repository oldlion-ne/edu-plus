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
        session = crypto.randomUUID();
        localStorage.setItem('edu_plus_chat_session_id', session);
      }

      setConversationId(session);

      // Ensure the conversation row exists in the Supabase DB using secure RPC
      const { error: ensureErr } = await supabase
        .rpc('ensure_conversation', { p_conversation_id: session });

      if (ensureErr) {
        console.error('Error ensuring chat session in Supabase:', ensureErr);
      }

      // Fetch messages history using secure RPC function (instead of direct table select)
      const { data: history, error: historyErr } = await supabase
        .rpc('get_conversation_messages', { p_conversation_id: session! });

      if (historyErr) {
        console.error('Error loading chat history:', historyErr);
        return;
      }

      if (history && history.length > 0) {
        setMessages(history.map((h: any) => ({ role: h.role as any, content: h.content })));
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
      // Fetch active custom knowledge injections
      let dynamicContext = '';
      try {
        const { data: kbDocs } = await supabase
          .from('kb_documents')
          .select('question, answer')
          .eq('is_active', true);

        if (kbDocs && kbDocs.length > 0) {
          dynamicContext = '\n\n[DYNAMIC SECURE KNOWLEDGE RETRIEVED]\nPrioritize these specific dynamic custom facts during this conversation:\n' +
            kbDocs.map((doc: any, idx: number) => `${idx + 1}. Topic: ${doc.question} -> Fact: ${doc.answer}`).join('\n');
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

  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, lineIndex) => {
      let trimmed = line.trim();
      if (!trimmed) {
        return <div key={lineIndex} className="h-2" />;
      }

      // Check if it is a bullet item
      const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ');
      if (isBullet) {
        trimmed = trimmed.substring(2);
      }

      // Check if it is a numbered item (e.g. "1. ")
      const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
      
      if (numMatch) {
        const num = numMatch[1];
        const rest = numMatch[2];
        const parts = rest.split(/(\*\*.*?\*\*)/g);
        const formattedLine = parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-semibold text-[#7DF9FF]">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
        return (
          <div key={lineIndex} className="ml-4 mb-1.5 text-left flex gap-1.5 leading-relaxed">
            <span className="font-mono text-[#7DF9FF] font-semibold">{num}.</span>
            <span className="flex-1">{formattedLine}</span>
          </div>
        );
      }

      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-semibold text-[#7DF9FF]">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={lineIndex} className="ml-4 mb-1.5 text-left flex gap-2 leading-relaxed">
            <span className="text-[#7DF9FF]">•</span>
            <span className="flex-1">{formattedLine}</span>
          </div>
        );
      }

      return (
        <p key={lineIndex} className="mb-2 text-left leading-relaxed">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center h-10 w-10 bg-transparent border border-[#7DF9FF]/40 text-[#7DF9FF] hover:border-[#7DF9FF] hover:shadow-[0_0_12px_rgba(125,249,255,0.3)] transition-all duration-300 cursor-pointer rounded-none relative animate-bounce"
          aria-label="Open AI chat support"
        >
          <span className="font-heading font-medium text-[10px] tracking-wider">AI</span>
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#7DF9FF] animate-pulse"></span>
        </button>
      )}

      {/* Chat Widget Panel */}
      {isOpen && (
        <div className="w-[280px] sm:w-[320px] h-[360px] sm:h-[400px] bg-[#0B0F14]/95 border border-[#7DF9FF] shadow-[0_0_20px_rgba(0,0,0,0.8)] flex flex-col rounded-none animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#7DF9FF]/5 border-b border-[#7DF9FF]/20">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#7DF9FF] shadow-[0_0_6px_#7DF9FF]"></span>
              <span className="font-mono text-[10px] font-bold tracking-widest text-[#7DF9FF]">EDU+ COGNITIVE LINK</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8B949E] hover:text-[#7DF9FF] transition-colors text-base font-heading focus:outline-none cursor-pointer"
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-[#7DF9FF]/20">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col gap-0.5 max-w-[88%] ${
                  msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto'
                }`}
              >
                <span
                  className={`font-mono text-[8px] tracking-wider ${
                    msg.role === 'user' ? 'text-[#8B949E]' : 'text-[#7DF9FF]'
                  }`}
                >
                  {msg.role === 'user' ? '[USER]' : '[AGENT.SYS]'}
                </span>
                <div
                  className={`p-2.5 text-[11px] leading-relaxed rounded-none border ${
                    msg.role === 'user'
                      ? 'bg-white/[0.03] border-white/10 text-[#E6EDF3]'
                      : 'bg-[#7DF9FF]/5 border-[#7DF9FF]/10 text-[#E6EDF3]'
                  }`}
                >
                  {formatMessageContent(msg.content)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col gap-0.5 mr-auto max-w-[88%]">
                <span className="font-mono text-[8px] tracking-wider text-[#7DF9FF]">[AGENT.SYS]</span>
                <div className="p-2.5 text-[11px] bg-[#7DF9FF]/5 border border-[#7DF9FF]/10 text-[#7DF9FF] rounded-none font-mono">
                  COMPUTING_RESPONSE...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          {messages.length === 1 && (
            <div className="px-3 py-1.5 border-t border-[#7DF9FF]/10 flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSendMessage('Explore EduPlus Programs')}
                className="px-2 py-0.5 text-[9px] font-sans border border-[#7DF9FF]/30 text-[#7DF9FF] hover:border-[#7DF9FF] hover:bg-[#7DF9FF]/5 transition-all duration-200 rounded-none cursor-pointer"
              >
                Programs Exploration
              </button>
              <button
                onClick={() => handleSendMessage('I need career counseling')}
                className="px-2 py-0.5 text-[9px] font-sans border border-[#7DF9FF]/30 text-[#7DF9FF] hover:border-[#7DF9FF] hover:bg-[#7DF9FF]/5 transition-all duration-200 rounded-none cursor-pointer"
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
            className="p-2 border-t border-[#7DF9FF]/10 bg-[#0B0F14] flex gap-1.5"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Transmit query..."
              disabled={isLoading}
              className="flex-1 bg-[#0B0F14] border border-[#7DF9FF]/20 text-[#E6EDF3] text-[11px] px-2.5 py-1.5 outline-none focus:border-[#7DF9FF] disabled:opacity-50 font-sans rounded-none transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-3 py-1.5 bg-[#7DF9FF] hover:bg-[#FFFFFF] disabled:bg-[#7DF9FF]/20 text-[#0B0F14] disabled:text-[#7DF9FF]/40 font-mono text-[9px] font-bold tracking-wider transition-colors duration-300 rounded-none cursor-pointer"
            >
              SEND
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
