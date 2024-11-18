import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { WebSocketServer } from 'ws';

import { startAIModelProcess } from './start-ai-model-process.js';
import { WebSocketCommunication } from './websocket-communication.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function startServer() {
  const PORT = 8080;
  const server = createServer(async (req, res) => {
    if (req.url === '/') {
      try {
        const htmlPath = resolve(__dirname, '../html/chat.html');
        const html = await readFile(htmlPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      } catch {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading the HTML file.');
      }
    }
  });
  const aiProcess = startAIModelProcess();
  const ws = new WebSocketServer({ server });
  const wsCommunication = new WebSocketCommunication(ws, aiProcess);

  wsCommunication.handleWebSocketCommunication();

  server.listen(PORT, () => {
    console.log(`🤖 WebSocket server listening on port: ${PORT}`);
  });
};

startServer();
