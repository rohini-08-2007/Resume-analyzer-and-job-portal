import React from 'react';
import { X, ExternalLink, Check, Copy, Workflow, ShieldCheck, Database, Send } from 'lucide-react';
import { WorkflowStatus } from '../types';

interface N8nWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: WorkflowStatus | null;
}

export const N8nWorkflowModal: React.FC<N8nWorkflowModalProps> = ({
  isOpen,
  onClose,
  status,
}) => {
  const [copied, setCopied] = React.useState(false);
  const n8nUrl = 'https://rohinitheresa8.app.n8n.cloud/form/0175728e-20ec-4262-bb5c-ba2ca6e16c4c';

  if (!isOpen) return null;

  const copyUrl = () => {
    navigator.clipboard.writeText(n8nUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#111827] border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Workflow className="w-5 h-5 text-rose-400" />
              <h3 className="text-xl font-bold text-white font-display">
                n8n Live Workflow Architecture
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Form Trigger node configured on Rohini Theresa's n8n cloud instance.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Endpoint & Copy */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Production Form Webhook</span>
            <span className="text-emerald-400 font-medium">HTTP POST 200 OK</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs font-mono text-slate-200 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 overflow-x-auto whitespace-nowrap">
              {n8nUrl}
            </code>
            <button
              onClick={copyUrl}
              className="px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
              title="Copy URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Payload Specifications */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Multipart Form-Data Schema
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-mono text-rose-400 font-semibold">field-0</span>
              <p className="text-slate-200 font-medium">Name</p>
              <p className="text-slate-400 text-[11px]">Applicant full name string</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-mono text-rose-400 font-semibold">field-1</span>
              <p className="text-slate-200 font-medium">Email</p>
              <p className="text-slate-400 text-[11px]">Valid RFC 5322 email string</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-mono text-rose-400 font-semibold">field-2</span>
              <p className="text-slate-200 font-medium">Upload resume</p>
              <p className="text-slate-400 text-[11px]">Binary file (PDF / DOCX / TXT)</p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
          <a
            href={n8nUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors"
          >
            <span>Open Original n8n Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
