import { WebSocketServer } from 'ws';
import { buildPortfolio } from '../services/portfolio.service';

let wss: WebSocketServer | null = null;

// Initialize WebSocket server
export const initWebSocket = (server: any) => {
  wss = new WebSocketServer({ server });

  console.log('WebSocket server initialized');

  wss.on('connection', async (ws) => {
    console.log('Client connected to WebSocket');

    // Send initial data immediately
    try {
      const portfolio = await buildPortfolio();
      ws.send(JSON.stringify(portfolio));
    } catch (err) {
      console.error('WS initial send error:', err);
    }

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  // Broadcast updates every 15 seconds
  setInterval(async () => {
    if (!wss) return;

    try {
      const portfolio = await buildPortfolio();
      const data = JSON.stringify(portfolio);

      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(data);
        }
      });
    } catch (err) {
      console.error('WS broadcast error:', err);
    }
  }, 15000);
};
