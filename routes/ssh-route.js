import express from 'express';
import { body } from 'express-validator';
import { allowedActions } from '../utils/allowed-actions.js';
import { requireApiKey } from '../middleware/api-key.js';
import * as sshController  from '../controllers/ssh-controller.js';

const router = express.Router();

router.post(
  '/exec',
  requireApiKey,
  body('action').isString().trim().isIn(Object.keys(allowedActions)),
  sshController.executeSSH
);

export default router;
