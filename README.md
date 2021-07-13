# Carpe Diem API Typescript
 (`This project is in development yet 🔧`).

I'm building this API to my course, because I have one last work to present, and show the skills that I learned in the course.

## Technologies 🛠

  - NodeJS <img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=for-the-badge&logo=node.js&logoColor=white" />
  - PostgreSQL <img alt="Postgres" src ="https://img.shields.io/badge/Postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
  - Typescript <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
  - Express <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
  - JsonWebToken
  - TypeORM
  - Bcrypt
  - Multer
  - Cloudinary

## Patterns 📃 
  - Singleton pattern
  - Service pattern
  - Repository pattern
  - Some SOLID concepts

## Prerequisites ⚙️
 - Node v14.17.1 (version used to build the API)
 - Package Manager (npm or yarn)
 - PostgreSQL

## Installation 💻 

### Step 1
Clone this repository with this command:

```git
git clone https://github.com/Sobraloser/TCC_API_Typescript.git
```

### Step 2
And then, open the repository local folder, and install all dependencies with the following commands:

```bash
yarn
```

or if you use npm:

```bash
npm install
```

### Step 3

after this, let's run the migrations:

```bash
yarn typeorm migration:run
```

or

```bash
npm run typeorm migration:run
```
### Step 4

Create an account in Cloudinary, take your API secrets and put in `.env` file.
(dont forget to put some `secret` in `TOKEN_SECRET` field, he's responsible to turn your `JsonWebToken` unique)

```
TOKEN_SECRET= Yout token secret here
CLOUDINARY_CLOUD_NAME= 
CLOUDINARY_API_KEY= 
CLOUDINARY_API_SECRET= 
CLOUDINARY_URL= (Do not forget to fill in this field, it is extremely necessary to work)
```

### Step 5

Now, let's start the server with `dev` script:

```bash
yarn dev
```
