import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { CURRICULUM_TRACKS } from '../../data/lmsCurriculumData';
import { knapsack } from '../../lib/algorithms/knapsack';
import { useLmsProgress } from '../../lib/lmsProgressContext';
import type { LmsLesson } from '../../types/lms';

export function StudyScheduler() {
  const { progress } = useLmsProgress();
  const [timeAvailable, setTimeAvailable] = useState<number>(120);
  const [schedule, setSchedule] = useState<LmsLesson[] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Get all uncompleted lessons across all tracks
  const uncompletedLessons = useMemo(() => {
    const lessons: LmsLesson[] = [];
    for (const track of CURRICULUM_TRACKS) {
      for (const module of track.modules) {
        for (const lesson of module.lessons) {
          if (!progress.completedLessonIds.includes(lesson.id)) {
            lessons.push(lesson);
          }
        }
      }
    }
    return lessons;
  }, [progress.completedLessonIds]);

  const handleGenerateSchedule = () => {
    let parsedTime = Math.floor(timeAvailable);
    if (isNaN(parsedTime) || parsedTime <= 0 || uncompletedLessons.length === 0) return;
    
    // Bound capacity to prevent browser crash/exhaustion (max 24 hours / 1440 mins)
    if (parsedTime > 1440) {
      parsedTime = 1440;
      setTimeAvailable(1440);
    }
    
    // Weights: Duration of the lesson
    const weights = uncompletedLessons.map(l => l.durationMinutes);
    
    // Values: Prioritize lessons that unlock others (highest value for prerequisites).
    const prereqCounts: Record<string, number> = {};
    for (const track of CURRICULUM_TRACKS) {
      for (const module of track.modules) {
        for (const l of module.lessons) {
          if (l.prerequisiteLessonIds) {
             for (const p of l.prerequisiteLessonIds) {
                prereqCounts[p] = (prereqCounts[p] || 0) + 1;
             }
          }
        }
      }
    }
    
    const values = uncompletedLessons.map(lesson => {
      const unlocksCount = prereqCounts[lesson.id] || 0;
      return 100 + (unlocksCount * 50);
    });
    
    const result = knapsack(parsedTime, weights, values);
    
    const selectedLessons = result.selectedItems.map(index => uncompletedLessons[index]);
    setSchedule(selectedLessons);
    setDialogOpen(true);
  };

  return (
    <Card className="w-full h-full shadow-none border border-border border-l-4 border-l-ochre-500 rounded-none bg-muted text-foreground">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-ochre-500" />
          <Badge variant="outline" className="border-ochre-500 text-ochre-600 rounded-none font-mono text-xs uppercase">
            AI Study Scheduler
          </Badge>
        </div>
        <CardTitle className="text-xl font-display font-medium tracking-tight">Time-Boxed Learning</CardTitle>
        <CardDescription className="text-muted-foreground">
          Only have a few hours this weekend? Enter your available time, and we'll calculate the optimal set of lessons to maximize your learning using the Knapsack Algorithm.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-end gap-4">
          <div className="space-y-2 flex-1">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Available Time (Minutes)
            </label>
            <Input 
              type="number" 
              value={timeAvailable} 
              onChange={(e) => setTimeAvailable(Number(e.target.value))}
              min={10}
              step={10}
              className="rounded-none font-mono text-lg"
            />
          </div>
          <Button 
            onClick={handleGenerateSchedule} 
            className="rounded-none bg-ochre-600 hover:bg-ochre-700 text-white w-40"
          >
            Generate
          </Button>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="w-full sm:max-w-xl max-h-[85vh] overflow-y-auto rounded-none bg-background text-foreground border-ochre-500 border-l-4 border-t-0 border-r-0 border-b-0 p-8 sm:p-10">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-display font-medium tracking-tight">Your Optimal Schedule</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                A time-boxed selection to maximize your learning.
              </DialogDescription>
            </DialogHeader>
            {schedule && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-muted border border-border rounded-none min-w-0 w-full">
                  <h3 className="font-display font-medium text-lg text-foreground truncate">Schedule Overview</h3>
                  <div className="flex gap-2 shrink-0">
                    <Badge className="rounded-none bg-fjord-100 text-fjord-800 hover:bg-fjord-200">
                      {schedule.length} Lessons
                    </Badge>
                    <Badge className="rounded-none bg-moss-100 text-moss-800 hover:bg-moss-200">
                      {schedule.reduce((acc, l) => acc + l.durationMinutes, 0)} min total
                    </Badge>
                  </div>
                </div>
                
                {schedule.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Not enough time for any uncompleted lessons.</p>
                ) : (
                  <div className="grid gap-3 min-w-0 w-full">
                    {schedule.map(lesson => (
                      <div key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border border-border bg-muted/30 rounded-none shadow-sm min-w-0 w-full">
                        <div className="flex items-center gap-3 min-w-0 w-full">
                          <CheckCircle className="h-5 w-5 text-muted-foreground opacity-50 shrink-0" />
                          <span className="font-medium text-base truncate flex-1">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono bg-background px-3 py-1 border border-border shrink-0 rounded-none text-muted-foreground shadow-sm w-fit sm:w-auto">
                          <Clock className="h-3.5 w-3.5" />
                          {lesson.durationMinutes} min
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
