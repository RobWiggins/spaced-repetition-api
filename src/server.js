require('dotenv').config();

const knex = require('knex');
const app = require('./app');
const { PORT } = require('./config');

const requiredVariables = [
  'MIGRATION_DB_HOST',
  'MIGRATION_DB_PORT',
  'MIGRATION_DB_NAME',
  'MIGRATION_DB_USER',
  'MIGRATION_DB_PASS',
];

for (const variable of requiredVariables) {
  if (typeof process.env[variable] !== 'string' || !process.env[variable]) {
    throw new Error(`Missing or invalid environment variable: ${variable}`);
  }
}

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.MIGRATION_DB_HOST,
    port: Number(process.env.MIGRATION_DB_PORT),
    database: process.env.MIGRATION_DB_NAME,
    user: process.env.MIGRATION_DB_USER,
    password: process.env.MIGRATION_DB_PASS,
  },
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});