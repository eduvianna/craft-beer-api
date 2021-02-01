import * as path from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config({ path: 'src/../.env' });

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: true,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
  cli: {
    // entitiesDir: 'src/db/models',
    migrationsDir: 'src/db/migrations',
  },
};

module.exports = options;
