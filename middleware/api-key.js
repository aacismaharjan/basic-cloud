import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;

export function requireApiKey(req, res, next) {
  const key = req.header('x-api-key');
  if (!key || key !== API_KEY)
    return res.status(401).json({ error: 'Unauthorized' });
  next();
}