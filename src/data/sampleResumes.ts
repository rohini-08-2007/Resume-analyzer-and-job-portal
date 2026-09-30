import { SampleResume } from '../types';

export const TARGET_ROLES: { id: string; label: string; keywords: string[] }[] = [
  {
    id: 'software-engineering',
    label: 'Senior Software Engineer',
    keywords: [
      'React', 'TypeScript', 'Node.js', 'System Architecture', 'CI/CD',
      'Microservices', 'PostgreSQL', 'Docker', 'GraphQL', 'AWS', 'Redis', 'Unit Testing'
    ]
  },
  {
    id: 'product-management',
    label: 'Principal Product Manager',
    keywords: [
      'Product Strategy', 'Roadmapping', 'User Research', 'A/B Testing', 'OKRs',
      'Data Analytics', 'Cross-Functional Leadership', 'Sprint Planning', 'Go-to-Market', 'SQL'
    ]
  },
  {
    id: 'ai-data',
    label: 'AI / Machine Learning Engineer',
    keywords: [
      'Python', 'PyTorch', 'Large Language Models', 'Vector Databases', 'Transformers',
      'MLOps', 'Feature Engineering', 'Fine-tuning', 'Kubernetes', 'FastAPI'
    ]
  },
  {
    id: 'growth-marketing',
    label: 'Growth Marketing Director',
    keywords: [
      'Funnel Optimization', 'CAC/LTV', 'SEO/SEM', 'Attribution Modeling', 'HubSpot',
      'Content Strategy', 'Paid Acquisition', 'Retention Loops', 'Experimentation'
    ]
  }
];

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'dev-alex',
    title: 'Alex Rivera — Full Stack Architect',
    role: 'Senior Full Stack Engineer',
    targetRoleKey: 'software-engineering',
    candidateName: 'Alex Rivera',
    candidateEmail: 'alex.rivera@example.com',
    fileName: 'Alex_Rivera_Senior_FullStack_Resume.txt',
    summary: 'Full-stack software engineer with 7+ years developing scalable distributed cloud applications and high-throughput web architectures.',
    atsScore: 92,
    content: `ALEX RIVERA
San Francisco, CA | (555) 321-9876 | alex.rivera@example.com | linkedin.com/in/alex-rivera-dev

PROFESSIONAL SUMMARY
Senior Full Stack Engineer with 7+ years of experience leading engineering squads in high-growth SaaS environments. Specialized in React, TypeScript, Node.js, and microservices architecture. Track record of reducing API latency by 45% and driving 99.98% platform reliability.

TECHNICAL SKILLS
- Languages: TypeScript, JavaScript (ESNext), Python, Go, SQL
- Frontend: React 19, Next.js, Tailwind CSS, State Management (Zustand, Redux)
- Backend: Node.js, Express, Fastify, PostgreSQL, Redis, GraphQL
- Cloud & DevOps: AWS (ECS, Lambda, RDS), Docker, Kubernetes, CI/CD (GitHub Actions), Terraform

EXPERIENCE
Staff Software Engineer | CloudVantage Labs
March 2022 – Present | San Francisco, CA
- Spearheaded frontend architecture redesign to modern React and server-side rendering, reducing initial page load time by 48% across 450,000 monthly active users.
- Designed and rolled out real-time document sync service utilizing WebSockets and Redis pub/sub, scaling concurrent connections from 5k to 75k with zero downtime.
- Mentored a distributed team of 8 engineers, instilling automated testing practices that increased code coverage from 62% to 94%.

Senior Backend Engineer | DataStream Dynamics
August 2019 – February 2022 | San Jose, CA
- Architected transactional payment ingestion pipeline processing $14M in monthly ARR, eliminating duplicate webhooks through distributed idempotent locking.
- Re-indexed mission-critical PostgreSQL schemas and implemented database connection pooling, slashing p99 query latency from 850ms to 42ms.

EDUCATION
B.S. in Computer Science | University of California, Berkeley
Graduated Cum Laude | 2015 – 2019`,
    matchedKeywords: ['React', 'TypeScript', 'Node.js', 'System Architecture', 'CI/CD', 'Microservices', 'PostgreSQL', 'Docker', 'GraphQL', 'AWS', 'Redis', 'Unit Testing'],
    missingKeywords: ['gRPC', 'Apache Kafka'],
    bulletRewrites: [
      {
        original: 'Worked on updating the frontend with new React code to make pages faster.',
        improved: 'Spearheaded frontend architecture redesign to modern React, reducing initial page load time by 48% across 450,000 MAUs.',
        why: 'Added specific metrics (48% load reduction, 450k MAUs) and replaced passive "worked on" with the strong action verb "Spearheaded".'
      },
      {
        original: 'Handled databases and improved SQL performance for payment queries.',
        improved: 'Re-indexed mission-critical PostgreSQL schemas and configured connection pooling, slashing p99 query latency from 850ms to 42ms.',
        why: 'Directly specified technical mechanism (re-indexing, pooling) and exact latency impact (850ms to 42ms).'
      }
    ]
  },
  {
    id: 'pm-sarah',
    title: 'Sarah Lin — Lead Product Manager',
    role: 'Principal Product Manager',
    targetRoleKey: 'product-management',
    candidateName: 'Sarah Lin',
    candidateEmail: 'sarah.lin@example.com',
    fileName: 'Sarah_Lin_Product_Manager_CV.txt',
    summary: 'Technical Product Leader with 6 years shipping consumer and B2B SaaS features from 0-to-1, driving over $8.5M in annual enterprise pipeline.',
    atsScore: 88,
    content: `SARAH LIN
Seattle, WA | sarah.lin@example.com | (555) 789-2345 | linkedin.com/in/sarah-lin-pm

SUMMARY
Data-driven Principal Product Manager with 6+ years orchestrating cross-functional discovery, roadmapping, and iterative experimentation. Successfully delivered 4 major enterprise modules generating $8.5M ARR with high customer NPS.

CORE COMPETENCIES
- Product Strategy & Vision, OKR Frameworks, Continuous Discovery
- Qualitative User Interviews, Quantitative Funnel Analysis, A/B Testing
- Agile/Scrum Leadership, PRD Drafting, Stakeholder Management, SQL & Mixpanel

PROFESSIONAL EXPERIENCE
Lead Product Manager | Omniscience Platforms
2021 – Present | Seattle, WA
- Defined and executed the Q1-Q4 product roadmap for the AI Analytics Suite, boosting adoption by 134% and growing enterprise ARR by $5.2M.
- Partnered with UX research to run 40+ user feedback sessions, identifying onboarding friction and streamlining checkout from 6 steps to 2.
- Led weekly triage and sprint ceremonies across 3 development pods consisting of 18 engineers and 2 product designers.

Product Manager | NexaCommerce Solutions
2018 – 2021 | Austin, TX
- Launched self-service developer portal and API monetization tier, converting 1,200 freemium merchants into paid subscriptions within 90 days.
- Instituted continuous A/B testing cadence resulting in a +19% checkout completion uplift.

EDUCATION
B.A. in Economics & Cognitive Science | University of Michigan
Honors Scholar | 2014 – 2018`,
    matchedKeywords: ['Product Strategy', 'Roadmapping', 'User Research', 'A/B Testing', 'OKRs', 'Data Analytics', 'Cross-Functional Leadership', 'Sprint Planning', 'Go-to-Market', 'SQL'],
    missingKeywords: ['Market Fit Modeling', 'Pricing Strategy'],
    bulletRewrites: [
      {
        original: 'Helped launch the new analytics tool for business customers.',
        improved: 'Defined and executed the product roadmap for AI Analytics Suite, boosting enterprise adoption by 134% and ARR by $5.2M.',
        why: 'Replaced vague "helped launch" with end-to-end ownership verbs and attributable revenue impact.'
      }
    ]
  },
  {
    id: 'ml-devon',
    title: 'Devon Vance — Machine Learning Specialist',
    role: 'Lead AI / ML Engineer',
    targetRoleKey: 'ai-data',
    candidateName: 'Devon Vance',
    candidateEmail: 'devon.vance@example.com',
    fileName: 'Devon_Vance_ML_Engineer.txt',
    summary: 'Machine Learning specialist focused on Retrieval-Augmented Generation (RAG), vector embeddings, and production model optimization.',
    atsScore: 94,
    content: `DEVON VANCE
Boston, MA | devon.vance@example.com | (555) 456-7890 | github.com/devon-vance

EXECUTIVE SUMMARY
Machine Learning Engineer with deep domain knowledge in LLM orchestration, semantic search, and MLOps deployment pipelines. Proven track record deploying models serving 2,000 requests per second at sub-80ms latency.

CORE STACK
- Python, C++, PyTorch, HuggingFace Transformers, LangChain
- Vector Databases: Pinecone, Qdrant, Milvus, pgvector
- Infrastructure: Ray, Triton Inference Server, Kubernetes, Docker, AWS SageMaker

EXPERIENCE
Staff ML Engineer | DeepContext AI
2022 – Present | Boston, MA
- Architected enterprise RAG system processing 10M+ internal docs, improving semantic retrieval precision (NDCG@10) from 0.68 to 0.91.
- Quantized 70B parameter open-source models using AWQ and vLLM, decreasing inference cloud costs by 58% while maintaining 99.2% benchmark accuracy.
- Built automated evaluation pipeline assessing hallucination rates across weekly dataset releases.

ML Research Engineer | Cortex Applied Labs
2019 – 2022 | Cambridge, MA
- Implemented deep neural network models for predictive telemetry, forecasting equipment failure 72 hours in advance with 94.6% recall.

EDUCATION
M.S. in Artificial Intelligence | MIT
B.S. in Applied Mathematics | Brown University`,
    matchedKeywords: ['Python', 'PyTorch', 'Large Language Models', 'Vector Databases', 'Transformers', 'MLOps', 'Feature Engineering', 'FastAPI'],
    missingKeywords: ['Fine-tuning', 'Kubernetes'],
    bulletRewrites: [
      {
        original: 'Did work with AI models and made search queries return better answers.',
        improved: 'Architected enterprise RAG system for 10M+ documents, improving retrieval precision (NDCG@10) from 0.68 to 0.91.',
        why: 'Quantified precision jump with industry-standard metric (NDCG@10) and document volume.'
      }
    ]
  }
];

export const WORKFLOW_PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Form Trigger & Ingestion',
    tech: 'n8n Cloud Webhook Node',
    description: 'The live n8n form receives candidate name, contact email, and multipart resume document (PDF/DOCX/TXT). Payload is validated for file size integrity.',
    nodeId: 'n8n-form-trigger'
  },
  {
    step: '02',
    title: 'Binary Extraction & Cleanse',
    tech: 'Binary-to-Text Parser',
    description: 'Document bytes are unbuffered into raw semantic text streams. Formatted headers, layout tables, and structural markers are normalized.',
    nodeId: 'text-extractor'
  },
  {
    step: '03',
    title: 'LLM Career Evaluation',
    tech: 'AI Evaluation Agent',
    description: 'Scores ATS keyword penetration, action verb momentum, quantifiable impact density, and section detectability against target role benchmarks.',
    nodeId: 'ai-evaluator'
  },
  {
    step: '04',
    title: 'Dispatched Feedback Delivery',
    tech: 'Email & CRM Integration',
    description: 'Automated synthesis generates comprehensive actionable recommendations and dispatches the customized report straight to the applicant inbox.',
    nodeId: 'email-notifier'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How is this website connected to the n8n form?',
    answer: 'This website is integrated directly with Rohini Theresa\'s live n8n cloud workflow (endpoint: https://rohinitheresa8.app.n8n.cloud/form/0175728e-20ec-4262-bb5c-ba2ca6e16c4c). Submissions trigger the backend automation immediately, which parses your document, evaluates ATS alignment, and logs the execution.'
  },
  {
    question: 'Which file formats and sizes are supported?',
    answer: 'The workflow accepts PDF, DOCX, TXT, and RTF documents up to 25MB. Text-based PDFs and clean DOCX documents yield the highest ATS parsing accuracy.'
  },
  {
    question: 'What is an ATS and why does it matter?',
    answer: 'Applicant Tracking Systems (ATS) are software used by over 98% of Fortune 500 companies to filter and score resumes before any recruiter sees them. If your resume lacks searchable keywords or uses non-standard formatting, it can be silently rejected regardless of your qualifications.'
  },
  {
    question: 'Can I test the system without uploading my own personal resume?',
    answer: 'Yes! We have preloaded realistic sample resumes for Senior Software Engineers, Product Managers, and ML Specialists. You can click any sample with 1-click to see instant evaluation metrics and trigger the live submission workflow.'
  },
  {
    question: 'What happens immediately after I click Submit?',
    answer: 'Your submission is dispatched to the n8n automation pipeline. You receive a verified submission receipt with timestamp and execution payload details, while the backend workflow processes your file.'
  }
];
