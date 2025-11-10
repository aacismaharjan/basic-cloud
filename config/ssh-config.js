import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const sshConfig = {
  host: process.env.SSH_HOST,
  port: parseInt(process.env.SSH_PORT || '22', 10),
  username: process.env.SSH_USER,
  readyTimeout: parseInt(process.env.SSH_TIMEOUT_MS || '25000', 10),
  // prefer key-based auth:
  // privateKey: process.env.SSH_KEY_PATH ? fs.readFileSync(process.env.SSH_KEY_PATH) : undefined,
  password: process.env.SSH_PASS,
};