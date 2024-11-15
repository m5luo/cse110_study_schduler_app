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
2. Add `TOKEN_SECRET=<your-token>`. Replace `<your-token>` with some string, the string will be used to generate JWT tokens.

Add Unit Tests:
---
For each new method added for an object (e.g. `User`, `Event`, `Notes`, etc.), create a file named `<object>.test.tsx` if no such file already exitst. Add a test for testing the new method.