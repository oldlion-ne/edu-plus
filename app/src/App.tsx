import { lazy, Suspense, useState, useRef, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChatAgent from './components/AIChatAgent';
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ScrollContext } from './lib/ScrollContext';

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
const KnowledgeHub = lazy(() => import('./pages/KnowledgeHub'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));

// Minimal inline fallback — renders instantly, no layout shift
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-1 bg-primary animate-pulse" />
  </div>
);

function App() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isLogin = location.pathname === '/login';
  
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  const handleScrollRef = (node: HTMLDivElement | null) => {
    scrollContainerRef.current = node;
    setScrollEl(node);
  };

  // Measure the scroll container's scrollbar width and expose it as a CSS
  // variable on <html> so the fixed navbar can subtract it from its width.
  // Using overflow-y-scroll guarantees the scrollbar is always rendered, so
  // offsetWidth - clientWidth is reliable at mount time without any rAF tricks.
  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.offsetWidth - el.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${w}px`);
    };

    measure();

    roRef.current = new ResizeObserver(measure);
    roRef.current.observe(el);

    return () => {
      roRef.current?.disconnect();
      document.documentElement.style.removeProperty('--scrollbar-width');
    };
  }, [scrollEl]); // re-run once the ref is populated


  const showChatAgent = !isDashboard && !isLogin;
  const showPublicNav = !isDashboard;
  const showPublicFooter = !isDashboard;

  if (isDashboard) {
    return (
      <AuthProvider>
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
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <ScrollContext.Provider value={{ scrollContainerRef }}>
        <div className="relative h-[100dvh] w-full bg-background flex flex-col overflow-hidden [touch-action:none]">
          {showChatAgent && <AIChatAgent />}
          {showPublicNav && <Navigation />}
          <div 
            ref={handleScrollRef}
            id="main-scroll-container"
            className="flex-1 overflow-y-scroll flex flex-col justify-between min-h-0 [touch-action:pan-y_manipulation] relative [scrollbar-gutter:stable]"
          >
            <main className="flex-grow">
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
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/knowledge-hub" element={<KnowledgeHub />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                )}
              </Suspense>
            </main>
            {showPublicFooter && <Footer />}
          </div>
        </div>
      </ScrollContext.Provider>
    </AuthProvider>
  );
}

export default App;

