import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/entities/*.js'],
  synchronize: true, // this is only for Test task, in real project it's mandatory to use migrations
  migrations: [],
  namingStrategy: new SnakeNamingStrategy(),
} as DataSourceOptions;

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);
