import type { CurriculumTrack, LmsLesson } from '../types/lms';

export interface GraphNode {
  index: number;
  lessonId: string;
  lesson: LmsLesson;
}

export class CurriculumGraph {
  public nodes: GraphNode[] = [];
  public adjacencyList: [number, number][][] = [];
  private lessonIdToIndex: Record<string, number> = {};

  constructor(tracks: readonly CurriculumTrack[]) {
    this.buildGraph(tracks);
  }

  private buildGraph(tracks: readonly CurriculumTrack[]) {
    // 1. Collect all lessons and assign numeric indices
    let currentIndex = 0;
    for (const track of tracks) {
      for (const module of track.modules) {
        for (const lesson of module.lessons) {
          this.nodes.push({
            index: currentIndex,
            lessonId: lesson.id,
            lesson: lesson,
          });
          this.lessonIdToIndex[lesson.id] = currentIndex;
          currentIndex++;
        }
      }
    }

    // Initialize adjacency list
    this.adjacencyList = Array.from({ length: this.nodes.length }, () => []);

    // 2. Build edges based on prerequisiteLessonIds and natural module sequence
    for (const track of tracks) {
      for (const module of track.modules) {
        for (let i = 0; i < module.lessons.length; i++) {
          const currentLesson = module.lessons[i];
          const currentIndex = this.lessonIdToIndex[currentLesson.id];

          // Add edge to the next lesson in the same module if it exists and no explicit prerequisites override it
          // Wait, if a lesson has explicit prerequisites, maybe we should just use those.
          // But to make a connected graph, let's just add the explicit ones. 
          // If a lesson B requires A, then there's an edge from A to B.
          if (currentLesson.prerequisiteLessonIds && currentLesson.prerequisiteLessonIds.length > 0) {
            for (const prereqId of currentLesson.prerequisiteLessonIds) {
              const prereqIndex = this.lessonIdToIndex[prereqId];
              if (prereqIndex !== undefined) {
                // Edge from Prereq -> Current
                // Weight is the duration of the current lesson
                this.adjacencyList[prereqIndex].push([currentIndex, currentLesson.durationMinutes]);
              }
            }
          } else if (i > 0) {
            // Implicit prerequisite: the previous lesson in the same module
            const prevLesson = module.lessons[i - 1];
            const prevIndex = this.lessonIdToIndex[prevLesson.id];
            this.adjacencyList[prevIndex].push([currentIndex, currentLesson.durationMinutes]);
          }
        }
        
        // Also connect the last lesson of module N to the first lesson of module N+1
        // to form a continuous track.
        const moduleIndex = track.modules.indexOf(module);
        if (moduleIndex < track.modules.length - 1) {
          const nextModule = track.modules[moduleIndex + 1];
          if (module.lessons.length > 0 && nextModule.lessons.length > 0) {
             const lastLessonOfCurrent = module.lessons[module.lessons.length - 1];
             const firstLessonOfNext = nextModule.lessons[0];
             
             // Only add implicit edge if firstLessonOfNext doesn't have explicit prereqs
             if (!firstLessonOfNext.prerequisiteLessonIds || firstLessonOfNext.prerequisiteLessonIds.length === 0) {
                const u = this.lessonIdToIndex[lastLessonOfCurrent.id];
                const v = this.lessonIdToIndex[firstLessonOfNext.id];
                this.adjacencyList[u].push([v, firstLessonOfNext.durationMinutes]);
             }
          }
        }
      }
    }
  }

  public getIndex(lessonId: string): number {
    return this.lessonIdToIndex[lessonId];
  }

  public getNode(index: number): GraphNode {
    return this.nodes[index];
  }
}
