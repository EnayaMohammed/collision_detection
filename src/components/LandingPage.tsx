import React from 'react';
import { ShieldCheck, ArrowRight, Map as MapIcon, Zap, Database, Users, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { Language, translations } from '../lib/translations';

interface LandingPageProps {
  onLoginClick: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, language, setLanguage }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="bg-gov-blue p-1.5 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gov-blue text-lg leading-tight">{t.appName}</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{t.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">
            <Globe className="w-4 h-4 text-slate-400 ml-1" />
            {(['en', 'am', 'om'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  "px-2 py-1 text-[10px] font-bold rounded transition-all",
                  language === lang ? "bg-gov-blue text-white" : "text-slate-500 hover:bg-slate-200"
                )}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-gov-blue">Features</a>
          <button 
            onClick={onLoginClick}
            className="bg-gov-blue text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-900 transition-colors"
          >
            {t.signIn}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-gov-blue text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3" />
              AI-Powered Infrastructure Planning
            </div>
            <h2 className="text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
              {t.heroTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={onLoginClick}
                className="bg-gov-blue text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/20"
              >
                {t.getStarted}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                {t.viewPublicMap}
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gov-blue/5 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden aspect-video">
              <img 
                src="https://picsum.photos/seed/ethiopia/1200/800" 
                alt="Ethiopia Infrastructure" 
                className="w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gov-blue/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gov-green/20 flex items-center justify-center">
                    <MapIcon className="w-6 h-6 text-gov-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Live GIS Dashboard</h4>
                    <p className="text-sm text-slate-500">Real-time monitoring of 40+ active projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">{t.featuresTitle}</h3>
            <p className="text-slate-600">{t.featuresSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: t.collisionDetection, 
                desc: t.collisionDesc,
                icon: ShieldCheck,
                color: 'bg-blue-500'
              },
              { 
                title: t.aiGapAnalysis, 
                desc: t.gapDesc,
                icon: Database,
                color: 'bg-green-500'
              },
              { 
                title: t.multiAgencySync, 
                desc: t.agencyDesc,
                icon: Users,
                color: 'bg-orange-500'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", feature.color)}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <ShieldCheck className="w-6 h-6 text-gov-blue" />
            <span className="font-bold text-gov-blue">{t.appName}</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 Federal Democratic Republic of Ethiopia. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
