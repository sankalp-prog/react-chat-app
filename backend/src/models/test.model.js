import db from '../lib/db.js';

export const getTable = async (tableName) => {
  const result = await db.query(`SELECT * from ${tableName}`);
  return result?.rows;
};
