import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { CURRICULUM_TRACKS } from '../../data/lmsCurriculumData';
import { knapsack } from '../../lib/algorithms/knapsack';
import { useLmsProgress } from '../../lib/lmsProgressContext';
import type { LmsLesson } from '../../types/lms';

export function StudyScheduler() {
  const { progress } = useLmsProgress();
  const [timeAvailable, setTimeAvailable] = useState<number>(120);
  const [schedule, setSchedule] = useState<LmsLesson[] | null>(null);
  
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
    
    // Values: We give higher priority to earlier lessons (index-based) or just uniform value.
    // To encourage finishing many short lessons or high-value lessons, we'll assign value = 100
    // so the knapsack algorithm maximizes the number of lessons fitted.
    const values = uncompletedLessons.map(() => 100);
    
    const result = knapsack(parsedTime, weights, values);
    
    const selectedLessons = result.selectedItems.map(index => uncompletedLessons[index]);
    setSchedule(selectedLessons);
  };

  return (
    <Card className="w-full shadow-sm border-l-4 border-l-ochre-500 rounded-none bg-paper dark:bg-charcoal text-ink dark:text-paper">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-ochre-500" />
          <Badge variant="outline" className="border-ochre-500 text-ochre-600 rounded-none font-mono text-xs uppercase">
            AI Study Scheduler
          </Badge>
        </div>
        <CardTitle className="text-xl font-display font-medium tracking-tight">Time-Boxed Learning</CardTitle>
        <CardDescription className="text-ink/60 dark:text-paper/60">
          Only have a few hours this weekend? Enter your available time, and we'll calculate the optimal set of lessons to maximize your learning using the Knapsack Algorithm.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-end gap-4">
          <div className="space-y-2 flex-1">
            <label className="text-sm font-semibold uppercase tracking-wider text-ink/70 dark:text-paper/70">
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

        {schedule && (
          <div className="mt-6 border-t border-ink/10 dark:border-paper/10 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">Your Optimal Schedule</h3>
              <div className="flex gap-2">
                <Badge className="rounded-none bg-fjord-100 text-fjord-800 hover:bg-fjord-200">
                  {schedule.length} Lessons
                </Badge>
                <Badge className="rounded-none bg-moss-100 text-moss-800 hover:bg-moss-200">
                  {schedule.reduce((acc, l) => acc + l.durationMinutes, 0)} min total
                </Badge>
              </div>
            </div>
            
            {schedule.length === 0 ? (
              <p className="text-sm text-ink/60">Not enough time for any uncompleted lessons.</p>
            ) : (
              <div className="grid gap-3">
                {schedule.map(lesson => (
                  <div key={lesson.id} className="flex items-center justify-between p-3 border border-ink/10 bg-black/5 dark:bg-white/5">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-ink/40" />
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-mono text-ink/60">
                      <Clock className="h-3 w-3" />
                      {lesson.durationMinutes}m
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
