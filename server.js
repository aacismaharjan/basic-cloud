import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import sshRoutes from './routes/ssh-route.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 30 }));

app.use('/ssh', sshRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
