import { Server } from 'ws';
import { buildPortfolio } from '../services/portfolio.service';

export const initWebSocket = (server: any) => {
  const wss = new Server({ server });

  console.log('WebSocket server initialized');

  wss.on('connection', async (ws) => {
    const portfolio = await buildPortfolio();
    ws.send(JSON.stringify(portfolio));

    const interval = setInterval(async () => {
      const updated = await buildPortfolio();
      ws.send(JSON.stringify(updated));
    }, 15000);

    ws.on('close', () => clearInterval(interval));
  });
};
