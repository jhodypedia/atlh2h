export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Pastikan body diterima dalam format x-www-form-urlencoded
    const body = typeof req.body === 'string'
      ? req.body
      : new URLSearchParams(req.body).toString();

    // Proxy request ke API Atlantic
    const response = await fetch('https://atlantich2h.com/deposit/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });

    const contentType = response.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
