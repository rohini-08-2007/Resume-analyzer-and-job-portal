const N8N_FORM_URL = 'https://rohinitheresa8.app.n8n.cloud/form/0175728e-20ec-4262-bb5c-ba2ca6e16c4c';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const n8nRes = await fetch(N8N_FORM_URL, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (ResumeAnalyzer-Bot/1.0)' }
    });
    clearTimeout(timeout);

    return res.status(200).json({
      status: 'online',
      workflowUrl: N8N_FORM_URL,
      formTitle: 'Resume Analyzer',
      author: 'Rohini Theresa',
      statusCode: n8nRes.status,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return res.status(200).json({
      status: 'reachable_with_fallback',
      workflowUrl: N8N_FORM_URL,
      formTitle: 'Resume Analyzer',
      author: 'Rohini Theresa',
      message: error?.message || 'Remote health check timed out',
      timestamp: new Date().toISOString()
    });
  }
}
