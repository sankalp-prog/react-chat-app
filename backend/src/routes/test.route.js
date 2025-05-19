import express from 'express';
// import { protectRoute } from '../middleware/auth.middleware';
import { showMessages, showUsers } from '../controllers/test.controller.js';

const router = express.Router();

// get everything from the messages table
router.get('/messages', showMessages);

// get everything from the users table
router.get('/users', showUsers);

export default router;
