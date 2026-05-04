import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { verifyJWT } from './middleware/authContext.js';
import approveRoutes from './routes/execution/approve.js';
import executeRoutes from './routes/execution/execute.js';
import historyRoutes from './routes/audit/history.js';
import operationDetailRoutes from './routes/audit/operationDetail.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/execution', approveRoutes);
app.use('/api/execution', executeRoutes);
app.use('/api/audit', historyRoutes);
app.use('/api/audit', operationDetailRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
