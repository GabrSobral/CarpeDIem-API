# Carpe Diem API Typescript
 (`This project is in development yet`).

I'm building this API to my course, because I have one last work to present, and show the skills that I learned in the course.

## Technologies

  - NodeJS
  - PostgreSQL
  - Typescript
  - Express
  - JsonWebToken
  - TypeORM
  - Bcrypt

## Patterns
  - Singleton pattern
  - Service pattern
  - Repository pattern

## Installation

Clone this repository with this command:

```git
git clone https://github.com/Sobraloser/TCC_API_Typescript.git
```

And then, open the repository local folder, and install all dependencies with the following commands:

```bash
yarn
```

or if you use npm:

```bash
npm install
```

after this, let's run the migrations:

```bash
yarn typeorm migration:run
```

or

```bash
npm run typeorm migration:run
```

Now, let's start the server with `dev` script:

```bash
yarn dev
```
