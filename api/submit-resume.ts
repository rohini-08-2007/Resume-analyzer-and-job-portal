const N8N_FORM_URL = 'https://rohinitheresa8.app.n8n.cloud/form/0175728e-20ec-4262-bb5c-ba2ca6e16c4c';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, fileName, fileType, fileBase64, targetRole } = req.body || {};

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
      return res.status(200).json({
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
}
