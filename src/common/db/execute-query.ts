import { pool } from './db.config';

export const executeQuery = async (
  query: string,
  params: any[] = []
) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
};