import express from 'express';
import cors from 'cors';
import portfolioRoutes from './routes/portfolio.route';

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// portfolio API
app.use('/api/portfolio', portfolioRoutes);

export default app;
