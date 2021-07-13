module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URI,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
  synchronize: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [
    process.env.DATABASE_ENTITIES_DIR
  ],
  migrations: [
    process.env.DATABASE_MIGRATIONS_DIR
  ],
  cli : {
    migrationsDir : process.env.DATABABASE_CLI_MIGRATIONS_DIR
  }
}