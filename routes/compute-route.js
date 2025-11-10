import express from 'express';
import { body } from 'express-validator';
import { requireApiKey } from '../middleware/api-key.js';
import * as computeController from '../controllers/compute-controller.js';

const router = express.Router();

router.post(
  '/compute',
  requireApiKey,
  body('operation').isString().trim().isIn(['add', 'subtract', 'multiply', 'divide']),
  body('a').isNumeric(),
  body('b').isNumeric(),
  computeController.executeOperation
);

export default router;
