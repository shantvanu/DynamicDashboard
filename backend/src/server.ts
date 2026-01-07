import http from 'http';
import app from './app';
import './cache/redis';
import { initWebSocket } from './websocket/socket';


const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Portfolio API: http://localhost:${PORT}/api/portfolio`);
  console.log(`WebSocket ready at ws://localhost:${PORT}`);
});
