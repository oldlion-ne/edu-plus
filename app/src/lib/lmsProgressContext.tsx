import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import type { LearnerProgress, QuizAttempt, CurriculumTrack } from '../types/lms';
import { CURRICULUM_TRACKS } from '../data/lmsCurriculumData';

const STORAGE_KEY = 'eduplus_lms_progress';

const DEFAULT_PROGRESS: LearnerProgress = {
  enrolledTrackIds: ['futurepath-navigator'],
  completedLessonIds: [],
  quizAttempts: {},
  lastActiveLesson: { trackId: 'futurepath-navigator', lessonId: 'fp-les-101' },
};

interface LmsContextType {
  readonly progress: LearnerProgress;
  readonly enrollTrack: (trackId: string) => void;
  readonly isEnrolled: (trackId: string) => boolean;
  readonly toggleLessonCompletion: (lessonId: string) => void;
  readonly markLessonCompleted: (lessonId: string) => void;
  readonly isLessonCompleted: (lessonId: string) => boolean;
  readonly recordQuizAttempt: (moduleId: string, attempt: QuizAttempt) => void;
  readonly getQuizAttempt: (moduleId: string) => QuizAttempt | undefined;
  readonly setLastActive: (trackId: string, lessonId: string) => void;
  readonly getTrackProgress: (trackId: string) => {
    readonly completedLessons: number;
    readonly totalLessons: number;
    readonly percentage: number;
    readonly isCompleted: boolean;
  };
  readonly getOverallStats: () => {
    readonly totalEnrolled: number;
    readonly totalCompletedLessons: number;
    readonly certificatesEarned: number;
  };
  readonly resetProgress: () => void;
}

const LmsProgressContext = createContext<LmsContextType | null>(null);

export const LmsProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<LearnerProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          enrolledTrackIds: Array.isArray(parsed.enrolledTrackIds) ? parsed.enrolledTrackIds : DEFAULT_PROGRESS.enrolledTrackIds,
          completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : [],
          quizAttempts: parsed.quizAttempts || {},
          lastActiveLesson: parsed.lastActiveLesson || DEFAULT_PROGRESS.lastActiveLesson,
        };
      }
    } catch {
      // ignore parse error
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage might be restricted
    }
  }, [progress]);

  const enrollTrack = (trackId: string) => {
    setProgress((prev) => {
      if (prev.enrolledTrackIds.includes(trackId)) return prev;
      return {
        ...prev,
        enrolledTrackIds: [...prev.enrolledTrackIds, trackId],
      };
    });
  };

  const isEnrolled = (trackId: string) => progress.enrolledTrackIds.includes(trackId);

  const toggleLessonCompletion = (lessonId: string) => {
    setProgress((prev) => {
      const exists = prev.completedLessonIds.includes(lessonId);
      return {
        ...prev,
        completedLessonIds: exists
          ? prev.completedLessonIds.filter((id) => id !== lessonId)
          : [...prev.completedLessonIds, lessonId],
      };
    });
  };

  const markLessonCompleted = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
      };
    });
  };

  const isLessonCompleted = (lessonId: string) => progress.completedLessonIds.includes(lessonId);

  const recordQuizAttempt = (moduleId: string, attempt: QuizAttempt) => {
    setProgress((prev) => ({
      ...prev,
      quizAttempts: {
        ...prev.quizAttempts,
        [moduleId]: attempt,
      },
    }));
  };

  const getQuizAttempt = (moduleId: string) => progress.quizAttempts[moduleId];

  const setLastActive = (trackId: string, lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      lastActiveLesson: { trackId, lessonId },
    }));
  };

  const getTrackProgress = useMemo(
    () => (trackId: string) => {
      const track = CURRICULUM_TRACKS.find((t: CurriculumTrack) => t.id === trackId);
      if (!track) {
        return { completedLessons: 0, totalLessons: 0, percentage: 0, isCompleted: false };
      }
      const allLessons = track.modules.flatMap((m) => m.lessons);
      const totalLessons = allLessons.length;
      if (totalLessons === 0) {
        return { completedLessons: 0, totalLessons: 0, percentage: 100, isCompleted: true };
      }
      const completedLessons = allLessons.filter((l) =>
        progress.completedLessonIds.includes(l.id),
      ).length;
      const percentage = Math.round((completedLessons / totalLessons) * 100);
      return {
        completedLessons,
        totalLessons,
        percentage,
        isCompleted: percentage === 100,
      };
    },
    [progress.completedLessonIds],
  );

  const getOverallStats = useCallback(
    () => {
      const totalEnrolled = progress.enrolledTrackIds.length;
      const totalCompletedLessons = progress.completedLessonIds.length;

      // Certificate earned if all lessons in an enrolled track are completed
      let certificatesEarned = 0;
      for (const trackId of progress.enrolledTrackIds) {
        const { isCompleted } = getTrackProgress(trackId);
        if (isCompleted) certificatesEarned++;
      }

      return { totalEnrolled, totalCompletedLessons, certificatesEarned };
    },
    [progress.enrolledTrackIds, progress.completedLessonIds.length, getTrackProgress],
  );

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  const value = {
    progress,
    enrollTrack,
    isEnrolled,
    toggleLessonCompletion,
    markLessonCompleted,
    isLessonCompleted,
    recordQuizAttempt,
    getQuizAttempt,
    setLastActive,
    getTrackProgress,
    getOverallStats,
    resetProgress,
  };

  return (
    <LmsProgressContext.Provider value={value}>
      {children}
    </LmsProgressContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useLmsProgress(): LmsContextType {
  const context = useContext(LmsProgressContext);
  if (!context) {
    throw new Error('useLmsProgress must be used within an LmsProgressProvider');
  }
  return context;
}
