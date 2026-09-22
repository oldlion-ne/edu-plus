import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Clock, BookOpen, Target, Sparkles } from 'lucide-react';
import { CURRICULUM_TRACKS } from '../data/lmsCurriculumData';
import { CurriculumGraph } from '../lib/curriculumGraph';


export function LearningPathOptimizer() {
  const [startLessonId, setStartLessonId] = useState<string>('');
  const [goalLessonId, setGoalLessonId] = useState<string>('');
  const [pathResult, setPathResult] = useState<{ pathIds: string[], totalMinutes: number, isFallback: boolean } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Memoize graph initialization so it only happens once
  const graph = useMemo(() => new CurriculumGraph(CURRICULUM_TRACKS), []);

  const handleOptimize = () => {
    if (!startLessonId || !goalLessonId) return;
    
    const result = graph.findClosestRelatedPath(startLessonId, goalLessonId);
    setPathResult(result);
    setDialogOpen(true);
  };

  return (
    <Card className="w-full h-full max-w-4xl mx-auto shadow-none border border-border border-t-4 border-t-ochre-500 rounded-none bg-muted text-foreground">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-ochre-500" />
          <Badge variant="outline" className="border-ochre-500 text-ochre-600 rounded-none font-mono text-xs uppercase">
            AI Pathfinder
          </Badge>
        </div>
        <CardTitle className="text-2xl font-display font-medium tracking-tight">Personalized Learning Optimizer</CardTitle>
        <CardDescription className="text-muted-foreground text-base leading-relaxed">
          Select your current knowledge level and your ultimate career goal. Our graph algorithm will map out the fastest optimal sequence of lessons to get you there.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 min-w-0">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Start Point
            </label>
            <Select value={startLessonId} onValueChange={setStartLessonId}>
              <SelectTrigger className="w-full rounded-none [&>span]:truncate [&>span]:text-left">
                <SelectValue placeholder="Where are you now?" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {graph.nodes.map((node) => (
                  <SelectItem key={node.lessonId} value={node.lessonId} className="rounded-none">
                    {node.lesson.title} ({node.lesson.durationMinutes}m)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 min-w-0">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" /> Destination Goal
            </label>
            <Select value={goalLessonId} onValueChange={setGoalLessonId}>
              <SelectTrigger className="w-full rounded-none [&>span]:truncate [&>span]:text-left">
                <SelectValue placeholder="Where do you want to be?" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {graph.nodes.map((node) => (
                  <SelectItem key={`goal-${node.lessonId}`} value={node.lessonId} className="rounded-none">
                    {node.lesson.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleOptimize} 
          disabled={!startLessonId || !goalLessonId}
          className="w-full rounded-none h-12 bg-ochre-600 hover:bg-ochre-700 text-white font-medium text-lg transition-colors"
        >
          Calculate Fastest Path
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="w-full sm:max-w-4xl max-h-[85vh] overflow-y-auto rounded-none bg-background text-foreground border-ochre-500 border-t-4 border-l-0 border-r-0 border-b-0 p-8 sm:p-10">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-display font-medium tracking-tight">Optimal Path Generated</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Review your personalized sequence of lessons.
              </DialogDescription>
            </DialogHeader>

            {pathResult && (
              <div className="space-y-6">
                {pathResult.pathIds.length === 0 ? (
                  <div className="text-center p-6 bg-clay-50 dark:bg-clay-900/20 text-clay-700 dark:text-clay-300 border border-clay-200 dark:border-clay-800 rounded-none">
                    <p className="font-medium">No valid path found.</p>
                    <p className="text-sm opacity-80 mt-1">Please ensure your destination is logically achievable from your start point.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pathResult.isFallback && (
                      <div className="p-4 bg-fjord-50 dark:bg-fjord-900/20 border-l-4 border-fjord-500 text-fjord-900 dark:text-fjord-100 rounded-none">
                        <p className="font-medium flex items-center gap-2">
                          <Sparkles className="h-4 w-4" /> Alternate Route Suggested
                        </p>
                        <p className="text-sm opacity-80 mt-1">
                          No direct path exists between your selections. We've mapped the closest foundational prerequisite path to get you closer to your goal.
                        </p>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-muted border border-border rounded-none">
                      <h3 className="font-display font-medium text-lg text-foreground">Curriculum Overview</h3>
                      <div className="flex items-center gap-2 text-muted-foreground font-mono bg-background px-3 py-1 border border-border rounded-none">
                        <Clock className="h-4 w-4" />
                        <span>Total Time: <strong>{Math.floor(pathResult.totalMinutes / 60)}h {pathResult.totalMinutes % 60}m</strong></span>
                      </div>
                    </div>

                    {/* Horizontal Visual Graph */}
                    <div className="flex flex-wrap items-center gap-2 py-4">
                      {pathResult.pathIds.map((id, index) => {
                        const isEnd = index === pathResult.pathIds.length - 1;
                        return (
                          <div key={`hz-${id}`} className="flex items-center gap-2">
                            <div className="px-3 py-2 border-2 border-border bg-background rounded-none text-xs font-medium uppercase tracking-wider max-w-[150px] truncate shadow-sm">
                              {graph.getNode(graph.getIndex(id)).lesson.title}
                            </div>
                            {!isEnd && <div className="h-0.5 w-6 bg-border rounded-none" />}
                          </div>
                        );
                      })}
                    </div>

                    <div className="relative border-l-2 border-ochre-200 dark:border-ochre-900/50 ml-4 space-y-6 pb-4 pt-4 min-w-0 w-full">
                      {pathResult.pathIds.map((id, index) => {
                        const node = graph.getNode(graph.getIndex(id));
                        const isStart = index === 0;
                        const isEnd = index === pathResult.pathIds.length - 1;
                        
                        return (
                          <div key={`vt-${id}`} className="relative pl-8 min-w-0 w-full">
                            <div className={`absolute -left-[9px] top-6 h-4 w-4 rounded-none border-2 bg-background ${isStart || isEnd ? 'border-ochre-500' : 'border-border'}`} />
                            <div className="bg-muted/30 border border-border p-5 rounded-none space-y-3 min-w-0 w-full shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 border-b border-border/50 pb-3 min-w-0 w-full">
                                <h4 className={`font-medium truncate ${isStart || isEnd ? 'text-ochre-600 dark:text-ochre-400 font-semibold text-lg' : 'text-foreground text-base'}`}>
                                  {node.lesson.title}
                                </h4>
                                <span className="text-xs font-mono bg-background px-3 py-1 border border-border shrink-0 rounded-none shadow-sm text-muted-foreground w-fit">
                                  {node.lesson.durationMinutes} min
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {node.lesson.summary}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
