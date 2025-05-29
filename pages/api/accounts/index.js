import { authenticate } from '@/lib/salesforce';
import axios from 'axios';

export default async function handler(req, res) {
  const { accessToken, instanceUrl } = await authenticate();
  console.log('accessToken---' + accessToken);
  console.log('instanceUrl---' + instanceUrl);

  if (req.method === 'GET') {
    const result = await axios.get(
      `${instanceUrl}/services/data/v59.0/query?q=SELECT+Id,Name,Phone,Website+FROM+Account+LIMIT+100`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    res.status(200).json(result.data.records);
  } else if (req.method === 'POST') {
    const { Name, Phone, Website } = req.body;

    const result = await axios.post(
      `${instanceUrl}/services/data/v59.0/sobjects/Account/`,
      { Name, Phone, Website },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.status(201).json(result.data);
  } else {
    res.status(405).end();
  }
}
