import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { GISMap } from './components/GISMap';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ProjectWorkflow } from './components/ProjectWorkflow';
import { MOCK_PROJECTS } from './mockData';
import { UserRole, Project } from './types';
import { Language, translations } from './lib/translations';
import { projectService } from './lib/projectService';
import { 
  Bell, 
  Search, 
  Plus, 
  Filter, 
  Download,
  AlertTriangle,
  MapPin,
  Calendar,
  Building2,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { cn, formatStatus } from './lib/utils';

export default function App() {
  const [view, setView] = useState<'LANDING' | 'LOGIN' | 'DASHBOARD'>('LANDING');
  const [role, setRole] = useState<UserRole>('ORGANIZATION');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await projectService.getProjects();
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (view === 'DASHBOARD') {
      fetchProjects();
    }
  }, [view]);

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView('DASHBOARD');
  };

  if (view === 'LANDING') {
    return (
      <LandingPage 
        onLoginClick={() => setView('LOGIN')} 
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  if (view === 'LOGIN') {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gov-gray overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={role} 
        language={language}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gov-blue/10 focus:border-gov-blue transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Language Toggle in Topbar */}
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

            <button className="relative p-2 text-slate-400 hover:text-gov-blue transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">Abebe Bikila</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gov-blue text-white flex items-center justify-center font-bold shadow-md">
                AB
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'dashboard' && (
            <div className="flex-1 flex overflow-hidden">
              {/* Main Map Area */}
              <div className="flex-1 relative">
                <GISMap 
                  projects={projects} 
                  selectedProject={selectedProject}
                  onProjectSelect={setSelectedProject}
                  language={language}
                />
                
                {/* Floating Controls */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-[1000]">
                  <button className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 hover:bg-slate-50 transition-all">
                    <Plus className="w-5 h-5 text-gov-blue" />
                  </button>
                  <button className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 hover:bg-slate-50 transition-all">
                    <Filter className="w-5 h-5 text-slate-600" />
                  </button>
                  <button className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 hover:bg-slate-50 transition-all">
                    <Download className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Right Detail Panel */}
              <aside className="w-96 bg-white border-l border-slate-200 overflow-y-auto flex flex-col shrink-0">
                {selectedProject ? (
                  <div className="p-6 space-y-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-blue-50 text-gov-blue text-[10px] font-bold uppercase tracking-wider mb-2">
                          {t.sectors[selectedProject.type]}
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 leading-tight">{selectedProject.title}</h2>
                      </div>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span>{selectedProject.organization}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>Addis Ababa, Ethiopia</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{t.submitted} {new Date(selectedProject.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.description}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <ProjectWorkflow currentStatus={selectedProject.status} language={language} />

                    {selectedProject.hasCollision && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                        <div className="flex items-center gap-2 text-red-600 mb-2">
                          <AlertTriangle className="w-4 h-4" />
                          <h4 className="text-xs font-bold uppercase tracking-wider">{t.collisionDetails}</h4>
                        </div>
                        <p className="text-sm text-red-700">
                          {selectedProject.collisionDetails}
                        </p>
                        <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors">
                          {t.initiateResolution}
                        </button>
                      </div>
                    )}

                    <div className="pt-6 border-t border-slate-100 flex gap-3">
                      <button className="flex-1 bg-gov-blue text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-900 transition-colors">
                        {t.approve}
                      </button>
                      <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                        {t.reject}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <MapPin className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{t.noProjectSelected}</h3>
                    <p className="text-sm text-slate-500 mt-2">
                      {t.noProjectSubtitle}
                    </p>
                  </div>
                )}
              </aside>
            </div>
          )}

          {activeTab === 'analytics' && <AnalyticsDashboard language={language} />}
          
          {activeTab === 'projects' && (
             <div className="p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">{t.projectRegistry}</h2>
                  <button className="bg-gov-blue text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    {t.newSubmission}
                  </button>
                </div>
                
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.projectName}</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.agency}</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.type}</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.status}</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.aiAlert}</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => { setActiveTab('dashboard'); setSelectedProject(project); }}>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900">{project.title}</p>
                            <p className="text-xs text-slate-500">ID: {project.id}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{project.organization}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                              {t.sectors[project.type]}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                              project.status === 'APPROVED' ? "bg-green-100 text-green-700" :
                              project.status === 'REJECTED' ? "bg-red-100 text-red-700" :
                              "bg-amber-100 text-amber-700"
                            )}>
                              {formatStatus(project.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {project.hasCollision ? (
                              <div className="flex items-center gap-1.5 text-red-600 font-bold text-[10px] uppercase">
                                <AlertTriangle className="w-3 h-3" />
                                {t.collision}
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-green-600 font-bold text-[10px] uppercase">
                                <ShieldCheck className="w-3 h-3" />
                                {t.clear}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-gov-blue font-bold text-xs hover:underline">{t.details}</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
