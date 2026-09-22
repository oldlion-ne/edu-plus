export type CurriculumCategory =
  | 'career_exploration'
  | 'human_capabilities'
  | 'industry_mentorship'
  | 'global_admissions'
  | 'placement_careers'
  | 'stem_pedagogy';

export interface LmsQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly options: readonly string[];
  readonly correctIndex: number;
  readonly explanation: string;
}

export interface LmsQuiz {
  readonly id: string;
  readonly moduleId: string;
  readonly title: string;
  readonly description: string;
  readonly passingPercentage: number;
  readonly questions: readonly LmsQuestion[];
}

export interface LmsResource {
  readonly title: string;
  readonly type: 'document' | 'worksheet' | 'link' | 'code';
  readonly url?: string;
  readonly description?: string;
}

export interface LmsLesson {
  readonly id: string;
  readonly moduleId: string;
  readonly title: string;
  readonly durationMinutes: number;
  readonly type: 'video' | 'reading' | 'interactive' | 'workshop';
  readonly summary: string;
  readonly videoEmbedId?: string; // YouTube 11-char ID
  readonly videoUrl?: string; // Direct HTML5 video URL
  readonly contentMarkdown: string;
  readonly keyTakeaways: readonly string[];
  readonly practicalExercise?: string;
  readonly resources?: readonly LmsResource[];
  readonly prerequisiteLessonIds?: readonly string[];
}

export interface LmsModule {
  readonly id: string;
  readonly trackId: string;
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly estimatedHours: number;
  readonly lessons: readonly LmsLesson[];
  readonly quiz?: LmsQuiz;
}

export interface CouncilAdvisorLink {
  readonly name: string;
  readonly title: string;
  readonly affiliation: string;
  readonly portraitFilename: string;
}

export interface CurriculumTrack {
  readonly id: string;
  readonly code: string;
  readonly category: CurriculumCategory;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly targetAudience: string;
  readonly estimatedWeeks: number;
  readonly totalHours: number;
  readonly level: 'Foundational' | 'Intermediate' | 'Advanced' | 'Professional';
  readonly councilLead: CouncilAdvisorLink;
  readonly modules: readonly LmsModule[];
  readonly learningOutcomes: readonly string[];
  readonly prerequisites: readonly string[];
  readonly certificationTitle: string;
}

export interface QuizAttempt {
  readonly score: number;
  readonly total: number;
  readonly passed: boolean;
  readonly percentage: number;
  readonly completedAt: string;
}

export interface LearnerProgress {
  readonly enrolledTrackIds: string[];
  readonly completedLessonIds: string[];
  readonly quizAttempts: Record<string, QuizAttempt>; // key: moduleId
  readonly lastActiveLesson: { trackId: string; lessonId: string } | null;
}

export interface CertificateData {
  readonly certificateId: string;
  readonly recipientName: string;
  readonly trackTitle: string;
  readonly trackCode: string;
  readonly completionDate: string;
  readonly verifiedAdvisor: string;
  readonly verifiedAdvisorTitle: string;
  readonly honorsScore?: number;
}
