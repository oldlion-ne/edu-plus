import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGoogleclassroom } from '@icons-pack/react-simple-icons';
import { Book, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';

interface CourseWork {
  id: string;
  title: string;
  courseName: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'late';
  url: string;
}

export function ClassroomWidget() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [assignments, setAssignments] = useState<CourseWork[]>([]);

  const fetchMockClassroomData = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setAssignments([
        {
          id: '1',
          title: 'Essay 2: Global Health Systems',
          courseName: 'Public Health 101',
          dueDate: new Date(Date.now() + 86400000 * 2).toLocaleDateString(), // In 2 days
          status: 'pending',
          url: 'https://classroom.google.com'
        },
        {
          id: '2',
          title: 'Weekly Quiz 4',
          courseName: 'Anatomy Basics',
          dueDate: new Date(Date.now() - 86400000 * 1).toLocaleDateString(), // Yesterday
          status: 'late',
          url: 'https://classroom.google.com'
        },
        {
          id: '3',
          title: 'Case Study Submission',
          courseName: 'Clinical Prep',
          dueDate: new Date(Date.now() + 86400000 * 5).toLocaleDateString(), // In 5 days
          status: 'pending',
          url: 'https://classroom.google.com'
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  // Check if we have a valid provider token for Google Classroom
  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.provider_token) {
        setIsConnected(true);
        fetchMockClassroomData();
      }
    };
    checkAuthStatus();
  }, []);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      // Simulate real OAuth flow for development purposes when GCP isn't configured yet
      // If GCP was configured, we'd uncomment the real Supabase call:
      /*
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly',
          redirectTo: `${window.location.origin}/lms`
        }
      });
      if (error) throw error;
      */
      
      setTimeout(() => {
        setIsConnected(true);
        fetchMockClassroomData();
      }, 1500);

    } catch (error) {
      console.error('Failed to connect Google Classroom', error);
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAssignments([]);
  };

  return (
    <div className="border border-border bg-card shadow-sm rounded-none overflow-hidden relative z-10 w-full h-full flex flex-col">
      {/* Widget Header */}
      <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/10">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-green-600/10 text-green-600 flex items-center justify-center shrink-0">
            <SiGoogleclassroom className="size-5" />
          </div>
          <div>
            <h3 className="font-heading font-medium text-lg text-foreground flex items-center gap-2">
              Google Classroom
              {isConnected && (
                <Badge variant="outline" className="text-[0.65rem] border-green-600/30 text-green-600 bg-green-600/5 px-1.5 py-0 rounded-sm uppercase tracking-wider">Connected</Badge>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">Sync your external coursework and grades</p>
          </div>
        </div>
        
        {isConnected && (
          <Button variant="ghost" size="sm" onClick={handleDisconnect} className="text-xs text-muted-foreground hover:text-destructive shrink-0">
            Disconnect
          </Button>
        )}
      </div>

      {/* Widget Body */}
      <div className="p-6 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {!isConnected ? (
            <motion.div 
              key="unconnected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-10 text-center flex-1"
            >
              <div className="size-16 border border-dashed border-border flex items-center justify-center text-muted-foreground/50 mb-4 rounded-full">
                <SiGoogleclassroom className="size-8" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Connect Your Account</h4>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                Link your Google Classroom to track your university assignments and due dates directly within the EduPlus Learning Hub.
              </p>
              <Button onClick={handleConnect} disabled={isLoading} className="rounded-none bg-green-600 hover:bg-green-700 text-white min-w-[200px]">
                {isLoading ? 'Connecting...' : 'Connect Google Classroom'}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="connected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">Pending Assignments</h4>
                <a href="https://classroom.google.com" target="_blank" rel="noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">
                  Open Classroom <ExternalLink className="size-3" />
                </a>
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse bg-muted/50 h-20 w-full border border-border/50"></div>
                  ))}
                </div>
              ) : assignments.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <CheckCircle2 className="size-10 text-green-500/50 mb-3" />
                  <p className="text-sm">You're all caught up!</p>
                  <p className="text-xs">No pending assignments found.</p>
                </div>
              ) : (
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  {assignments.map(assignment => (
                    <a 
                      key={assignment.id} 
                      href={assignment.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group block p-4 border border-border/50 bg-card hover:bg-muted/20 transition-colors relative"
                    >
                      {assignment.status === 'late' && (
                        <div className="absolute top-0 right-0 w-2 h-full bg-destructive/80"></div>
                      )}
                      {assignment.status === 'pending' && (
                        <div className="absolute top-0 right-0 w-2 h-full bg-primary/80"></div>
                      )}
                      
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 pr-4">
                          <h5 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{assignment.title}</h5>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                            <Book className="size-3" /> {assignment.courseName}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`text-xs font-medium flex items-center gap-1 justify-end ${assignment.status === 'late' ? 'text-destructive' : 'text-foreground'}`}>
                            <Calendar className="size-3" /> {assignment.dueDate}
                          </p>
                          <p className={`text-[0.65rem] uppercase tracking-wider mt-1.5 ${assignment.status === 'late' ? 'text-destructive font-bold' : 'text-muted-foreground'}`}>
                            {assignment.status}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
