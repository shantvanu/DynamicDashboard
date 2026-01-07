import { Server as HTTPServer } from 'http';
import { WebSocketServer } from 'ws';
import { buildLivePortfolio } from '../services/portfolio.service';

export const initWebSocket = (server: HTTPServer) => {
  const wss = new WebSocketServer({ server });

  console.log('WebSocket server initialized');

  wss.on('connection', async (ws) => {
    console.log('WebSocket client connected');

    const sendPortfolio = async () => {
      try {
        const data = await buildLivePortfolio();
        ws.send(JSON.stringify(data));
      } catch (err) {
        console.error('WebSocket send failed:', err);
      }
    };

    sendPortfolio();
    const interval = setInterval(sendPortfolio, 15000);

    ws.on('close', () => {
      clearInterval(interval);
      console.log('WebSocket client disconnected');
    });
  });
};
