import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'online-learning-api',
  password: 'yuvi123',
  port: 5432,
});