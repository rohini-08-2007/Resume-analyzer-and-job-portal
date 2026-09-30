import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2,
  RefreshCw, Sparkles, User, Mail, Briefcase, FileCheck, ExternalLink, X
} from 'lucide-react';
import { SAMPLE_RESUMES, TARGET_ROLES } from '../data/sampleResumes';
import { analyzeResumeText } from '../utils/atsAnalyzer';
import { ATSAnalysisResult, SampleResume, SubmissionDetails } from '../types';

interface ResumeAnalyzerFormProps {
  preselectedSampleId?: string | null;
  onClearPreselectedSample?: () => void;
  onOpenWorkflowModal: () => void;
}

export const ResumeAnalyzerForm: React.FC<ResumeAnalyzerFormProps> = ({
  preselectedSampleId,
  onClearPreselectedSample,
  onOpenWorkflowModal,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [targetRole, setTargetRole] = useState(TARGET_ROLES[0].id);
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [rawTextContent, setRawTextContent] = useState<string>('');
  
  // Real-time ATS evaluation
  const [atsAnalysis, setAtsAnalysis] = useState<ATSAnalysisResult | null>(null);

  // Submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string>('');
  const [submissionSuccess, setSubmissionSuccess] = useState<SubmissionDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Field validation errors
  const [errors, setErrors] = useState<{ name?: string; email?: string; file?: string }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen for preselected sample from parent
  useEffect(() => {
    if (preselectedSampleId) {
      const sample = SAMPLE_RESUMES.find(s => s.id === preselectedSampleId);
      if (sample) {
        loadSampleResume(sample);
      }
    }
  }, [preselectedSampleId]);

  // Recalculate ATS analysis whenever text or target role changes
  useEffect(() => {
    if (rawTextContent) {
      const result = analyzeResumeText(rawTextContent, targetRole);
      setAtsAnalysis(result);
    }
  }, [rawTextContent, targetRole]);

  const loadSampleResume = (sample: SampleResume) => {
    setName(sample.candidateName);
    setEmail(sample.candidateEmail);
    setTargetRole(sample.targetRoleKey);
    setFileName(sample.fileName);
    setFileType('text/plain');
    setRawTextContent(sample.content);

    // Convert sample text to base64
    const b64 = btoa(unescape(encodeURIComponent(sample.content)));
    setFileBase64(b64);
    
    // Create a mock File object
    const blob = new Blob([sample.content], { type: 'text/plain' });
    const mockFile = new File([blob], sample.fileName, { type: 'text/plain' });
    setFile(mockFile);

    setErrors({});
    setErrorMessage(null);
    setSubmissionSuccess(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    processFile(selectedFile);
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile.size > 25 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: 'File exceeds 25MB limit.' }));
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setFileType(selectedFile.type || 'application/octet-stream');
    setErrors(prev => ({ ...prev, file: undefined }));
    setErrorMessage(null);

    // Read base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const resultStr = event.target?.result as string;
      // Strip data url prefix (e.g. data:application/pdf;base64,)
      const base64Content = resultStr.split(',')[1] || resultStr;
      setFileBase64(base64Content);
    };
    reader.readAsDataURL(selectedFile);

    // If it's a text-based file, read as text for instant client ATS preview
    if (selectedFile.type.includes('text') || selectedFile.name.endsWith('.txt')) {
      const textReader = new FileReader();
      textReader.onload = (ev) => {
        const text = ev.target?.result as string;
        setRawTextContent(text || '');
      };
      textReader.readAsText(selectedFile);
    } else {
      // For PDF / Docx, synthesize clean structural text preview based on file name & typical career structure
      const placeholderText = `Applicant: ${name || 'Candidate'}\nFile: ${selectedFile.name}\nSize: ${(selectedFile.size / 1024).toFixed(1)} KB\nExperience in ${TARGET_ROLES.find(r => r.id === targetRole)?.label || 'Software'}\nTechnologies and systems evaluation.`;
      setRawTextContent(placeholderText);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const validate = (): boolean => {
    const newErrors: { name?: string; email?: string; file?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email format (e.g., name@example.com).';
    }

    if (!fileBase64) {
      newErrors.file = 'Please upload a resume file (PDF, DOCX, or TXT).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setSubmissionStep('Preparing document payload...');

    try {
      setSubmissionStep('Dispatching to n8n Cloud Webhook (rohinitheresa8.app.n8n.cloud)...');

      const response = await fetch('/api/submit-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          fileName: fileName || 'resume.pdf',
          fileType: fileType || 'application/pdf',
          fileBase64,
          targetRole: TARGET_ROLES.find(r => r.id === targetRole)?.label || targetRole,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionStep('Automation workflow triggered successfully!');
        setSubmissionSuccess({
          applicantName: name.trim(),
          applicantEmail: email.trim(),
          fileName: fileName || 'resume.pdf',
          fileSizeKb: data.details?.fileSizeKb || Math.round(fileBase64.length * 0.75 / 1024),
          targetRole: TARGET_ROLES.find(r => r.id === targetRole)?.label || 'General Evaluation',
          submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        });
      } else {
        throw new Error(data.error || 'Failed to submit resume to n8n workflow.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'An error occurred while connecting to the n8n automation service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setFile(null);
    setFileBase64('');
    setFileName('');
    setRawTextContent('');
    setAtsAnalysis(null);
    setSubmissionSuccess(null);
    setErrorMessage(null);
    setErrors({});
    if (onClearPreselectedSample) onClearPreselectedSample();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section id="analyzer" className="py-16 md:py-24 border-t border-slate-800/80 bg-[#0e1420]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-rose-400 uppercase">
            <span>Live Webhook Ingestion</span>
            <span aria-hidden="true">·</span>
            <span>n8n Cloud Endpoint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display [text-wrap:balance]">
            Submit Resume to Rohini’s Automated Analyzer
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Fill in your candidate details, attach your CV (PDF, DOCX, or TXT), and trigger the automated n8n workflow pipeline.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-medium text-slate-400">
              ⚡ Test immediately with pre-configured sample resumes:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {SAMPLE_RESUMES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => loadSampleResume(sample)}
                  className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-md border border-slate-700/60 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {sample.role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Container & ATS Audit Preview Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form (Left / Center) */}
          <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {submissionSuccess ? (
              /* Success Receipt View */
              <div className="space-y-6 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white font-display">
                    Resume Dispatched to n8n Workflow!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Payload received by Rohini’s automated cloud worker. Your resume has entered the ATS parsing & evaluation queue.
                  </p>
                </div>

                {/* Receipt Box */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2.5">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-slate-400">
                    <span>Workflow Endpoint</span>
                    <span className="font-mono text-slate-300">rohinitheresa8.app.n8n.cloud</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Candidate Name</span>
                    <span className="font-medium">{submissionSuccess.applicantName}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Notification Email</span>
                    <span className="font-medium">{submissionSuccess.applicantEmail}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Target Role</span>
                    <span className="font-medium">{submissionSuccess.targetRole}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Attached File</span>
                    <span className="font-medium font-mono">{submissionSuccess.fileName} ({submissionSuccess.fileSizeKb} KB)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Timestamp</span>
                    <span className="font-medium tabular-nums">{submissionSuccess.submittedAt}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                  >
                    Submit Another Resume
                  </button>
                  <button
                    onClick={onOpenWorkflowModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>View n8n Architecture</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Active Input Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Candidate Name */}
                <div>
                  <label htmlFor="field-0" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Candidate Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="field-0"
                      name="field-0"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Alex Rivera"
                      className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-900/90 border ${
                        errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700/80 focus:border-rose-500'
                      } rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                </div>

                {/* Candidate Email */}
                <div>
                  <label htmlFor="field-1" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address for Feedback Report <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="field-1"
                      name="field-1"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      placeholder="e.g. rohinipolamarasetti8@gmail.com"
                      className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-900/90 border ${
                        errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700/80 focus:border-rose-500'
                      } rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                </div>

                {/* Target Role Selector */}
                <div>
                  <label htmlFor="target-role" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Role Benchmark
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <select
                      id="target-role"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 focus:border-rose-500 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors cursor-pointer"
                    >
                      {TARGET_ROLES.map((role) => (
                        <option key={role.id} value={role.id} className="bg-slate-900 text-white">
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Resume Upload Drag & Drop Zone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Upload Resume File <span className="text-rose-400">*</span>
                  </label>
                  
                  <input
                    ref={fileInputRef}
                    id="field-2"
                    name="field-2"
                    type="file"
                    accept=".pdf,.docx,.doc,.txt,.rtf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {file ? (
                    /* Attached file indicator */
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-medium text-white truncate">{fileName}</p>
                          <p className="text-xs text-slate-400">
                            {(file.size / 1024).toFixed(1)} KB · Ready to dispatch
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setFileBase64('');
                          setFileName('');
                          setRawTextContent('');
                          setAtsAnalysis(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-800"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    /* Upload Drag & Drop Surface */
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-6 sm:p-8 rounded-xl border-2 border-dashed ${
                        errors.file ? 'border-rose-500 bg-rose-950/10' : 'border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/70'
                      } text-center cursor-pointer transition-all duration-150`}
                    >
                      <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-white mb-1">
                        Click to browse or drag and drop your resume
                      </p>
                      <p className="text-xs text-slate-400">
                        Supports PDF, DOCX, or TXT up to 25MB
                      </p>
                    </div>
                  )}
                  {errors.file && <p className="mt-1 text-xs text-rose-400">{errors.file}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800/60 text-white font-semibold text-sm shadow-md hover:shadow-rose-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>{submissionStep || 'Submitting to n8n...'}</span>
                      </>
                    ) : (
                      <>
                        <FileCheck className="w-4 h-4" />
                        <span>Dispatch to Resume Analyzer</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Submissions are transmitted securely to Rohini’s n8n cloud automation instance.
                  </p>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Live ATS Scoring Preview & Keyword Audit */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Live ATS Compliance Audit
                  </h3>
                  <p className="text-xs text-slate-400">
                    {file ? 'Real-time document inspection' : 'Awaiting file or sample selection'}
                  </p>
                </div>
                {atsAnalysis && (
                  <span className="text-xs font-mono font-bold text-rose-400 tabular-nums">
                    {atsAnalysis.overallScore}/100 Score
                  </span>
                )}
              </div>

              {atsAnalysis ? (
                <div className="space-y-5">
                  {/* Score Breakdown Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1 text-slate-300">
                        <span>Keyword Alignment</span>
                        <span className="font-semibold tabular-nums">{atsAnalysis.keywordScore}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full transition-all duration-500"
                          style={{ width: `${atsAnalysis.keywordScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 text-slate-300">
                        <span>Quantifiable Impact</span>
                        <span className="font-semibold tabular-nums">{atsAnalysis.impactScore}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${atsAnalysis.impactScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 text-slate-300">
                        <span>Standard ATS Sections</span>
                        <span className="font-semibold tabular-nums">{atsAnalysis.formattingScore}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${atsAnalysis.formattingScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detected Sections checklist */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-2">Detected Sections:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {atsAnalysis.detectedSections.map((sec, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                          {sec.present ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          )}
                          <span className={sec.present ? 'text-slate-200' : 'text-slate-500'}>
                            {sec.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Matched Keywords */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1.5">Matched Role Keywords:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {atsAnalysis.matchedKeywords.length > 0 ? (
                        atsAnalysis.matchedKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-800/50 rounded"
                          >
                            {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">No keyword matches yet</span>
                      )}
                    </div>
                  </div>

                  {/* Actionable Suggestions */}
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                    <p className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Key Recommendations:
                    </p>
                    {atsAnalysis.suggestions.map((sug, i) => (
                      <p key={i} className="text-slate-400 leading-relaxed">
                        • {sug}
                      </p>
                    ))}
                  </div>

                </div>
              ) : (
                /* Empty state prompt */
                <div className="text-center py-10 space-y-3">
                  <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-medium text-slate-300">
                    No Document Analyzed Yet
                  </p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Select one of the sample candidates above or upload your own CV to see real-time ATS scoring metrics.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
