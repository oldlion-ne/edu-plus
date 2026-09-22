import { lazy, Suspense, useState, useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from './components/ui/sonner';
import SplashLoader from './components/SplashLoader';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import CookieConsentBanner from './components/CookieConsentBanner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { LmsProgressProvider } from './lib/lmsProgressContext';
import { PublicLayout } from './layouts/PublicLayout';
import { LearnerLayout } from './layouts/LearnerLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy-load all page components — each is only downloaded when its route is visited.
// Dashboard (with Recharts) is never loaded until the user navigates to /dashboard.
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const SignatureExperiences = lazy(() => import('./pages/SignatureExperiences'));
const Council = lazy(() => import('./pages/Council'));
const Guidance = lazy(() => import('./pages/Guidance'));
const News = lazy(() => import('./pages/News'));
const Contact = lazy(() => import('./pages/Contact'));
const Connect = lazy(() => import('./pages/Connect'));
const KnowledgeHub = lazy(() => import('./pages/KnowledgeHub'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Legal = lazy(() => import('./pages/Legal'));
const LmsHub = lazy(() => import('./pages/LmsHub'));
const LmsTrackDetail = lazy(() => import('./pages/LmsTrackDetail'));
const LmsLessonPlayer = lazy(() => import('./pages/LmsLessonPlayer'));
const LmsQuiz = lazy(() => import('./pages/LmsQuiz'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SentryExample = lazy(() => import('./pages/SentryExample'));

// Minimal inline fallback — renders instantly, no layout shift
const PageLoader = () => (
  <div className="min-h-dvh bg-background flex items-center justify-center">
    <div className="w-8 h-1 bg-primary" />
  </div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasConsent, setHasConsent] = useState(() => document.cookie.includes('eduplus_cookie_consent=true'));

  const handleConsentChange = useCallback((granted: boolean) => {
    setHasConsent(granted);
  }, []);

  useEffect(() => {
    let mounted = true;
    const hide = () => mounted && setShowSplash(false);
    
    // Dismiss the splash screen shortly after React finishes mounting the initial DOM.
    // This allows FCP/LCP to fire immediately without waiting for heavy network assets.
    const loadTimer = setTimeout(hide, 150);

    return () => {
      mounted = false;
      clearTimeout(loadTimer);
    };
  }, []);

  const sharedGlobals = (
    <>
      <CookieConsentBanner onConsentChange={handleConsentChange} />
      <Toaster position="top-right" richColors closeButton />
      {hasConsent && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
      <AnimatePresence>
        {showSplash && <SplashLoader key="splash" />}
      </AnimatePresence>
    </>
  );

  return (
    <AuthProvider>
      <LmsProgressProvider>
        <MotionConfig reducedMotion="user">
          {sharedGlobals}
          <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* ADMIN LAYOUT */}
              <Route element={<AdminLayout />}>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* LEARNER LAYOUT (No nav/footer for immersive learning) */}
              <Route element={<ProtectedRoute><LearnerLayout /></ProtectedRoute>}>
                <Route path="/lms/learn/:trackId/:lessonId" element={<LmsLessonPlayer />} />
                <Route path="/lms/quiz/:trackId/:moduleId" element={<LmsQuiz />} />
              </Route>

              {/* PUBLIC LAYOUT (Nav, footer, agent) */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/events" element={<SignatureExperiences />} />
                <Route path="/council" element={<Council />} />
                <Route path="/guidance" element={<Guidance />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:slug" element={<News />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/connect" element={<Connect />} />
                <Route path="/knowledge-hub" element={<KnowledgeHub />} />
                <Route path="/lms" element={<ProtectedRoute><LmsHub /></ProtectedRoute>} />
                <Route path="/lms/tracks/:trackId" element={<ProtectedRoute><LmsTrackDetail /></ProtectedRoute>} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/sentry-example-page" element={<SentryExample />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* AUTH LAYOUT (No nav/footer) */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </Suspense>
          </ErrorBoundary>
        </MotionConfig>
      </LmsProgressProvider>
    </AuthProvider>
  );
}

export default App;

