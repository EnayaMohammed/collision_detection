import React from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Language, translations } from '../lib/translations';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: string;
  language: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, role, language }) => {
  const t = translations[language];
  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'map', label: t.map, icon: MapIcon },
    { id: 'projects', label: t.projects, icon: FileText },
    { id: 'analytics', label: t.analytics, icon: BarChart3 },
  ];

  if (role === 'ADMIN') {
    menuItems.push({ id: 'users', label: t.users, icon: Users });
  }

  return (
    <div className="w-64 bg-gov-blue text-white h-screen flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="bg-white p-1.5 rounded-lg">
          <ShieldCheck className="w-6 h-6 text-gov-blue" />
        </div>
        <div>
          <h1 className="font-bold text-sm leading-tight">{t.appName}</h1>
          <p className="text-[10px] text-white/60 uppercase tracking-widest">{t.tagline}</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
              activeTab === item.id 
                ? "bg-white/10 text-white shadow-sm" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5">
          <Settings className="w-4 h-4" />
          {t.settings}
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10">
          <LogOut className="w-4 h-4" />
          {t.logout}
        </button>
      </div>
    </div>
  );
};
