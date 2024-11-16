class WebSocketCommunication {
  #ws;
  #wsClient = null;
  #dockerProcess;
  #isReplyUserMessage = true;
  #accumulatedData = '';

  constructor(ws, dockerProcess) {
    this.#ws = ws;
    this.#dockerProcess = dockerProcess;
  }

  handleWebSocketCommunication() {
    this.#ws.on('connection', (ws) => this.#handleWebSocketConnection(ws));
    this.#dockerProcess.stdout.on('data', (data) => this.#handleAIOutput(data));
  }

  #handleWebSocketConnection(ws) {
    this.#wsClient = ws;
    console.log('WebSocket connection established on server.');

    ws.on('close', () => {
      this.#wsClient = null;
      console.log('WebSocket connection closed.');
    });

    ws.on('message', (message) => {
      this.#sendMessageToAI(message.toString());
    });
  }

  #sendMessageToAI(message) {
    this.#dockerProcess.stdin.write(`${message} \n`);
  }

  #handleAIOutput(data) {
    if (this.#isReplyUserMessage) {
      this.#isReplyUserMessage = false;
      return;
    }

    this.#accumulatedData += data.toString();

    if (this.#accumulatedData.includes('\n')) {
      const completeMessage = this.#accumulatedData.trim();

      this.#wsClient && this.#wsClient.send(completeMessage);
      this.#accumulatedData = '';
      this.#isReplyUserMessage = true;
    }
  }
}

export {
  WebSocketCommunication,
};
