import fs from 'fs';
import path from 'path';
import winston from 'winston';

// Ensure logs directory exists
const logDir = 'logs';
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'app.log'), maxsize: 5 * 1024 * 1024 }), // 5MB rotation
    new winston.transports.Console()
  ]
});

// 🔹 Custom Express middleware to log request + response
export const requestResponseLogger = (req, res, next) => {
  const start = Date.now();
  const { method, url, headers, body } = req;

  // Log request
  logger.info(`➡️ [REQUEST] ${method} ${url} | Headers: ${JSON.stringify(headers)} | Body: ${JSON.stringify(body)}`);

  // Capture original res.send to hook into response
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - start;
    logger.info(`⬅️ [RESPONSE] ${method} ${url} | Status: ${res.statusCode} | Time: ${duration}ms | Body: ${data}`);
    return originalSend.apply(res, arguments);
  };

  next();
};
