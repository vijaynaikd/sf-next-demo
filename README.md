1. Clone this project 


2. Steps to integrate with Salesforce
Create a connected app in Salesforce and get ClientId and ClientSecret

4. Update the details in .env.local file

5. In Salesforce peform the following steps to allow username password flow
Setup >> Security Controls >> OAuth and OpenId Connect Settings >> Allow OAuth Username-Password Flow

6. Run project
npm run dev

7. Open localhost:3000/accounts