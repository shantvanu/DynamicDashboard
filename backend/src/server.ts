import http from 'http';
import app from './app';
import { initWebSocket } from './websocket/socket';

import { connectRedis } from './cache/redis';

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectRedis();

    // Initialize WebSocket on same HTTP server
    initWebSocket(server);

    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Portfolio API: http://localhost:${PORT}/api/portfolio`);
      console.log(`WebSocket ready at ws://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};


startServer();
