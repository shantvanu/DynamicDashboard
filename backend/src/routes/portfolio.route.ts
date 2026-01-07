import { Router } from 'express';
import { buildPortfolio } from '../services/portfolio.service';

const router = Router();

// GET /api/portfolio
router.get('/', async (_req, res) => {
  try {
    const portfolioData = await buildPortfolio();
    res.json(portfolioData);
  } catch (error) {
    console.error('Error building portfolio:', error);
    res.status(500).json({ message: 'Failed to build portfolio' });
  }
});

export default router;
