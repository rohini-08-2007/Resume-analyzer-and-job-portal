import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { WorkflowStatus } from '../types';

interface HeroSectionProps {
  status: WorkflowStatus | null;
  onScrollToAnalyzer: () => void;
  onSelectSample: (sampleId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  status,
  onScrollToAnalyzer,
  onSelectSample,
}) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background subtle light accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-rose-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Proposition & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Zero-Pill Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                Live n8n Automation
              </span>
              <span aria-hidden="true">·</span>
              <span>Workflow by Rohini Theresa</span>
              <span aria-hidden="true">·</span>
              <span>ATS Benchmark Engine</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display [text-wrap:balance]">
              Transform your resume into high-impact interviews.
            </h1>

            {/* Descriptive Body Copy (anti-buzzwords) */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Upload your resume to Rohini’s automated n8n pipeline. Our engine extracts document semantics, checks ATS keyword alignment, scores quantifiable career impact, and routes actionable recommendations straight to your inbox.
            </p>

            {/* Primary Action Zone */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onScrollToAnalyzer}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-lg shadow-rose-900/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Upload & Evaluate Resume</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Or test with a sample:</span>
                <button
                  onClick={() => onSelectSample('dev-alex')}
                  className="text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Software Eng
                </button>
                <span>·</span>
                <button
                  onClick={() => onSelectSample('pm-sarah')}
                  className="text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Product Mgr
                </button>
              </div>
            </div>

            {/* Trust Markers & Adjacency */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">98.4%</p>
                <p className="text-xs text-slate-400 mt-0.5">ATS parser detectability</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">&lt; 3.5s</p>
                <p className="text-xs text-slate-400 mt-0.5">Webhook execution speed</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">Automated workflow receipt</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900 shadow-2xl">
              <img
                src="/src/assets/images/hero_resume_workspace_1790759450895.jpg"
                alt="Resume analysis and modern workspace setup"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-[4/3] block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent opacity-80" />
              
              {/* Overlay card previewing live status */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-left">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-mono">n8n Cloud Webhook Node</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {status?.status === 'online' ? 'Active' : 'Connected'}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white truncate">
                  rohinitheresa8.app.n8n.cloud/form/...
                </p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Multipart payload ready for Name, Email & Resume upload</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
