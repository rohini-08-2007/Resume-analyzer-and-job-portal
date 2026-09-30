import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onOpenWorkflowModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWorkflowModal }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#090d14] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Wordmark */}
          <div className="space-y-1 text-center md:text-left">
            <a href="#" className="text-lg font-bold text-white font-display tracking-tight">
              ResumeIQ
            </a>
            <p className="text-slate-500">
              Automated Resume Evaluation & ATS Ingestion powered by n8n.
            </p>
          </div>

          {/* Navigation Mirrors */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <a href="#analyzer" className="hover:text-white transition-colors">Analyzer</a>
            <a href="#pipeline" className="hover:text-white transition-colors">Automation Pipeline</a>
            <a href="#benchmarks" className="hover:text-white transition-colors">Role Benchmarks</a>
            <a href="#rewrites" className="hover:text-white transition-colors">Bullet Rewrites</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <button
              onClick={onOpenWorkflowModal}
              className="hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>n8n Endpoint</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} ResumeIQ. Based on the n8n Resume Analyzer workflow by Rohini Theresa.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://rohinitheresa8.app.n8n.cloud/form/0175728e-20ec-4262-bb5c-ba2ca6e16c4c"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Original n8n Form
            </a>
            <span>·</span>
            <span>n8n Cloud Automation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
