import { useEffect, useState, useRef } from 'react';
import { sendChatMessage, type ChatMessage } from '../lib/ai/chat-service';
import { X } from 'lucide-react';

const translations = {
  advisorTitle: "EDU+ AI ADVISOR",
  thinking: "Thinking...",
  btnPrograms: "Programs",
  btnCareerCounseling: "Career Counseling",
  btnSend: "SEND",
  statusOnline: "ONLINE"
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

export default function AIChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Initialize or restore session
  useEffect(() => {
    if (!isOpen || conversationId) return;

    const initSession = () => {
      try {
        let session = localStorage.getItem('edu_plus_chat_session_id');
        if (!session) {
          if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            session = crypto.randomUUID();
          } else {
            session = 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          }
          localStorage.setItem('edu_plus_chat_session_id', session);
        }

        setConversationId(session);

        const welcomeMsg: ChatMessage = {
          role: 'assistant',
          content: 'Welcome to Edu+ AI Advisor. I am your academic guidance assistant. Are you looking for career counseling, program exploration, or academic advisory?'
        };
        setMessages([welcomeMsg]);
      } catch (err) {
        console.error('Fatal error in initSession:', err);
        setMessages([{
          role: 'assistant',
          content: 'Welcome to Edu+ AI Advisor. I am your academic guidance assistant. Are you looking for career counseling, program exploration, or academic advisory?'
        }]);
      }
    };

    initSession();
  }, [isOpen, conversationId]);

  // Auto-scroll to latest message
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

    try {
      const responseContent = await sendChatMessage(updatedMessages.slice(-10), conversationId);

      const agentMsg: ChatMessage = { role: 'assistant', content: responseContent };
      setMessages(prev => [...prev, agentMsg]);
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
            <span className="font-sans text-primary font-semibold">{num}.</span>
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
    <>
      {/* Toggle Button — only shown when chat is closed */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
          <button /* ui-ignore */
            onClick={() => setIsOpen(true)}
            className="group flex flex-col items-center justify-center h-14 w-14 bg-background border border-primary/30 text-foreground hover:border-primary/80 transition-colors duration-300 cursor-pointer relative shadow-md rounded-none"
            aria-label="Open AI chat support"
          >
            <span className="font-sans text-xs font-bold tracking-wide text-primary group-hover:scale-105 transition-transform duration-200">
              Ask
            </span>
          </button>
        </div>
      )}

      {/* Chat Widget Panel */}
      {isOpen && (
        <>
          {/* Backdrop — tap outside panel to close */}
          <div
            className="fixed inset-0 z-[9998] bg-black/60"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 z-[9999] w-full sm:w-[380px] h-[100dvh] bg-background border-l border-primary/20 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 font-sans">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-muted/50 border-b border-border/80 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 bg-primary"></span>
                </span>
                <span className="font-sans text-xs font-bold tracking-widest text-primary uppercase">{t('advisorTitle')}</span>
              </div>
              {/* Close button */}
              <button /* ui-ignore */
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI chat"
                className="flex items-center justify-center h-8 w-8 border border-border hover:border-primary/60 text-muted-foreground hover:text-primary bg-transparent hover:bg-primary/10 transition-all duration-200 cursor-pointer rounded-none"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-1 max-w-[90%] ${
                    msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto'
                  }`}
                >
                  <span className={`font-sans text-xs tracking-widest ${
                    msg.role === 'user' ? 'text-muted-foreground' : 'text-primary'
                  }`}>
                    {msg.role === 'user' ? 'You' : 'EduPlus advisor'}
                  </span>
                  <div className={`p-3.5 text-xs leading-relaxed border ${
                    msg.role === 'user'
                      ? 'bg-muted/80 border-border text-foreground rounded-none'
                      : 'bg-primary/5 border-primary/10 text-foreground rounded-none'
                  }`}>
                    {formatMessageContent(msg.content)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col gap-1 mr-auto max-w-[90%]">
                  <span className="font-sans text-xs tracking-widest text-primary">EduPlus advisor</span>
                  <div className="p-3.5 text-xs bg-primary/5 border border-primary/10 text-primary rounded-none">
                    {t('thinking')}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="px-5 py-3 border-t border-border/60 flex flex-wrap gap-2 bg-muted/20 flex-shrink-0">
                <button /* ui-ignore */
                  onClick={() => handleSendMessage('Explore EduPlus Programs')}
                  className="px-3 py-1.5 text-xs font-sans border border-primary/20 bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-200 cursor-pointer rounded-none uppercase tracking-wider"
                >
                  {t('btnPrograms')}
                </button>
                <button /* ui-ignore */
                  onClick={() => handleSendMessage('I need career counseling')}
                  className="px-3 py-1.5 text-xs font-sans border border-primary/20 bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-200 cursor-pointer rounded-none uppercase tracking-wider"
                >
                  {t('btnCareerCounseling')}
                </button>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-border bg-background flex gap-2 flex-shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question…"
                disabled={isLoading}
                className="flex-1 bg-background border border-input text-foreground text-xs px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 disabled:opacity-50 font-sans transition-all rounded-none placeholder:text-muted-foreground/45"
              />
              <button /* ui-ignore */
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-primary hover:bg-primary/95 disabled:opacity-40 text-primary-foreground font-sans text-xs font-bold tracking-widest transition-all duration-300 cursor-pointer rounded-none border border-transparent hover:border-primary/20"
              >
                {t('btnSend')}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
