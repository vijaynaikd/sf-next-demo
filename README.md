1. Clone this project 


2. Steps to integrate with Salesforce
Create a connected app in Salesforce and get ClientId and ClientSecret

4. Create a .env.local file in the project root with the following details
```
SF_CLIENT_ID=YOUR_CLIENT_ID
SF_CLIENT_SECRET=YOUR_CLIENT_SECRET
SF_USERNAME=YOUR_USERNAME
SF_PASSWORD=YOUR_PASSWORD+SECURITY_TOKEN
SF_LOGIN_URL=https://login.salesforce.com
```

5. In Salesforce peform the following steps to allow username password flow
Setup >> Security Controls >> OAuth and OpenId Connect Settings >> Allow OAuth Username-Password Flow

6. Run project
```
npm run dev
```

7. Open http://localhost:3000/accounts