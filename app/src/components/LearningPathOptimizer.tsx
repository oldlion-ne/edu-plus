import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, BookOpen, Target, Sparkles } from 'lucide-react';
import { CURRICULUM_TRACKS } from '../data/lmsCurriculumData';
import { CurriculumGraph } from '../lib/curriculumGraph';
import { dijkstra, reconstructPath } from '../lib/algorithms/dijkstra';

export function LearningPathOptimizer() {
  const [startLessonId, setStartLessonId] = useState<string>('');
  const [goalLessonId, setGoalLessonId] = useState<string>('');
  const [pathResult, setPathResult] = useState<{ pathIds: string[], totalMinutes: number } | null>(null);

  // Memoize graph initialization so it only happens once
  const graph = useMemo(() => new CurriculumGraph(CURRICULUM_TRACKS), []);

  const handleOptimize = () => {
    if (!startLessonId || !goalLessonId) return;

    const startIndex = graph.getIndex(startLessonId);
    const goalIndex = graph.getIndex(goalLessonId);

    if (startIndex === undefined || goalIndex === undefined) return;

    // Run Dijkstra
    const result = dijkstra(graph.adjacencyList, startIndex);
    
    // Reconstruct Path
    const nodeIndices = reconstructPath(startIndex, goalIndex, result.previous);
    
    if (nodeIndices.length === 0 && startIndex !== goalIndex) {
      setPathResult({ pathIds: [], totalMinutes: Infinity }); // No path found
      return;
    }

    const pathIds = nodeIndices.map(idx => graph.getNode(idx).lessonId);
    
    // For a single node path
    if (pathIds.length === 0 && startIndex === goalIndex) {
        pathIds.push(startLessonId);
    }
    
    const totalMinutes = result.distances[goalIndex];
    setPathResult({ pathIds, totalMinutes });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-sm border-t-4 border-t-ochre-500 rounded-none bg-paper dark:bg-charcoal text-ink dark:text-paper">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-ochre-500" />
          <Badge variant="outline" className="border-ochre-500 text-ochre-600 rounded-none font-mono text-xs uppercase">
            AI Pathfinder
          </Badge>
        </div>
        <CardTitle className="text-2xl font-display font-medium tracking-tight">Personalized Learning Optimizer</CardTitle>
        <CardDescription className="text-ink/60 dark:text-paper/60 text-base leading-relaxed">
          Select your current knowledge level and your ultimate career goal. Our graph algorithm will map out the fastest optimal sequence of lessons to get you there.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold uppercase tracking-wider text-ink/70 dark:text-paper/70 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Start Point
            </label>
            <Select value={startLessonId} onValueChange={setStartLessonId}>
              <SelectTrigger className="w-full rounded-none">
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

          <div className="space-y-3">
            <label className="text-sm font-semibold uppercase tracking-wider text-ink/70 dark:text-paper/70 flex items-center gap-2">
              <Target className="h-4 w-4" /> Destination Goal
            </label>
            <Select value={goalLessonId} onValueChange={setGoalLessonId}>
              <SelectTrigger className="w-full rounded-none">
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

        {pathResult && (
          <div className="mt-8 pt-8 border-t border-ink/10 dark:border-paper/10">
            {pathResult.totalMinutes === Infinity ? (
              <div className="text-center p-6 bg-clay-50 dark:bg-clay-900/20 text-clay-700 dark:text-clay-300 border border-clay-200 dark:border-clay-800">
                <p className="font-medium">No valid path found.</p>
                <p className="text-sm opacity-80 mt-1">Please ensure your destination is logically achievable from your start point.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-fjord-50 dark:bg-fjord-900/20 border border-fjord-200 dark:border-fjord-800">
                  <h3 className="font-display font-medium text-lg text-fjord-900 dark:text-fjord-100">Optimal Path Generated</h3>
                  <div className="flex items-center gap-2 text-fjord-700 dark:text-fjord-300 font-mono">
                    <Clock className="h-4 w-4" />
                    <span>Total Time: <strong>{Math.floor(pathResult.totalMinutes / 60)}h {pathResult.totalMinutes % 60}m</strong></span>
                  </div>
                </div>

                <div className="relative border-l-2 border-ochre-200 dark:border-ochre-900/50 ml-4 space-y-8 pb-4">
                  {pathResult.pathIds.map((id, index) => {
                    const node = graph.getNode(graph.getIndex(id));
                    const isStart = index === 0;
                    const isEnd = index === pathResult.pathIds.length - 1;
                    
                    return (
                      <div key={id} className="relative pl-6">
                        <div className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-none border-2 bg-paper dark:bg-charcoal ${isStart || isEnd ? 'border-ochre-500' : 'border-ink/30 dark:border-paper/30'}`} />
                        <div className="space-y-1">
                          <div className="flex items-baseline justify-between gap-4">
                            <h4 className={`font-medium ${isStart || isEnd ? 'text-ochre-600 dark:text-ochre-400 font-semibold' : 'text-ink dark:text-paper'}`}>
                              {node.lesson.title}
                            </h4>
                            <span className="text-xs font-mono text-ink/50 dark:text-paper/50 shrink-0">
                              {node.lesson.durationMinutes} min
                            </span>
                          </div>
                          <p className="text-sm text-ink/70 dark:text-paper/70 leading-relaxed">
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
      </CardContent>
    </Card>
  );
}
