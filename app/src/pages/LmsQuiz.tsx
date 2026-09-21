import { useMemo, useState } from 'react';
import { shuffleArray } from '../lib/algorithms/shuffle_array';
import { useParams, Link } from 'react-router';
import { CURRICULUM_TRACKS } from '../data/lmsCurriculumData';
import { useLmsProgress } from '../lib/lmsProgressContext';
import { CertificateModal } from '../components/lms/CertificateModal';
import { Button } from '../components/ui/button';
import type { CertificateData, LmsQuiz, LmsQuestion } from '../types/lms';
import {
 ChevronLeft,
 CheckCircle2,
 XCircle,
 HelpCircle,
 Award,
 ArrowRight,
 RotateCcw,
 Sparkles,
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function LmsQuiz() {
 const { trackId, moduleId } = useParams<{ trackId: string; moduleId: string }>();
 const { recordQuizAttempt, getTrackProgress } = useLmsProgress();

 const track = useMemo(
 () => CURRICULUM_TRACKS.find((t) => t.id === trackId) || CURRICULUM_TRACKS[0],
 [trackId],
 );

 const module = useMemo(
 () => track.modules.find((m) => m.id === moduleId) || track.modules[0],
 [track, moduleId],
 );

 const quiz: LmsQuiz | undefined = module?.quiz;

 // Quiz state
 const [currentIndex, setCurrentIndex] = useState(0);
 const [selectedOption, setSelectedOption] = useState<number | null>(null);
 const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
 const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
 const [isFinished, setIsFinished] = useState(false);
 const [showCertificate, setShowCertificate] = useState(false);

  // Randomize questions and options on mount or retry
  const [randomizedQuestions, setRandomizedQuestions] = useState<LmsQuestion[]>([]);
  
  useMemo(() => {
    if (quiz?.questions) {
      // 1. Shuffle the questions array
      let shuffledQ = shuffleArray([...quiz.questions]);
      
      // 2. For each question, shuffle its options and track the new correctIndex
      shuffledQ = shuffledQ.map(q => {
        // Map options to objects tracking their original index
        const optionsWithOriginalIndex = q.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
        
        // Shuffle the options
        const shuffledOptions = shuffleArray(optionsWithOriginalIndex);
        
        // Find where the original correct index ended up
        const newCorrectIndex = shuffledOptions.findIndex(opt => opt.originalIndex === q.correctIndex);
        
        return {
          ...q,
          options: shuffledOptions.map(opt => opt.text),
          correctIndex: newCorrectIndex
        };
      });
      setRandomizedQuestions(shuffledQ);
    }
  }, [quiz]);

  const questions = randomizedQuestions;
  const currentQuestion = randomizedQuestions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted || !currentQuestion) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQuestion.correctIndex) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

 const handleNextQuestion = () => {
 if (currentIndex < questions.length - 1) {
 setCurrentIndex((prev) => prev + 1);
 setSelectedOption(null);
 setIsAnswerSubmitted(false);
 } else {
 // Finished
 const finalScore = correctAnswersCount;
 const total = questions.length;
 const percentage = Math.round((finalScore / total) * 100);
 const passed = percentage >= (quiz?.passingPercentage || 70);

 recordQuizAttempt(module.id, {
 score: finalScore,
 total,
 percentage,
 passed,
 completedAt: new Date().toISOString(),
 });

 setIsFinished(true);
 }
 };

 const handleRetry = () => {
 setCurrentIndex(0);
 setSelectedOption(null);
 setIsAnswerSubmitted(false);
 setCorrectAnswersCount(0);
 setIsFinished(false);
 };

 const certificateData: CertificateData = {
 // eslint-disable-next-line react-hooks/purity
 certificateId: `EDU-CERT-${track.code}-${Math.floor(100000 + Math.random() * 900000)}`,
 recipientName: 'Verified EduPlus Candidate',
 trackTitle: track.title,
 trackCode: track.code,
 completionDate: new Date().toLocaleDateString('en-US', {
 month: 'long',
 day: 'numeric',
 year: 'numeric',
 }),
 verifiedAdvisor: track.councilLead.name,
 verifiedAdvisorTitle: track.councilLead.title,
 };

 if (!quiz) {
 return (
 <div className="flex-1 flex items-center justify-center p-8">
 <div className="border border-border bg-card p-8 max-w-md text-center">
 <HelpCircle className="size-8 text-muted-foreground mx-auto mb-3" />
 <h2 className="text-lg font-heading font-medium text-foreground">
 No Quiz Found for This Module
 </h2>
 <p className="text-xs text-muted-foreground mt-1 mb-6">
 This module consists of practical reading and video lectures.
 </p>
 <Button asChild className="rounded-none text-xs">
 <Link to={`/lms/tracks/${track.id}`}>Back to Curriculum</Link>
 </Button>
 </div>
 </div>
 );
 }

 const percentage = Math.round((correctAnswersCount / questions.length) * 100);
 const passed = percentage >= quiz.passingPercentage;
 const { isCompleted: isTrackCompleted } = getTrackProgress(track.id);

 return (
 <div className="flex-1 w-full flex flex-col h-[100dvh] overflow-hidden">
 <div className="max-w-2xl mx-auto space-y-6">
 {/* Top Breadcrumb */}
 <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
 <Link to={`/lms/tracks/${track.id}`} className="hover:text-foreground flex items-center gap-1">
 <ChevronLeft className="size-3.5" />
 {track.code}
 </Link>
 <span>/</span>
 <span className="text-foreground">Module {module.order} Assessment</span>
 </div>

 {/* ── Quiz Finish View ── */}
 {isFinished ? (
 <div className="border border-border bg-card p-6 sm:p-10 text-center space-y-6">
 <div
 className={cn(
 'size-16 mx-auto border flex items-center justify-center',
 passed
 ? 'border-[#22C55E]/40 bg-[#22C55E]/10 text-[#22C55E]'
 : 'border-destructive/40 bg-destructive/10 text-destructive',
 )}
 >
 {passed ? (
 <Award className="size-8" />
 ) : (
 <XCircle className="size-8" />
 )}
 </div>

 <div>
 <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
 ASSESSMENT RESULTS // MODULE {module.order}
 </span>
 <h1 className="text-2xl font-heading font-medium text-foreground">
 {passed ? 'Competency Verified!' : 'Assessment Incomplete'}
 </h1>
 <p className="text-xs text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed">
 {passed
 ? 'Congratulations! You have demonstrated mastery of the core concepts in this curriculum module.'
 : `You scored ${percentage}%. The passing threshold is ${quiz.passingPercentage}%. Please review the module lessons and attempt the assessment again.`}
 </p>
 </div>

 {/* Score Metric Card */}
 <div className="border border-border bg-background p-4 grid grid-cols-2 gap-4 max-w-xs mx-auto text-center font-mono">
 <div>
 <span className="text-xs text-muted-foreground block">YOUR SCORE</span>
 <span className="text-2xl font-semibold text-foreground mt-0.5 block">
 {percentage}%
 </span>
 </div>
 <div className="border-l border-border pl-4">
 <span className="text-xs text-muted-foreground block">PASS MARK</span>
 <span className="text-2xl font-semibold text-primary mt-0.5 block">
 {quiz.passingPercentage}%
 </span>
 </div>
 </div>

 <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-border">
 {passed && isTrackCompleted ? (
 <>
 <Button
 onClick={() => setShowCertificate(true)}
 className="rounded-none text-xs h-9 px-5 gap-1.5 w-full sm:w-auto"
 >
 <Award className="size-3.5" />
 View Certificate
 </Button>
 <Button
 asChild
 variant="outline"
 className="rounded-none text-xs h-9 px-5 w-full sm:w-auto"
 >
 <Link to={`/lms/tracks/${track.id}`}>Continue Track</Link>
 </Button>
 </>
 ) : (
 <>
 <Button
 onClick={handleRetry}
 className="rounded-none text-xs h-9 px-5 gap-1.5 w-full sm:w-auto"
 >
 <RotateCcw className="size-3.5" />
 Retry Assessment
 </Button>
 <Button
 asChild
 variant="outline"
 className="rounded-none text-xs h-9 px-5 w-full sm:w-auto"
 >
 <Link to={`/lms/tracks/${track.id}`}>Review Lessons</Link>
 </Button>
 </>
 )}
 </div>
 </div>
 ) : (
 /* ── Question Card View ── */
 <div className="border border-border bg-card p-6 sm:p-8 space-y-6">
 {/* Header / Stepper Progress */}
 <div>
 <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
 <span>
 QUESTION {currentIndex + 1} OF {questions.length}
 </span>
 <span>PASSING SCORE: {quiz.passingPercentage}%</span>
 </div>
 <div className="w-full bg-muted h-1 overflow-hidden rounded-none">
 <div
 className="bg-primary h-full transition-all duration-300"
 style={{
 width: `${((currentIndex + 1) / questions.length) * 100}%`,
 }}
 />
 </div>
 </div>

 {/* Question Prompt */}
 <h2 className="text-lg sm:text-xl font-heading font-medium text-foreground leading-snug">
 {currentQuestion.prompt}
 </h2>

 {/* Options List */}
 <div className="space-y-2.5">
 {currentQuestion.options.map((option, index) => {
 const isSelected = selectedOption === index;
 const isCorrect = currentQuestion.correctIndex === index;

 let optionStyles =
 'border border-border bg-background hover:bg-muted/30 text-muted-foreground';

 if (isSelected && !isAnswerSubmitted) {
 optionStyles =
 'border-primary bg-primary/10 text-foreground font-medium';
 } else if (isAnswerSubmitted) {
 if (isCorrect) {
 optionStyles =
 'border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E] font-medium';
 } else if (isSelected && !isCorrect) {
 optionStyles =
 'border-destructive bg-destructive/10 text-destructive font-medium';
 } else {
 optionStyles = 'border-border/50 opacity-40 text-muted-foreground';
 }
 }

 return (
 <button
 key={index}
 onClick={() => handleSelectOption(index)}
 disabled={isAnswerSubmitted}
 className={cn(
 'w-full text-left p-3.5 text-xs sm:text-sm flex items-start gap-3 transition-colors cursor-pointer disabled:cursor-default',
 optionStyles,
 )}
 >
 <span className="font-mono text-xs font-semibold uppercase shrink-0 size-5 border border-current flex items-center justify-center">
 {String.fromCharCode(65 + index)}
 </span>
 <span className="flex-1 leading-snug">{option}</span>
 </button>
 );
 })}
 </div>

 {/* Educational Explanation Box after submission */}
 {isAnswerSubmitted && (
 <div
 className={cn(
 'border p-4 text-xs leading-relaxed space-y-1',
 selectedOption === currentQuestion.correctIndex
 ? 'border-[#22C55E]/40 bg-[#22C55E]/5 text-foreground'
 : 'border-destructive/40 bg-destructive/5 text-foreground',
 )}
 >
 <div className="font-semibold font-mono text-[0.65rem] uppercase tracking-wider flex items-center gap-1.5">
 {selectedOption === currentQuestion.correctIndex ? (
 <>
 <CheckCircle2 className="size-3.5 text-[#22C55E]" />
 <span className="text-[#22C55E]">CORRECT ANALYSIS</span>
 </>
 ) : (
 <>
 <XCircle className="size-3.5 text-destructive" />
 <span className="text-destructive">RATIONALE FOR REVIEW</span>
 </>
 )}
 </div>
 <p className="text-muted-foreground mt-1">{currentQuestion.explanation}</p>
 </div>
 )}

 {/* Action Buttons */}
 <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
 {!isAnswerSubmitted ? (
 <Button
 onClick={handleSubmitAnswer}
 disabled={selectedOption === null}
 className="rounded-none text-xs h-9 px-5"
 >
 Confirm Answer
 </Button>
 ) : (
 <Button
 onClick={handleNextQuestion}
 className="rounded-none text-xs h-9 px-5 gap-1.5"
 >
 {currentIndex < questions.length - 1 ? (
 <>
 Next Question
 <ArrowRight className="size-3.5" />
 </>
 ) : (
 <>
 View Final Score
 <Sparkles className="size-3.5" />
 </>
 )}
 </Button>
 )}
 </div>
 </div>
 )}
 </div>

 {/* Certificate Modal on Passing */}
 {showCertificate && (
 <CertificateModal
 isOpen={showCertificate}
 onClose={() => setShowCertificate(false)}
 certificate={certificateData}
 />
 )}
 </div>
 );
}
