module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  port: Number(process.env.DB_PORT),
  // comment below line for local development
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: [process.env.DB_ENTITIES || ''],
}