import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { CalendarDays, MapPin } from 'lucide-react';
import { loadPublishedEvents, type PublishedEvent } from '../../lib/content/public-content';
import { useAuth } from '../../lib/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export function UpcomingEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<PublishedEvent[]>([]);
  const [result, setResult] = useState<Record<string, string>>({});
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    loadPublishedEvents().then(setEvents).catch((error) => {
      console.error('Unable to load published events:', error);
    });
  }, []);

  const register = async (eventId: string) => {
    setPendingId(eventId);
    const { data, error } = await supabase.rpc('register_for_event', { target_event_id: eventId });
    setResult((current) => ({
      ...current,
      [eventId]: error
        ? 'Registration could not be completed.'
        : data === 'waitlisted' ? 'You joined the waitlist.' : 'Your place is confirmed.',
    }));
    setPendingId(null);
  };

  if (events.length === 0) return null;

  return (
    <section className="mb-20 border-y border-border py-12">
      <div className="mb-8 max-w-2xl">
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-primary">Live calendar</span>
        <h2 className="mt-2 font-heading text-3xl font-semibold">Upcoming events</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Published events appear here automatically. Members can reserve a place or join the waitlist.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col justify-between border border-border bg-card/40 p-6">
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <Badge variant="secondary" className="rounded-none">{event.registration_open ? 'Registration open' : 'Registration closed'}</Badge>
                {event.capacity !== null && <span className="font-sans text-[9px] text-muted-foreground">Capacity {event.capacity}</span>}
              </div>
              <h3 className="font-heading text-xl font-semibold">{event.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{event.description}</p>
              <div className="mt-5 space-y-2 border-t border-border pt-4 font-sans text-[10px] text-muted-foreground">
                <div className="flex items-center gap-2"><CalendarDays className="size-3 text-primary" />{new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(event.starts_at))}</div>
                <div className="flex items-center gap-2"><MapPin className="size-3 text-primary" />{event.location || 'Online'}</div>
              </div>
            </div>
            <div className="mt-6">
              {user ? (
                <Button
                  type="button"
                  disabled={!event.registration_open || pendingId === event.id}
                  onClick={() => register(event.id)}
                  className="w-full"
                >
                  {pendingId === event.id ? 'Reserving...' : 'Reserve a place'}
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full"><Link to="/auth/sign-in" /* ui-ignore */>Sign in to register</Link></Button>
              )}
              {result[event.id] && <p role="status" className="mt-3 text-xs text-primary">{result[event.id]}</p>}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
