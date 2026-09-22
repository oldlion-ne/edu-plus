import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  Inbox, 
  Mail, 
  Bot, 
  Trash2, 
  Check,
  Search,
  MessageSquare,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface ContactMsg {
  id: string;
  name: string;
  email: string;
  mobile?: string | null;
  profile: string;
  message: string;
  status: string;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
}

export default function InboxManager({ activeFolder = 'inquiries' }: { activeFolder?: 'inquiries' | 'subscribers' | 'ai-chats' }) {
  const [contactMessages, setContactMessages] = useState<ContactMsg[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Detail Modal/View
  const [selectedMsg, setSelectedMsg] = useState<ContactMsg | null>(null);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [transcriptMessages, setTranscriptMessages] = useState<any[]>([]);

  useEffect(() => {
    if (selectedConv) {
      supabase.rpc('get_conversation_messages', { p_conversation_id: selectedConv.id })
        .then(({ data }) => setTranscriptMessages(data || []));
    } else {
      setTranscriptMessages([]);
    }
  }, [selectedConv]);

  useEffect(() => {
    fetchInboxData();
  }, []);

  const fetchInboxData = async () => {
    setLoading(true);
    try {
      const [msgRes, subRes, convRes] = await Promise.all([
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false }),
        supabase.from('conversations').select('*').order('updated_at', { ascending: false })
      ]);

      if (msgRes.error) toast.error('Failed to load contact messages');
      else if (msgRes.data) setContactMessages(msgRes.data);

      if (subRes.error) toast.error('Failed to load subscribers');
      else if (subRes.data) setSubscribers(subRes.data);

      if (convRes.error) toast.error('Failed to load AI chats');
      else if (convRes.data) setConversations(convRes.data);
    } catch (err: any) {
      toast.error('Failed to load inbox');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (msg: ContactMsg) => {
    try {
      const newStatus = msg.status === 'read' ? 'unread' : 'read';
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', msg.id);

      if (error) throw error;
      setContactMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: newStatus } : m));
      if (selectedMsg?.id === msg.id) {
        setSelectedMsg({ ...msg, status: newStatus });
      }
    } catch (err: any) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteMsg = async (id: string) => {
    if (!confirm('Delete message?')) return;
    try {
      const { error } = await supabase.from('contact_messages').delete().eq('id', id);
      if (error) throw error;
      toast.success('Message deleted');
      setContactMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMsg?.id === id) setSelectedMsg(null);
    } catch (err: any) {
      toast.error('Failed to delete message');
    }
  };

  const handleDeleteChat = async (id: string) => {
    if (!confirm('Delete chat session?')) return;
    try {
      const { error } = await supabase.from('conversations').delete().eq('id', id);
      if (error) throw error;
      toast.success('Chat session deleted');
      setConversations(prev => prev.filter(c => c.id !== id));
      if (selectedConv?.id === id) setSelectedConv(null);
    } catch (err: any) {
      toast.error('Failed to delete chat session');
    }
  };

  const handleExportChat = () => {
    if (!selectedConv || transcriptMessages.length === 0) return;
    const text = transcriptMessages.map(msg => `[${msg.role === 'user' ? 'YOU' : 'ADVISOR'}]\n${msg.content}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_session_${selectedConv.id.substring(0, 5)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (activeFolder === 'subscribers') {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="page-head">
          <h1>Subscribers</h1>
          <span className="sub">Newsletter and update opt-ins</span>
          <div className="act">
            <span className="count-chip">{subscribers.length} subscribers</span>
          </div>
        </div>
        <div className="card">
          <table className="tbl">
            <thead>
              <tr>
                <th>Email Address</th>
                <th>Joined Date</th>
                <th>Source</th>
                <th style={{ width: '60px' }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{ textAlign: 'center' }}>Loading...</td></tr>
              ) : subscribers.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center' }}>No subscribers yet</td></tr>
              ) : (
                subscribers.map(sub => (
                  <tr key={sub.id}>
                    <td className="pri">{sub.email}</td>
                    <td>{new Date(sub.subscribed_at).toLocaleDateString()}</td>
                    <td>Website Form</td>
                    <td></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const isMsgSelected = activeFolder === 'inquiries' && selectedMsg;
  const isConvSelected = activeFolder === 'ai-chats' && selectedConv;
  const isAnySelected = isMsgSelected || isConvSelected;

  const filteredInquiries = contactMessages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredChats = conversations.filter(c => c.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col gap-7 animate-in fade-in duration-300 w-full">
      <div className="page-head">
        <h1>{activeFolder === 'ai-chats' ? 'AI Chats' : 'Inquiries'}</h1>
        <span className="sub">
          {activeFolder === 'ai-chats' ? 'Conversation logs from the AI Advisor' : 'Messages from contact forms'}
        </span>
        <div className="act">
          <span className="count-chip">
            {activeFolder === 'inquiries' ? `${filteredInquiries.length} inquiries` : `${filteredChats.length} sessions`}
          </span>
        </div>
      </div>

      {((activeFolder === 'inquiries' && contactMessages.length === 0) || (activeFolder === 'ai-chats' && conversations.length === 0)) && !loading ? (
        <div className="empty-focal">
          <MessageSquare />
          <div className="t">{activeFolder === 'ai-chats' ? 'No chats yet' : 'No inquiries yet'}</div>
          <div className="s">{activeFolder === 'ai-chats' ? 'When visitors talk to the advisor, transcripts appear here.' : 'When users submit the contact form, messages appear here.'}</div>
        </div>
      ) : (
      <div className="split" data-list-empty={!isAnySelected}>
        <div className="split-list">
          <div className="search" style={{ width: '100%', borderBottom: '1px solid oklch(var(--border))' }}>
            <Search style={{ left: '18px' }} />
            <input 
              type="text" 
              className="input" 
              style={{ border: 'none', height: '56px', paddingLeft: '48px', backgroundColor: 'transparent' }}
              placeholder={activeFolder === 'ai-chats' ? 'Search sessions…' : 'Search inquiries…'} 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          {loading && <div style={{ padding: '20px', textAlign: 'center', color: 'oklch(var(--muted-foreground))' }}>Loading...</div>}
          
          {/* Contact List */}
          {activeFolder === 'inquiries' && !loading && (
            filteredInquiries.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'oklch(var(--muted-foreground))' }}>No inquiries found.</div>
            ) : (
              filteredInquiries.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMsg(msg)}
                  className={`li-row ${selectedMsg?.id === msg.id ? 'on' : ''}`}
                >
                  <div className="top">
                    <div className="nm" style={{ color: msg.status === 'unread' ? 'oklch(var(--foreground))' : 'oklch(var(--muted-foreground))' }}>
                      {msg.name}
                    </div>
                    <div className="dt font-mono text-[11px] text-muted-foreground">
                      {new Date(msg.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="em text-[12.5px] text-muted-foreground mt-[1px]">{msg.email}</div>
                  <div className="pv text-[13px] text-muted-foreground mt-1 truncate">{msg.message}</div>
                </button>
              ))
            )
          )}

          {/* AI Chats List */}
          {activeFolder === 'ai-chats' && !loading && (
            filteredChats.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'oklch(var(--muted-foreground))' }}>No chats found.</div>
            ) : (
              filteredChats.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`li-row ${selectedConv?.id === conv.id ? 'on' : ''}`}
                >
                  <div className="top">
                    <div className="nm text-foreground font-semibold text-[14px]">Session_{conv.id.substring(0, 5)}</div>
                    <div className="dt font-mono text-[11px] text-muted-foreground">{new Date(conv.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <div className="pv text-[13px] text-muted-foreground mt-1">Advisor Chat Session</div>
                </button>
              ))
            )
          )}
        </div>

        <div className="split-detail">
          {activeFolder === 'inquiries' && selectedMsg ? (
            <div>
              <div className="font-mono text-[11px] tracking-[.12em] uppercase text-primary">
                {selectedMsg.profile} Inquiry
              </div>
              <h2 className="font-heading text-xl font-normal text-foreground mt-2 mb-0.5">
                {selectedMsg.name}
              </h2>
              <div className="text-[12.5px] text-muted-foreground">
                {selectedMsg.email} · {new Date(selectedMsg.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>

              <dl className="kv">
                <dt>Email</dt>
                <dd>{selectedMsg.email}</dd>
                {selectedMsg.mobile && (
                  <>
                    <dt>Mobile</dt>
                    <dd>{selectedMsg.mobile}</dd>
                  </>
                )}
                <dt>Persona</dt>
                <dd style={{ textTransform: 'capitalize' }}>{selectedMsg.profile}</dd>
                <dt>Status</dt>
                <dd style={{ textTransform: 'capitalize' }}>{selectedMsg.status}</dd>
                <dt>Date</dt>
                <dd className="font-mono text-xs">{new Date(selectedMsg.created_at).toLocaleString()}</dd>
              </dl>

              <div className="hr" />

              <h3 className="font-sans text-[16px] font-semibold text-foreground mb-2">Message</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed max-w-[56ch] whitespace-pre-wrap">
                {selectedMsg.message}
              </p>

              <div className="flex gap-2.5 mt-6 items-center">
                <a href={`mailto:${selectedMsg.email}?subject=RE: Edu+ Inquiry`} className="btn btn-p btn-sm">
                  <Mail className="size-3.5 mr-1" /> Reply by email
                </a>
                <button className="btn btn-g btn-sm" onClick={() => handleMarkAsRead(selectedMsg)}>
                  <Check className="size-3.5 mr-1" />
                  {selectedMsg.status === 'read' ? 'Mark unread' : 'Mark resolved'}
                </button>
                <button className="btn btn-danger btn-sm ml-auto" onClick={() => handleDeleteMsg(selectedMsg.id)}>
                  <Trash2 className="size-3.5 mr-1" /> Delete
                </button>
              </div>
            </div>
          ) : activeFolder === 'ai-chats' && selectedConv ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 pb-4 border-b border-border/50 shrink-0">
                <Bot style={{ width: '24px', height: '24px', stroke: 'oklch(var(--primary))', fill: 'none', strokeWidth: 1.5 }} />
                <div className="flex-1">
                  <div className="font-heading font-medium text-foreground">Session_{selectedConv.id.substring(0, 5)} Transcript</div>
                  <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
                    {new Date(selectedConv.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-g btn-sm" onClick={handleExportChat}>
                    <Download className="size-3.5 mr-1" /> Export
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteChat(selectedConv.id)}>
                    <Trash2 className="size-3.5 mr-1" /> Delete
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4">
                {transcriptMessages.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-10">No messages in this transcript yet.</div>
                ) : (
                  transcriptMessages.map((msg, index) => (
                    <div key={msg.id || `msg-${index}`} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`text-[10px] uppercase font-bold tracking-wider ${msg.role === 'user' ? 'text-primary' : 'text-muted-foreground'}`}>
                        {msg.role === 'user' ? 'YOU' : 'ADVISOR'}
                      </div>
                      <div className={`p-3 text-[13.5px] leading-relaxed rounded-md max-w-[90%] whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary/10 text-foreground' : 'bg-muted/50 border border-border/50 text-foreground'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="detail-hint">
              <Inbox style={{ width: '32px', height: '32px', stroke: 'oklch(var(--muted-foreground))', fill: 'none', opacity: 0.7, strokeWidth: 1.4 }} />
              <div>Select an inquiry to view details</div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
