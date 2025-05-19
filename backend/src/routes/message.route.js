import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUserForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

// get all users for the sidebar of homepage
router.get('/user', protectRoute, getUserForSidebar);

// get messages btw two users
router.get('/:id', protectRoute, getMessages);

// send messages
router.get('/send/:id', protectRoute, sendMessage);

export default router;
