import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';

import { startDockerProcess } from './docker.js';
import { WebSocketCommunication } from './websocket.js';

function startServer() {
  const PORT = 8080;
  const server = createServer();
  const dockerProcess = startDockerProcess();
  const ws = new WebSocketServer({ server });
  const wsCommunication = new WebSocketCommunication(ws, dockerProcess);

  wsCommunication.handleWebSocketCommunication();

  server.listen(PORT, () => {
    console.log(`🤖 WebSocket server listening on port: ${PORT}`);
  });
};

startServer();


