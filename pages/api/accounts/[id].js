import { authenticate } from '@/lib/salesforce';
import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;
  const { accessToken, instanceUrl } = await authenticate();

  if (req.method === 'PATCH') {
    const data = req.body;
    await axios.patch(
      `${instanceUrl}/services/data/v59.0/sobjects/Account/${id}`,
      data,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.status(204).end();
  } else if (req.method === 'DELETE') {
    await axios.delete(
      `${instanceUrl}/services/data/v59.0/sobjects/Account/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
