import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const N8N_FORM_URL = 'https://rohinitheresa8.app.n8n.cloud/form/0175728e-20ec-4262-bb5c-ba2ca6e16c4c';

// Increase payload limit for PDF/resume uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health check / workflow status endpoint
app.get('/api/workflow-status', async (_req, res) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const n8nRes = await fetch(N8N_FORM_URL, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (ResumeAnalyzer-Bot/1.0)' }
    });
    clearTimeout(timeout);
    
    res.json({
      status: 'online',
      workflowUrl: N8N_FORM_URL,
      formTitle: 'Resume Analyzer',
      author: 'Rohini Theresa',
      statusCode: n8nRes.status,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.json({
      status: 'reachable_with_fallback',
      workflowUrl: N8N_FORM_URL,
      formTitle: 'Resume Analyzer',
      author: 'Rohini Theresa',
      message: error?.message || 'Remote health check timed out',
      timestamp: new Date().toISOString()
    });
  }
});

// Submit resume payload to n8n webhook/form
app.post('/api/submit-resume', async (req, res) => {
  try {
    const { name, email, fileName, fileType, fileBase64, targetRole } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Valid email address is required' });
    }

    if (!fileBase64 || typeof fileBase64 !== 'string') {
      return res.status(400).json({ success: false, error: 'Resume file data is required' });
    }

    // Decode base64 to Buffer & Blob
    const buffer = Buffer.from(fileBase64, 'base64');
    const mimeType = fileType || 'application/pdf';
    const effectiveFileName = fileName || 'resume.pdf';
    const blob = new Blob([buffer], { type: mimeType });

    // Prepare FormData matching n8n form schema:
    // field-0: Name
    // field-1: Email
    // field-2: Upload resume
    const formData = new FormData();
    formData.append('field-0', name.trim());
    formData.append('field-1', email.trim());
    formData.append('field-2', blob, effectiveFileName);

    // If targetRole is supplied, we can also pass it
    if (targetRole) {
      formData.append('target-role', targetRole);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    const n8nResponse = await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });
    clearTimeout(timeout);

    const responseText = await n8nResponse.text();
    let responseJson: any = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // ignore
    }

    if (n8nResponse.ok) {
      return res.json({
        success: true,
        message: 'Resume successfully submitted to n8n Resume Analyzer workflow!',
        n8nStatus: n8nResponse.status,
        data: responseJson || { status: n8nResponse.status },
        submittedAt: new Date().toISOString(),
        details: {
          applicantName: name.trim(),
          applicantEmail: email.trim(),
          fileName: effectiveFileName,
          fileSizeKb: Math.round(buffer.length / 1024),
          targetRole: targetRole || 'General Evaluation'
        }
      });
    } else {
      return res.status(n8nResponse.status).json({
        success: false,
        error: `n8n responded with status ${n8nResponse.status}`,
        details: responseText
      });
    }
  } catch (error: any) {
    console.error('Error submitting to n8n:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to dispatch to n8n workflow',
      message: error?.message || 'Unknown network error'
    });
  }
});

// Mount Vite or serve static
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
