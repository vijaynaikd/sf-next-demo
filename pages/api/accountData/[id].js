import { authenticate } from '@/lib/salesforce';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { accessToken, instanceUrl } = await authenticate();

    const sfRes = await fetch(`${instanceUrl}/services/apexrest/accountData/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!sfRes.ok) {
      const error = await sfRes.text();
      return res.status(sfRes.status).json({ error });
    }

    const data = await sfRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
