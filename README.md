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

6. Install Dependencies & Run project
```
npm install
npm run dev
```

7. Open http://localhost:3000/accounts

8. To test with custom apex rest for view details button you need to create an apex class - create an apex class in your salesforce org, you can copy apex class here: https://github.com/vijaynaikd/sf-next-demo/blob/main/CustomApexClass.txt