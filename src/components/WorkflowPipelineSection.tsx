import React from 'react';
import { Cpu, ArrowRight, Database, Bot, Send, ExternalLink, Workflow } from 'lucide-react';
import { WORKFLOW_PIPELINE_STEPS } from '../data/sampleResumes';

interface WorkflowPipelineSectionProps {
  onOpenWorkflowModal: () => void;
}

export const WorkflowPipelineSection: React.FC<WorkflowPipelineSectionProps> = ({
  onOpenWorkflowModal,
}) => {
  return (
    <section id="pipeline" className="py-20 md:py-28 border-t border-slate-800/80 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-400 uppercase">
              <span>n8n Cloud Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display [text-wrap:balance]">
              How the n8n Resume Analyzer Executes
            </h2>
            <p className="text-base text-slate-300">
              Rohini’s automation pipeline ingests candidate uploads, parses raw binary documents, executes AI evaluation algorithms, and generates structured feedback reports.
            </p>
          </div>

          <button
            onClick={onOpenWorkflowModal}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Workflow className="w-4 h-4 text-rose-400" />
            <span>Inspect Webhook Specifications</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Bento Grid: Steps on Left, Media Asset on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Steps List (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {WORKFLOW_PIPELINE_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono font-bold text-rose-400 mt-1 tabular-nums">
                    {step.step}.
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-base font-bold text-white font-display">
                        {step.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        {step.tech}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Media / Visual Asset Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
              <img
                src="/src/assets/images/resume_ats_analysis_1790759461462.jpg"
                alt="Document layout and parsing analysis"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-[4/3] block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Target Cloud Instance</span>
                  <span className="text-emerald-400 font-mono">rohinitheresa8.app.n8n.cloud</span>
                </div>
                <p className="text-xs text-slate-300">
                  Submissions through this web application trigger production executions within Rohini Theresa's n8n environment with instant JSON confirmation.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
