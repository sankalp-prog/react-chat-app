import cloudinary from '../lib/cloudinary.js';
import { fetchMessages, filterUsers, inputMessageInDB } from '../models/message.model.js';

export const getUserForSidebar = async (req, res) => {
  const senderId = req.user.id;
  console.log('getUserForSidebar(): ', req.user);
  try {
    const usersForSidebar = await filterUsers('id', senderId);
    res.status(200).json(usersForSidebar);
  } catch (error) {
    console.log('Error in getUserForSidebar: ', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.user.id;

    const messages = await fetchMessages(senderId, userToChat);

    res.status(200).json(messages);
  } catch (error) {
    console.log('Error in getMessages controller: ', error.messages);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let imageUrl;
    // yet to test the images part
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = {
      senderId,
      receiverId,
      text,
      image: imageUrl,
    };

    await inputMessageInDB(newMessage);

    // TODO: realtime functionality goes here => socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
