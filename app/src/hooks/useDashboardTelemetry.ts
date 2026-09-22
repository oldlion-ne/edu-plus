import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';

export function useDashboardTelemetry() {
  const [knowledgeHubItems, setKnowledgeHubItems] = useState<any[]>([]);
  const [kbDocuments, setKbDocuments] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const fetchData = async () => {
    try {
      const [hubRes, kbRes, contactRes] = await Promise.all([
        supabase.from('knowledge_hub').select('*').order('created_at', { ascending: false }),
        supabase.from('kb_documents').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
      ]);

      const hub = hubRes.data;
      const kb = kbRes.data;
      const contact = contactRes.data;

      setKnowledgeHubItems(hub || []);
      setKbDocuments(kb || []);
      setContactMessages(contact || []);

      const unread = contact?.filter((m: any) => m.status === 'unread').length || 0;
      setUnreadMessagesCount(unread);
    } catch (err) {
      console.error('Error fetching dashboard telemetry:', err);
    }
  };

  useEffect(() => {
    fetchData();

    // Subscribe to real-time additions to contact_messages
    const channel = supabase
      .channel('realtime-messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'contact_messages' },
        (payload) => {
          const newMsg = payload.new;
          setContactMessages((prev) => [newMsg, ...prev]);
          setUnreadMessagesCount((c) => c + 1);

          // Trigger Sonar notification alert
          toast(`New Inquiry Received`, {
            description: `Sender: ${newMsg.name} (${newMsg.profile})`,
            style: {
              background: 'oklch(var(--card))',
              border: '1px solid oklch(var(--primary)/0.3)',
              color: 'oklch(var(--foreground))',
              fontFamily: 'monospace',
              borderRadius: '0px',
            },
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);



  return {
    knowledgeHubItems,
    kbDocuments,
    contactMessages,
    unreadMessagesCount,
    setUnreadMessagesCount,
    setContactMessages
  };
}
