import React from 'react';
import { TARGET_ROLES } from '../data/sampleResumes';
import { ArrowUpRight } from 'lucide-react';

interface RoleBenchmarksSectionProps {
  onSelectRole: (roleId: string) => void;
}

export const RoleBenchmarksSection: React.FC<RoleBenchmarksSectionProps> = ({
  onSelectRole,
}) => {
  return (
    <section id="benchmarks" className="py-20 md:py-28 border-t border-slate-800/80 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-400 uppercase">
            <span>ATS Vocabulary Benchmarks</span>
            <span aria-hidden="true">·</span>
            <span>2026 Hiring Trends</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display [text-wrap:balance]">
            Key ATS Keywords by Professional Specialization
          </h2>
          <p className="text-base text-slate-300">
            Automated screening algorithms scan your resume for precise domain terminology. Here are the priority keywords analyzed across tier-1 tech roles.
          </p>
        </div>

        {/* 2x2 Grid of Roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TARGET_ROLES.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-2xl bg-[#111827] border border-slate-800 hover:border-slate-700 transition-colors space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-display">
                  {role.label}
                </h3>
                <button
                  onClick={() => onSelectRole(role.id)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  <span>Evaluate this role</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 mb-2">Priority Search Keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {role.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-md"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
