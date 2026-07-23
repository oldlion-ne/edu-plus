import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { 
  Inbox, 
  Mail, 
  Bot, 
  UserCheck, 
  Trash2, 
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface ContactMsg {
  id: string;
  name: string;
  email: string;
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

export default function InboxManager() {
  const [activeSubTab, setActiveSubTab] = useState<'contact' | 'subscribers' | 'ai-chats'>('contact');
  const [contactMessages, setContactMessages] = useState<ContactMsg[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected Detail Modal/View
  const [selectedMsg, setSelectedMsg] = useState<ContactMsg | null>(null);

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

      if (msgRes.data) setContactMessages(msgRes.data);
      if (subRes.data) setSubscribers(subRes.data);
      if (convRes.data) setConversations(convRes.data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load inbox');
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
    } catch (err: any) {
      toast.error(err.message || 'Failed to update message status');
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
      toast.error(err.message || 'Failed to delete message');
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="font-heading text-2xl font-light text-foreground flex items-center gap-2">
            <Inbox className="size-5 text-primary" />
            Communication & Submissions Inbox
          </h2>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Review user contact form inquiries, newsletter subscribers, and AI assistant interaction logs.
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-border pb-3">
        <button
          onClick={() => setActiveSubTab('contact')}
          className={`px-4 py-2 text-xs font-sans border rounded-none transition-colors flex items-center gap-2 ${
            activeSubTab === 'contact'
              ? 'bg-foreground text-background border-foreground font-medium'
              : 'bg-card text-muted-foreground border-border hover:text-foreground'
          }`}
        >
          <Mail className="size-3.5" />
          Contact Inquiries ({contactMessages.filter(m => m.status === 'unread').length} unread)
        </button>

        <button
          onClick={() => setActiveSubTab('subscribers')}
          className={`px-4 py-2 text-xs font-sans border rounded-none transition-colors flex items-center gap-2 ${
            activeSubTab === 'subscribers'
              ? 'bg-foreground text-background border-foreground font-medium'
              : 'bg-card text-muted-foreground border-border hover:text-foreground'
          }`}
        >
          <UserCheck className="size-3.5" />
          Newsletter Subscribers ({subscribers.length})
        </button>

        <button
          onClick={() => setActiveSubTab('ai-chats')}
          className={`px-4 py-2 text-xs font-sans border rounded-none transition-colors flex items-center gap-2 ${
            activeSubTab === 'ai-chats'
              ? 'bg-foreground text-background border-foreground font-medium'
              : 'bg-card text-muted-foreground border-border hover:text-foreground'
          }`}
        >
          <Bot className="size-3.5" />
          AI Chat Logs ({conversations.length})
        </button>
      </div>

      {/* Contact Messages View */}
      {activeSubTab === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 border border-border bg-card rounded-none overflow-hidden divide-y divide-border/40 max-h-[600px] overflow-y-auto">
            {loading ? (
              <p className="p-8 text-center text-xs text-muted-foreground">Loading inquiries...</p>
            ) : contactMessages.length === 0 ? (
              <p className="p-8 text-center text-xs text-muted-foreground">No contact messages received yet.</p>
            ) : (
              contactMessages.map(msg => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMsg(msg)}
                  className={`p-3 cursor-pointer transition-colors text-xs ${
                    selectedMsg?.id === msg.id 
                      ? 'bg-muted/40 border-l-2 border-l-primary' 
                      : msg.status === 'unread' 
                        ? 'bg-primary/5 font-medium' 
                        : 'hover:bg-muted/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground truncate">{msg.name}</p>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">{msg.email}</p>
                  <p className="text-xs text-foreground/80 line-clamp-2 mt-1">{msg.message}</p>
                </div>
              ))
            )}
          </div>

          <div className="md:col-span-2 border border-border bg-card p-6 rounded-none space-y-4">
            {selectedMsg ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h3 className="font-heading text-lg font-light text-foreground">{selectedMsg.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedMsg.email} • Persona: <span className="capitalize">{selectedMsg.profile}</span></p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleMarkAsRead(selectedMsg)}
                      variant="outline"
                      className="rounded-none text-xs border-border h-8 gap-1"
                    >
                      <Check className="size-3.5" />
                      {selectedMsg.status === 'read' ? 'Mark Unread' : 'Mark Read'}
                    </Button>
                    <Button
                      onClick={() => handleDeleteMsg(selectedMsg.id)}
                      variant="destructive"
                      className="rounded-none text-xs h-8"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="bg-background border border-border p-4 rounded-none min-h-[150px] text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                  {selectedMsg.message}
                </div>

                <div className="pt-2">
                  <a
                    href={`mailto:${selectedMsg.email}?subject=RE: Edu+ Inquiry`}
                    className="inline-flex items-center gap-1.5 bg-foreground text-background px-4 py-2 text-xs font-medium rounded-none hover:bg-foreground/90 transition-colors"
                  >
                    <Mail className="size-3.5" /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-16 text-center text-xs text-muted-foreground space-y-2">
                <Mail className="size-8 mx-auto opacity-40" />
                <p>Select a contact submission from the list to view details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Newsletter Subscribers View */}
      {activeSubTab === 'subscribers' && (
        <div className="border border-border bg-card rounded-none overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/30 border-b border-border text-muted-foreground font-medium">
              <tr>
                <th className="p-3 pl-4">Subscriber Email</th>
                <th className="p-3">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-muted-foreground">
                    No newsletter subscribers registered yet.
                  </td>
                </tr>
              ) : (
                subscribers.map(sub => (
                  <tr key={sub.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-3 pl-4 font-mono text-foreground">{sub.email}</td>
                    <td className="p-3 text-muted-foreground">
                      {new Date(sub.subscribed_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* AI Chat Logs View */}
      {activeSubTab === 'ai-chats' && (
        <div className="border border-border bg-card rounded-none overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/30 border-b border-border text-muted-foreground font-medium">
              <tr>
                <th className="p-3 pl-4">Conversation ID</th>
                <th className="p-3">Last Active</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {conversations.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-muted-foreground">
                    No AI conversations logged yet.
                  </td>
                </tr>
              ) : (
                conversations.map(conv => (
                  <tr key={conv.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-3 pl-4 font-mono text-foreground">{conv.id}</td>
                    <td className="p-3 text-muted-foreground">
                      {new Date(conv.updated_at).toLocaleString()}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {new Date(conv.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
