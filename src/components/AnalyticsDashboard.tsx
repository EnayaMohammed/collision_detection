import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { AlertTriangle, CheckCircle2, Clock, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { Language, translations } from '../lib/translations';

interface AnalyticsDashboardProps {
  language: Language;
}

const COLORS = ['#003366', '#2E7D32', '#F27D26', '#141414'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ language }) => {
  const t = translations[language];

  const data = [
    { name: t.sectors.roads, count: 12 },
    { name: t.sectors.sub_station, count: 8 },
    { name: t.sectors.telecom, count: 15 },
    { name: t.sectors.electric_power, count: 6 },
  ];

  return (
    <div className="space-y-6 p-6 overflow-y-auto h-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: t.totalProjects, value: '41', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: t.collisionsDetected, value: '12', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: t.underReview, value: '15', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: t.approved, value: '14', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.live}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">{t.projectsByType}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#003366" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">{t.collisionSeverity}</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: t.high, value: 4 },
                    { name: t.medium, value: 5 },
                    { name: t.low, value: 3 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">{t.infrastructureCoverage}</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { month: 'Jan', coverage: 65 },
              { month: 'Feb', coverage: 68 },
              { month: 'Mar', coverage: 72 },
              { month: 'Apr', coverage: 75 },
              { month: 'May', coverage: 82 },
              { month: 'Jun', coverage: 85 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip />
              <Line type="monotone" dataKey="coverage" stroke="#2E7D32" strokeWidth={3} dot={{ r: 4, fill: '#2E7D32' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
