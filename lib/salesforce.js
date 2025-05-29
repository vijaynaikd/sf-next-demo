import axios from 'axios';

let accessToken = null;
let instanceUrl = null;

export async function authenticate() {
  if (accessToken) return { accessToken, instanceUrl };

  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', process.env.SF_CLIENT_ID);
  params.append('client_secret', process.env.SF_CLIENT_SECRET);
  params.append('username', process.env.SF_USERNAME);
  params.append('password', process.env.SF_PASSWORD);

  const response = await axios.post(`${process.env.SF_LOGIN_URL}/services/oauth2/token`, params);
  
  accessToken = response.data.access_token;
  instanceUrl = response.data.instance_url;

  return { accessToken, instanceUrl };
}
