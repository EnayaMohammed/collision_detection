import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { ProjectStatus } from '../types';
import { cn } from '../lib/utils';
import { Language, translations } from '../lib/translations';

interface ProjectWorkflowProps {
  currentStatus: ProjectStatus;
  language: Language;
}

export const ProjectWorkflow: React.FC<ProjectWorkflowProps> = ({ currentStatus, language }) => {
  const t = translations[language];
  const steps: { status: ProjectStatus; label: string; description: string }[] = [
    { status: 'SUBMITTED', label: t.proposal, description: t.initialSubmission },
    { status: 'UNDER_REVIEW', label: t.review, description: t.technicalFeasibility },
    { status: 'COLLISION_CHECK', label: t.collisionDetection, description: t.aiSpatialAnalysis },
    { status: 'APPROVED', label: t.approval, description: t.finalAuthorization },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(s => s.status === currentStatus);
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-8">{t.projectWorkflowPipeline}</h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100">
          <div 
            className="h-full bg-gov-blue transition-all duration-500" 
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isPending = index > currentIndex;

            return (
              <div key={step.status} className="flex flex-col items-center text-center max-w-[120px]">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 border-white transition-all",
                  isCompleted ? "bg-gov-blue text-white" : 
                  isCurrent ? "bg-white border-gov-blue text-gov-blue" : 
                  "bg-slate-100 text-slate-400"
                )}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
                   isCurrent ? <Clock className="w-5 h-5 animate-pulse" /> : 
                   <Circle className="w-5 h-5" />}
                </div>
                <div className="mt-4">
                  <p className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    isCurrent ? "text-gov-blue" : "text-slate-500"
                  )}>
                    {step.label}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {currentStatus === 'COLLISION_CHECK' && (
        <div className="mt-10 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-900">{t.collisionAlertDetected}</h4>
            <p className="text-xs text-red-700 mt-1">
              {t.collisionAlertDesc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
