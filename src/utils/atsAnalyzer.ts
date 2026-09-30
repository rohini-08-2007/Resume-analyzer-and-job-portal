import { ATSAnalysisResult } from '../types';
import { TARGET_ROLES } from '../data/sampleResumes';

const ACTION_VERBS = [
  'spearheaded', 'architected', 'engineered', 'orchestrated', 'delivered',
  'optimized', 'slashed', 'scaled', 'mentored', 'designed', 'instituted',
  'streamlined', 'quantized', 'deployed', 'automated', 'refactored',
  'accelerated', 'transformed', 'negotiated', 'launched', 'piloted'
];

export function analyzeResumeText(text: string, targetRoleId: string = 'software-engineering'): ATSAnalysisResult {
  const normalized = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Sections check
  const sectionsToCheck = [
    { name: 'Contact Information', regex: /(@|phone|email|\(\d{3}\)|\bgithub\b|\blinkedin\b)/i },
    { name: 'Professional Summary', regex: /(summary|profile|about me|executive summary)/i },
    { name: 'Work Experience', regex: /(experience|employment|work history|career history)/i },
    { name: 'Technical Skills', regex: /(skills|technical skills|competencies|technologies)/i },
    { name: 'Education', regex: /(education|university|degree|b\.s\.|b\.a\.|m\.s\.|ph\.d)/i },
  ];

  const detectedSections = sectionsToCheck.map(sec => ({
    name: sec.name,
    present: sec.regex.test(text)
  }));

  const presentSectionCount = detectedSections.filter(s => s.present).length;
  const formattingScore = Math.round((presentSectionCount / sectionsToCheck.length) * 100);

  // Action verbs check
  let actionVerbsFound = 0;
  for (const verb of ACTION_VERBS) {
    if (normalized.includes(verb)) {
      actionVerbsFound++;
    }
  }

  // Quantifiable numbers / metrics check
  const metricMatches = text.match(/(\d+[\.\d]*\s*%|\$\s*\d+[\.\d]*[kKmMbB]?|\b\d+x\b|\b\d+\s*(users|clients|merchants|queries|seconds|ms)\b)/g);
  const metricCount = metricMatches ? metricMatches.length : 0;
  
  // Impact Score (0 - 100) based on action verbs + metric occurrences
  const rawImpact = (actionVerbsFound * 10) + (metricCount * 12);
  const impactScore = Math.min(98, Math.max(35, rawImpact));

  // Keyword check against target role
  const role = TARGET_ROLES.find(r => r.id === targetRoleId) || TARGET_ROLES[0];
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const kw of role.keywords) {
    const kwRegex = new RegExp('\\b' + kw.replace('+', '\\+') + '\\b', 'i');
    if (kwRegex.test(text)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  }

  const keywordScore = Math.round((matchedKeywords.length / role.keywords.length) * 100);

  // Overall weighted score
  const overallScore = Math.round((keywordScore * 0.45) + (impactScore * 0.35) + (formattingScore * 0.20));

  // Construct recommendations
  const suggestions: string[] = [];
  if (presentSectionCount < sectionsToCheck.length) {
    const missing = detectedSections.filter(s => !s.present).map(s => s.name).join(', ');
    suggestions.push(`Add clear standard headings for missing sections: ${missing}.`);
  }
  if (metricCount < 3) {
    suggestions.push('Add more measurable achievements with percentages, dollar amounts, or performance metrics (e.g. "Reduced query latency by 45%").');
  }
  if (missingKeywords.length > 0) {
    suggestions.push(`Consider integrating in-demand role keywords such as: ${missingKeywords.slice(0, 3).join(', ')}.`);
  }
  if (wordCount < 250) {
    suggestions.push('Your resume appears brief. Add more depth to your core project achievements and responsibilities.');
  } else if (wordCount > 1000) {
    suggestions.push('Your resume is relatively long. Aim for a concise, high-impact 1 to 2 page length (450–750 words).');
  }

  return {
    overallScore,
    wordCount,
    detectedSections,
    impactScore,
    keywordScore,
    formattingScore,
    actionVerbsCount: actionVerbsFound,
    matchedKeywords,
    missingKeywords,
    suggestions: suggestions.length > 0 ? suggestions : ['Great job! Your resume demonstrates strong ATS alignment and impactful metrics.']
  };
}
