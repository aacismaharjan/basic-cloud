import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import sshRoutes from "./routes/ssh-route.js";
import computeRoutes from "./routes/compute-route.js";
import messageRoutes from "./routes/message-routes.js";
import { logger, requestResponseLogger } from "./middleware/logger.js";

dotenv.config();
const app = express();

app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 30 }));

app.use(requestResponseLogger);

app.use("/ssh", sshRoutes);
app.use("/ec2", computeRoutes);
app.use("/s3", messageRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  logger.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
