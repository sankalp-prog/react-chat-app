import db from '../lib/db.js';

const ALLOWED_COLUMNS = ['email', 'id', 'profile_pic'];

function validateColumnName(columnName) {
  if (!ALLOWED_COLUMNS.includes(columnName)) {
    return 'Invalid';
  }
  return columnName;
}

export async function addNewUser(name, email, pwd) {
  const result = await db.query('INSERT INTO users (email, full_name, password) VALUES ($1, $2, $3) RETURNING id, email, full_name, profile_pic', [email, name, pwd]);
  return result?.rows?.[0];
}

export async function findUser(columnHeader, value) {
  // the below doesn't work cuz you can't insert column names using string interpolation.... either use an ORM like pg-promise or manually check before adding
  // const result = await db.query('SELECT * FROM users WHERE $1 = $2', [columnHeader, value]);

  const validatedColumn = validateColumnName(columnHeader);

  if (validatedColumn === 'Invalid') {
    throw new Error('Invalid column name');
  }

  const result = await db.query(`SELECT * FROM users WHERE ${validatedColumn} = $1`, [value]);
  // if you don't want to fetch the hashed pwd then use the below query -
  // const result = await db.query('SELECT * FROM users WHERE $1 = $2 RETURN id, email, full_name, profile_pic', [columnHeader, value]);
  return result?.rows?.[0];
}

// TODO: need to test when frontend is made
export async function findAndUpdate(userId, headerOfColumnToUpdate, updatedValue) {
  const validatedColumn = validateColumnName(headerOfColumnToUpdate);

  if (validatedColumn === 'Invalid') {
    throw new Error('Invalid column name');
  }

  const result = await db.query(`UPDATE users SET ${validatedColumn} = $1 WHERE id = $2`, [updatedValue, userId]);
  return result?.rows?.[0];
}
