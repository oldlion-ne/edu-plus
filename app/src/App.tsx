import { Routes, Route, useLocation } from 'react-router';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChatAgent from './components/AIChatAgent';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import SignatureExperiences from './pages/SignatureExperiences';
import Council from './pages/Council';
import Guidance from './pages/Guidance';
import News from './pages/News';
import Contact from './pages/Contact';
import KnowledgeHub from './pages/KnowledgeHub';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
        </main>
        {showPublicFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;

