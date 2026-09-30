import React, { useState } from 'react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  const [activeResumeId, setActiveResumeId] = useState(SAMPLE_RESUMES[0].id);
  const activeResume = SAMPLE_RESUMES.find(r => r.id === activeResumeId) || SAMPLE_RESUMES[0];

  return (
    <section id="rewrites" className="py-20 md:py-28 border-t border-slate-800/80 bg-[#0e1420]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-400 uppercase">
            <span>ATS Impact Optimization</span>
            <span aria-hidden="true">·</span>
            <span>Measurable Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display [text-wrap:balance]">
            Weak Passive Descriptions vs. High-Impact Quantified Bullets
          </h2>
          <p className="text-base text-slate-300">
            Compare how the Resume Analyzer refactors passive task summaries into leadership-oriented accomplishments backed by quantifiable business metrics.
          </p>
        </div>

        {/* Role Tab Selector (Segmented control button style) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 max-w-fit">
          {SAMPLE_RESUMES.map((res) => (
            <button
              key={res.id}
              onClick={() => setActiveResumeId(res.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeResumeId === res.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {res.role}
            </button>
          ))}
        </div>

        {/* Comparison Cards */}
        <div className="space-y-6">
          {activeResume.bulletRewrites.map((rewrite, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#111827] border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              {/* Before Column (Weak) */}
              <div className="md:col-span-5 space-y-2 p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <span className="text-xs font-mono font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Before (Low ATS Impact)
                </span>
                <p className="text-sm text-slate-300 italic">
                  "{rewrite.original}"
                </p>
                <p className="text-[11px] text-slate-500">
                  Lacks specific mechanisms, measurable scope, or leadership verbs.
                </p>
              </div>

              {/* Transformation Indicator */}
              <div className="md:col-span-2 flex justify-center">
                <div className="w-9 h-9 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* After Column (Optimized) */}
              <div className="md:col-span-5 space-y-2 p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  After (Optimized for ATS & Hiring Leaders)
                </span>
                <p className="text-sm font-medium text-white">
                  "{rewrite.improved}"
                </p>
                <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 mt-2">
                  <strong className="text-slate-300">Why it passes:</strong> {rewrite.why}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
