import * as path from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config({ path: 'src/../.env' });

const configDatabase = process.env.DATABASE_URL
  ? { url: process.env.DATABASE_URL, ssl: true }
  : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    };
const options: TypeOrmModuleOptions = {
  type: 'postgres',
  ...configDatabase,
  logging: true,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
  cli: {
    // entitiesDir: 'src/db/models',
    migrationsDir: 'src/db/migrations',
  },
};

module.exports = options;
