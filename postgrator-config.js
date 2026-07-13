require('dotenv').config();

module.exports = {
  migrationPattern: 'migrations/*',

  driver: 'pg',

  host: process.env.MIGRATION_DB_HOST || '127.0.0.1',
  port: Number(process.env.MIGRATION_DB_PORT || 5432),
  database: process.env.MIGRATION_DB_NAME,
  username: process.env.MIGRATION_DB_USER,
  password: process.env.MIGRATION_DB_PASS,

  schemaTable: 'schemaversion',
};
