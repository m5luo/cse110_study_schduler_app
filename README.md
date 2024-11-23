# cse110_study_schduler_app

To run client:
---
Run the following commands:

Go to the `client` directory:
```
cd client
```

Install dependencies:
```
npm install
```

Run the client server on `localhost:3000`
```
npm start
```

To run server:
---
Run the following commands:

Go to the `server` directory:
```
cd server
```

Install dependencies:
```
npm install
```

Run the backend server on `localhost:8080`
```
npm start
```

Add Unit Tests:
---
For each new method added for an object (e.g. `User`, `Event`, `Notes`, etc.), create a file named `<object>.test.tsx` if no such file already exitst. Add a test for testing the new method.

Create `.env` file:
---

1. Create a file in home directory named `.env`.
2. Copy and paste the follow code block, fill-in the values accordingly:
```
BASE_URL='./src'
TOKEN_SECRET='<your-token>'
RESET_TOKEN_EXPIRY='1d' # i day
SMTP_HOST='smtp.gmail.com'
SMTP_PORT='587'
SMTP_USER='<your-email>'
SMTP_PASS='<email-app-password>'
FRONTEND_URL='http://localhost:3000'
```
3. Replace `<your-token>` with some string, the string will be used to generate JWT tokens.
4. Replace `<your-email>` with the email you want the reset password link to be sent from (for actual deployment probably should be an email created just for the app, but to test you can just use a personal email).
5. Replace `<email-app-password>` with an `app password` for your email. You can create one by following this tutorial for gmails: https://support.google.com/accounts/answer/185833?hl=en

Add Unit Tests:
---
For each new method added for an object (e.g. `User`, `Event`, `Notes`, etc.), create a file named `<object>.test.tsx` if no such file already exitst. Add a test for testing the new method.
