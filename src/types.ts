export interface WorkflowStatus {
  status: 'online' | 'reachable_with_fallback' | 'offline' | 'checking';
  workflowUrl: string;
  formTitle: string;
  author: string;
  statusCode?: number;
  timestamp?: string;
  message?: string;
}

export interface SubmissionDetails {
  applicantName: string;
  applicantEmail: string;
  fileName: string;
  fileSizeKb: number;
  targetRole: string;
  submittedAt: string;
  executionId?: string;
}

export interface SampleResume {
  id: string;
  title: string;
  role: string;
  targetRoleKey: string;
  candidateName: string;
  candidateEmail: string;
  fileName: string;
  content: string;
  atsScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  bulletRewrites: {
    original: string;
    improved: string;
    why: string;
  }[];
  summary: string;
}

export interface ATSAnalysisResult {
  overallScore: number;
  wordCount: number;
  detectedSections: { name: string; present: boolean }[];
  impactScore: number;
  keywordScore: number;
  formattingScore: number;
  actionVerbsCount: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}
