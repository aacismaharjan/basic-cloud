import express from 'express';
import { body } from 'express-validator';
import { requireApiKey } from '../middleware/api-key.js';
import * as messageController from '../controllers/message-controller.js';

const router = express.Router();

router.post(
  '/store',
  requireApiKey,
  body('message').isString().trim().notEmpty(),
  messageController.storeMessage
);

router.get('/messages', requireApiKey, messageController.getMessages);

export default router;
