import { Client } from 'ssh2';
import { sshConfig } from '../config/ssh-config.js';
import { allowedActions } from '../utils/allowed-actions.js';
import { validationResult } from 'express-validator';

export const executeSSH = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const action = req.body.action;
  const cmd = allowedActions[action].cmd;

  const conn = new Client();
  let stdout = '';
  let stderr = '';
  let responded = false;

  const respondOnce = (status, payload) => {
    if (!responded) {
      responded = true;
      res.status(status).json(payload);
      try { conn.end(); } catch {}
    }
  };

  conn.on('ready', () => {
    conn.exec(cmd, (err, stream) => {
      if (err)
        return respondOnce(500, { error: 'SSH exec error', details: err.message });

      stream.on('data', chunk => (stdout += chunk.toString()));
      stream.stderr.on('data', chunk => (stderr += chunk.toString()));

      stream.on('close', (code, signal) => {
        respondOnce(200, { action, command: cmd, exitCode: code, signal, stdout, stderr });
      });
    });
  }).on('error', err => {
    respondOnce(500, { error: 'SSH connection error', details: err.message });
  }).connect(sshConfig);
};
