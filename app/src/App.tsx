import { lazy, Suspense, useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChatAgent from './components/AIChatAgent';
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ScrollContext } from './lib/ScrollContext';
import { Toaster } from './components/ui/sonner';
import SplashLoader from './components/SplashLoader';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import CookieConsentBanner from './components/CookieConsentBanner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

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

// Minimal inline fallback — renders instantly, no layout shift
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-1 bg-primary" />
  </div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasConsent, setHasConsent] = useState(() => document.cookie.includes('eduplus_cookie_consent=true'));

  useEffect(() => {
    // Check periodically for cookie consent if not already granted
    if (!hasConsent) {
      const timer = setInterval(() => {
        if (document.cookie.includes('eduplus_cookie_consent=true')) {
          setHasConsent(true);
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hasConsent]);

  useEffect(() => {
    let mounted = true;
    const hide = () => mounted && setShowSplash(false);
    
    // Safety fallback timeout
    const fallbackTimer = setTimeout(hide, 2000);
    let loadTimer: number | NodeJS.Timeout;

    const handleLoad = () => {
      loadTimer = setTimeout(hide, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
      clearTimeout(loadTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isLogin = location.pathname === '/login';
  
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null);

  const handleScrollRef = (node: HTMLDivElement | null) => {
    scrollContainerRef.current = node;
    setScrollEl(node);
  };


  const showChatAgent = !isDashboard && !isLogin;
  const showPublicNav = !isDashboard;
  const showPublicFooter = !isDashboard;

  if (isDashboard) {
    return (
      <AuthProvider>
        <MotionConfig reducedMotion="user">
          <CookieConsentBanner />
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
          <div className="relative h-[100dvh] w-full bg-background overflow-hidden [touch-action:none]">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </div>
        </MotionConfig>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <MotionConfig reducedMotion="user">
        <CookieConsentBanner />
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
        <ScrollContext.Provider value={{ scrollContainerRef }}>
          <div className="relative h-[100dvh] w-full bg-background flex flex-col overflow-hidden [touch-action:none]">
            {showChatAgent && <AIChatAgent />}
            <div 
              ref={handleScrollRef}
              id="main-scroll-container"
              className="flex-1 overflow-y-scroll min-h-0 [touch-action:pan-y_manipulation] relative [scrollbar-gutter:stable]"
            >
              <div className="flex flex-col min-h-full">
                {showPublicNav && <Navigation />}
                <main className="flex-1 flex flex-col">
                  <Suspense fallback={<PageLoader />}>
                    <ScrollToTop />
                    {scrollEl && (
                      <Routes>
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
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/legal" element={<Legal />} />
                      </Routes>
                    )}
                  </Suspense>
                </main>
                {showPublicFooter && <Footer />}
              </div>
            </div>
          </div>
        </ScrollContext.Provider>
      </MotionConfig>
    </AuthProvider>
  );
}

export default App;

