import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { sendChatMessage, type ChatMessage } from '../lib/openRouter';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const SYSTEM_PROMPT = `You are the Edu+ AI Cognitive Advisor, a highly smart, professional, and helpful site guide & academic counselor.
Your goal is to guide visitors through Edu+ services and help students explore career/academic options.

Edu+ Services/Programs:
1. FuturePath Navigator: Decodes strengths, psychometrics, DMIT assessments for subject/stream selection. Includes 1-on-1 counseling.
2. LifeSkills Lab: Teaches soft skills, communication, emotional resilience, financial literacy.
3. Expert Connect Live: Connects students to industry experts, academics, researchers for mentorship.
4. Global Admissions Studio: End-to-end guidance for domestic competitive prep (JEE, NEET, CUET) and international admissions (SAT, GRE, IELTS, Statement of Purpose essays, visas).
5. Career Launchpad: Resume/LinkedIn building, mock interviews, global placements.
6. Innovation Studio & Educator Academy: Sets up STEM/robotics spaces in schools; provides modern pedagogical growth training for teachers.

Style Guidelines:
- Sound professional, encouraging, and supportive.
- Keep answers structured with bullet points where appropriate.
- Encourage the user to explore the website pages (Programs, About, Council, Contact). If they express a strong interest in registering, guide them to use the Connect page (/contact).`;

export default function AIChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initSession = async () => {
      let session = localStorage.getItem('edu_plus_chat_session_id');
      if (!session) {
        session = crypto.randomUUID();
        localStorage.setItem('edu_plus_chat_session_id', session);
      }

      setConversationId(session);

      const { error: ensureErr } = await supabase
        .rpc('ensure_conversation', { p_conversation_id: session });

      if (ensureErr) {
        console.error('Error ensuring chat session in Supabase:', ensureErr);
      }

      const { data: history, error: historyErr } = await supabase
        .rpc('get_conversation_messages', { p_conversation_id: session! });

      if (historyErr) {
        console.error('Error loading chat history:', historyErr);
        return;
      }

      if (history && history.length > 0) {
        setMessages(history.map((h: any) => ({ role: h.role as any, content: h.content })));
      } else {
        const welcomeMsg: ChatMessage = {
          role: 'assistant',
          content: 'Welcome to Edu+ AI Advisor. I am your academic guidance assistant. Are you looking for career counseling, program exploration, or academic advisory?'
        };
        setMessages([welcomeMsg]);

        await supabase.from('messages').insert({
          conversation_id: session,
          role: 'assistant',
          content: welcomeMsg.content
        });
      }
    };

    initSession();
  }, []);

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

    const { error: saveErr } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      role: 'user',
      content: text
    });

    if (saveErr) {
      console.error('Error saving user message to Supabase:', saveErr);
    }

    try {
      let dynamicContext = '';
      try {
        const { data: kbDocs } = await supabase
          .from('kb_documents')
          .select('question, answer')
          .eq('is_active', true);

        if (kbDocs && kbDocs.length > 0) {
          dynamicContext = '\n\n[DYNAMIC KNOWLEDGE]\n' +
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
        content: 'Connection error. Please try again.'
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

      const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ');
      if (isBullet) {
        trimmed = trimmed.substring(2);
      }

      const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);

      if (numMatch) {
        const num = numMatch[1];
        const rest = numMatch[2];
        const parts = rest.split(/(\*\*.*?\*\*)/g);
        const formattedLine = parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
        return (
          <div key={lineIndex} className="ml-4 mb-1.5 text-left flex gap-1.5 leading-relaxed">
            <span className="font-mono text-primary font-semibold">{num}.</span>
            <span className="flex-1">{formattedLine}</span>
          </div>
        );
      }

      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={lineIndex} className="ml-4 mb-1.5 text-left flex gap-2 leading-relaxed">
            <span className="text-primary">•</span>
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
          className="flex items-center justify-center h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 cursor-pointer relative shadow-md"
          aria-label="Open AI chat support"
        >
          <span className="font-heading font-medium text-[10px] tracking-wider">AI</span>
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary-foreground animate-pulse" />
        </button>
      )}

      {/* Chat Widget Panel */}
      {isOpen && (
        <div className="w-[280px] sm:w-[320px] h-[360px] sm:h-[400px] bg-card border border-border shadow-xl flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-muted border-b border-border">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary" />
              <span className="font-mono text-[10px] font-bold tracking-widest text-primary">EDU+ AI ADVISOR</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="size-3.5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col gap-0.5 max-w-[88%] ${
                  msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto'
                }`}
              >
                <span className={`font-mono text-[8px] tracking-wider ${
                  msg.role === 'user' ? 'text-muted-foreground' : 'text-primary'
                }`}>
                  {msg.role === 'user' ? '[YOU]' : '[ADVISOR]'}
                </span>
                <div className={`p-2.5 text-[11px] leading-relaxed border ${
                  msg.role === 'user'
                    ? 'bg-muted border-border text-foreground'
                    : 'bg-primary/5 border-primary/20 text-foreground'
                }`}>
                  {formatMessageContent(msg.content)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col gap-0.5 mr-auto max-w-[88%]">
                <span className="font-mono text-[8px] tracking-wider text-primary">[ADVISOR]</span>
                <div className="p-2.5 text-[11px] bg-primary/5 border border-primary/20 text-primary font-mono animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="px-3 py-1.5 border-t border-border flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSendMessage('Explore EduPlus Programs')}
                className="px-2 py-0.5 text-[9px] font-sans border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer"
              >
                Programs
              </button>
              <button
                onClick={() => handleSendMessage('I need career counseling')}
                className="px-2 py-0.5 text-[9px] font-sans border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer"
              >
                Career Counseling
              </button>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-2 border-t border-border bg-background flex gap-1.5"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="flex-1 bg-background border border-input text-foreground text-[11px] px-2.5 py-1.5 outline-none focus:border-ring disabled:opacity-50 font-sans transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-3 py-1.5 bg-primary hover:bg-primary/90 disabled:opacity-40 text-primary-foreground font-mono text-[9px] font-bold tracking-wider transition-colors duration-300 cursor-pointer"
            >
              SEND
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
