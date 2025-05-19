import { getTable } from '../models/test.model.js';

export const showMessages = async (req, res) => {
  try {
    const tableData = await getTable('messages');
    res.status(200).json(tableData);
  } catch (error) {
    console.log('Error in showMessages: ', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const showUsers = async (req, res) => {
  try {
    const tableData = await getTable('users');
    res.status(200).json(tableData);
  } catch (error) {
    console.log('Error in showUsers: ', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
