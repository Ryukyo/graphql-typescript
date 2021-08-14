import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const {
  // DB_USER,
  // DB_HOST,
  // DB_PASS,
  // DB_PORT,
  // DB_NAME,
  DB_URL
} = process.env;

const config: ConnectionOptions = {
    "type": "postgres",
    // "host": DB_HOST,
    // "port": Number(DB_PORT),
    // "username": DB_USER,
    // "password": DB_PASS,
    // "database": DB_NAME,
    "url": DB_URL,
    "synchronize": true,
    "logging": true,
    "entities": [`src/database/entity/**/*.{ts, js}`],
    "migrations": [`src/database/migration/**/*.{ts, js}`],
    "subscribers": [`src/database/subscriber/**/*.{ts, js}`],
    "cli": {
      "entitiesDir": "src/database/entity",
      "migrationsDir": "src/database/migration",
      "subscribersDir": "src/database/subscriber"
    }
};

export = config;