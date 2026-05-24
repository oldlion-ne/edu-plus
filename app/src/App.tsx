import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChatAgent from './components/AIChatAgent';
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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

  const showChatAgent = !isDashboard && !isLogin;
  const showPublicNav = !isDashboard;
  const showPublicFooter = !isDashboard;

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-background flex flex-col justify-between overflow-x-hidden">
        <ScrollToTop />
        {showChatAgent && <AIChatAgent />}
        {showPublicNav && <Navigation />}
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
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
        </main>
        {showPublicFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;

