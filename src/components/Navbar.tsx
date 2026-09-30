import React from 'react';
import { ExternalLink } from 'lucide-react';
import { WorkflowStatus } from '../types';

interface NavbarProps {
  status: WorkflowStatus | null;
  onOpenWorkflowModal: () => void;
  onScrollToAnalyzer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  status,
  onOpenWorkflowModal,
  onScrollToAnalyzer,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="text-xl font-extrabold tracking-tight text-white font-display hover:text-rose-400 transition-colors">
          ResumeIQ
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#analyzer" className="hover:text-white transition-colors">
            Analyzer
          </a>
          <a href="#pipeline" className="hover:text-white transition-colors">
            Automation Pipeline
          </a>
          <a href="#benchmarks" className="hover:text-white transition-colors">
            Role Benchmarks
          </a>
          <a href="#rewrites" className="hover:text-white transition-colors">
            Bullet Rewrites
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenWorkflowModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700/60 rounded-lg transition-colors whitespace-nowrap"
            title="Inspect original n8n workflow"
          >
            <span>n8n Workflow</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={onScrollToAnalyzer}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm hover:shadow-rose-500/20 transition-all whitespace-nowrap cursor-pointer"
          >
            Analyze Resume
          </button>
        </div>
      </div>
    </header>
  );
};
