### Run project locally

1. Go to api cd ./api and run npm install
2. Create .env file
3. Copy content from .env.example and paste into .env
4. Go back ../ to root
5. Run backend using docker docker compose up --build
6. Go to frontend ./todo-app and run npm install
7. Run npm start to start dev mode

### API documentation

You can find Swagger documentation http://localhost:3200/api-docs. Use it if you want to test backend separately from frontend application.
Also, you can check existing DTOs, tes Auth, etc. and `node_modules and install everything from scratch.

### Application Guide

1. After application launched you will see sign in form, click to sign up link below
2. Use any email/password combination for sign up. If you logout you can use credentials to login view sign in form
3. After successful signup/signin you will be redirected to dashboard page where you can test application requirements

### Troubleshooting

If you have issues with running api or todo-app try to remove package-lock.json and node_modules and install everything from scratch.
For any questions you can also reach me via email honcharukna@gmail.com
