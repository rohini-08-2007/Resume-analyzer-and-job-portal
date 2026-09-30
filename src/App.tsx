import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResumeAnalyzerForm } from './components/ResumeAnalyzerForm';
import { WorkflowPipelineSection } from './components/WorkflowPipelineSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { RoleBenchmarksSection } from './components/RoleBenchmarksSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { N8nWorkflowModal } from './components/N8nWorkflowModal';
import { WorkflowStatus } from './types';

export default function App() {
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus | null>(null);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [preselectedSampleId, setPreselectedSampleId] = useState<string | null>(null);

  useEffect(() => {
    // Check status of Rohini's n8n workflow
    fetch('/api/workflow-status')
      .then(res => res.json())
      .then(data => {
        setWorkflowStatus(data);
      })
      .catch(err => {
        console.warn('Workflow status check failed:', err);
        setWorkflowStatus({
          status: 'reachable_with_fallback',
          workflowUrl: 'https://rohinitheresa8.app.n8n.cloud/form/0175728e-20ec-4262-bb5c-ba2ca6e16c4c',
          formTitle: 'Resume Analyzer',
          author: 'Rohini Theresa'
        });
      });
  }, []);

  const scrollToAnalyzer = () => {
    const el = document.getElementById('analyzer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSample = (sampleId: string) => {
    setPreselectedSampleId(sampleId);
    scrollToAnalyzer();
  };

  const handleSelectRole = (_roleId: string) => {
    scrollToAnalyzer();
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Bar following 3-zone contract */}
      <Navbar
        status={workflowStatus}
        onOpenWorkflowModal={() => setIsWorkflowModalOpen(true)}
        onScrollToAnalyzer={scrollToAnalyzer}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          status={workflowStatus}
          onScrollToAnalyzer={scrollToAnalyzer}
          onSelectSample={handleSelectSample}
        />

        {/* Live Resume Analyzer Form & ATS Evaluation */}
        <ResumeAnalyzerForm
          preselectedSampleId={preselectedSampleId}
          onClearPreselectedSample={() => setPreselectedSampleId(null)}
          onOpenWorkflowModal={() => setIsWorkflowModalOpen(true)}
        />

        {/* n8n Automation Pipeline Architecture */}
        <WorkflowPipelineSection
          onOpenWorkflowModal={() => setIsWorkflowModalOpen(true)}
        />

        {/* Bullet Rewrites & Quantified Impact */}
        <BeforeAfterSection />

        {/* Role ATS Benchmarks */}
        <RoleBenchmarksSection
          onSelectRole={handleSelectRole}
        />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenWorkflowModal={() => setIsWorkflowModalOpen(true)}
      />

      {/* n8n Specification Modal */}
      <N8nWorkflowModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        status={workflowStatus}
      />
    </div>
  );
}
