import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, Cookie } from 'lucide-react';


type LegalTab = 'terms' | 'privacy' | 'cookies';

export default function Legal() {

  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<LegalTab>('terms');

  // Sync active tab with URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '') as LegalTab;
    if (['terms', 'privacy', 'cookies'].includes(hash)) {
      setActiveTab(hash);
    } else {
      // Default to terms if no hash or invalid hash
      navigate('/legal#terms', { replace: true });
    }
  }, [location.hash, navigate]);

  const handleTabChange = (tab: LegalTab) => {
    navigate(`/legal#${tab}`);
  };

  const tabs = [
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
  ] as const;

  return (
    <div className="min-h-[100dvh] bg-background pt-32 pb-24 px-6 md:px-12 font-sans selection:bg-primary/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 border-b border-border pb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground tracking-tight">
            Trust & Legal Center
          </h1>
          <p className="mt-4 font-mono text-xs text-muted-foreground uppercase tracking-widest">
            EduPlus Transparency & Compliance Platform
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2 relative">
            {/* Architectural decorative line */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-border hidden md:block" />
            
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative w-full flex items-center gap-3 px-6 py-4 text-left transition-all duration-300 rounded-none border border-transparent focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer ${
                    isActive 
                      ? 'bg-primary/5 text-primary border-r-border border-y-border' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/50 hover:border-border'
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"
                    />
                  )}
                  <Icon className="size-4 shrink-0" />
                  <span className="font-sans font-medium text-sm tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Content Area */}
          <main className="flex-1 w-full min-w-0 bg-card/30 border border-border p-8 md:p-12 relative overflow-hidden">
            {/* Geometric Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -translate-y-1/2 translate-x-1/2 rotate-45 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="prose prose-invert max-w-none font-sans"
              >
                {activeTab === 'terms' && (
                  <div className="space-y-8">
                    <div className="border-l-2 border-primary pl-4 mb-8">
                      <h2 className="font-heading text-2xl text-foreground m-0">Terms of Service</h2>
                      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-2 m-0">Effective Date: October 01, 2026</p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Welcome to the EduPlus platform. By accessing or using our educational network, services, and associated applications (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
                    </p>
                    
                    <h3 className="font-heading text-lg text-foreground mt-8">1. User Account Responsibilities</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      You are responsible for safeguarding the password and credentials that you use to access the Services and for any activities or actions under your account. EduPlus cannot and will not be liable for any loss or damage arising from your failure to comply with the aforementioned requirements.
                    </p>

                    <h3 className="font-heading text-lg text-foreground mt-8">2. Intellectual Property Rights</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      The Services and their original content, features, functionalities, and educational materials are and will remain the exclusive property of EduPlus and its licensors. The Services are protected by copyright, trademark, and other laws of both the local jurisdiction and foreign countries.
                    </p>

                    <div className="p-6 border border-border bg-background mt-8">
                      <p className="font-mono text-xs text-foreground uppercase tracking-wider mb-2">Legal Disclaimer</p>
                      <p className="text-muted-foreground text-[11px] leading-relaxed m-0">
                        The materials on EduPlus's website are provided on an 'as is' basis. EduPlus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-8">
                    <div className="border-l-2 border-primary pl-4 mb-8">
                      <h2 className="font-heading text-2xl text-foreground m-0">Privacy Policy</h2>
                      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-2 m-0">Effective Date: October 01, 2026</p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      At EduPlus, we take your privacy seriously. This Privacy Policy outlines the types of personal information that is received and collected by our platform and how it is utilized to enhance your educational experience.
                    </p>

                    <h3 className="font-heading text-lg text-foreground mt-8">Data Collection & Telemetry</h3>
                    <ul className="space-y-3 text-muted-foreground text-sm list-none p-0">
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-1">■</span>
                        <span><strong>Account Information:</strong> When you register, we collect your name, email address, and role designation.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-1">■</span>
                        <span><strong>Usage Data:</strong> We monitor interactions with the platform to optimize performance and educational material delivery.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-1">■</span>
                        <span><strong>Communications:</strong> Records of inquiries sent through our support channels are maintained for quality assurance.</span>
                      </li>
                    </ul>

                    <h3 className="font-heading text-lg text-foreground mt-8">Data Protection Mechanisms</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. All sensitive data is transmitted via Secure Socket Layer (SSL) technology and encrypted into our database architecture to only be accessed by authorized personnel.
                    </p>
                  </div>
                )}

                {activeTab === 'cookies' && (
                  <div className="space-y-8">
                    <div className="border-l-2 border-primary pl-4 mb-8">
                      <h2 className="font-heading text-2xl text-foreground m-0">Cookie Policy</h2>
                      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-2 m-0">Effective Date: October 01, 2026</p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
                    </p>

                    <h3 className="font-heading text-lg text-foreground mt-8">Essential Operational Cookies</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      We use strictly necessary cookies to authenticate users, prevent fraudulent use of login credentials, and maintain session state as you navigate through the platform. Disabling these cookies will result in core functionalities of the EduPlus platform becoming unavailable.
                    </p>

                    <h3 className="font-heading text-lg text-foreground mt-8">Analytics & Performance</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      We utilize analytics cookies to compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. These cookies collect information anonymously and report website trends without identifying individual visitors.
                    </p>
                    
                    <div className="mt-8 p-5 bg-background border border-border border-l-2 border-l-primary flex flex-col gap-2">
                      <span className="font-mono text-xs uppercase tracking-wider text-foreground">Manage Preferences</span>
                      <p className="text-[11px] text-muted-foreground">
                        You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies via your browser settings.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
}
