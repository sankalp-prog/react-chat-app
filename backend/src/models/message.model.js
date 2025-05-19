import db from '../lib/db.js';

const ALLOWED_COLUMNS = new Set(['id']);

function validateColumnName(columnName) {
  if (!ALLOWED_COLUMNS.has(columnName)) {
    return 'Invalid';
  }
  return columnName;
}

export const filterUsers = async (columnHeader, value) => {
  const validatedColumn = validateColumnName(columnHeader);

  if (validatedColumn === 'Invalid') {
    throw new Error('Invalid column name');
  }

  const result = await db.query(`SELECT id, email, full_name, profile_pic FROM users WHERE ${validatedColumn} != $1`, [value]);

  return result?.rows;
};

export const fetchMessages = async (senderId, recieverId) => {
  const result = await db.query(`SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY created_at ASC`, [senderId, recieverId]);

  return result?.rows;
};

export const inputMessageInDB = async ({ senderId, receiverId, text, image }) => {
  const result = await db.query('INSERT INTO messages (sender_id, receiver_id, text, image) VALUES ($1, $2, $3, $4)', [senderId, receiverId, text, image]);
};
