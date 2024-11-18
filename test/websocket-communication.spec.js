import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { WebSocketCommunication } from '../src/websocket-communication.js';

describe('#WebSocketCommunication Test Suite', () => {
  let _mockWebSocketServer;
  let _mockAIProcess;
  let _mockWebSocketInstance;

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Silenced the console.log

    _mockWebSocketServer = {
      on: jest.fn((_event, callback) => {
        _mockWebSocketInstance = {
          on: jest.fn(),
          send: jest.fn(),
        };
        callback(_mockWebSocketInstance);
      }),
    };

    _mockAIProcess = {
      stdin: {
        write: jest.fn(),
      },
      stdout: {
        on: jest.fn(),
      },
    };

    const webSocketCommunication = new WebSocketCommunication(_mockWebSocketServer, _mockAIProcess);
    webSocketCommunication.handleWebSocketCommunication();
  });

  it('should write to AI Process stdin when receiving a message on WebSocket', () => {
    const mockMessageCallback = _mockWebSocketInstance.on.mock.calls.find(
      ([event]) => event === 'message',
    )[1];

    const message = 'Input Test';
    mockMessageCallback(message);

    expect(_mockAIProcess.stdin.write).toHaveBeenCalledWith(`${message} \n`);
  });

  it('should not send a message to the user if it is the first stdout reply', () => {
    const mockStdoutCallback = _mockAIProcess.stdout.on.mock.calls.find(
      ([event]) => event === 'data',
    )[1];

    const userReply = 'User Reply';
    const dataChunk1 = 'Output';
    const dataChunk2 = 'message \n';

    mockStdoutCallback(dataChunk1);
    mockStdoutCallback(dataChunk2);

    expect(_mockWebSocketInstance.send).not.toHaveBeenCalledWith(userReply);
  });

  it('should send complete messages via WebSocket when processing AI stdout', () => {
    const mockStdoutCallback = _mockAIProcess.stdout.on.mock.calls.find(
      ([event]) => event === 'data',
    )[1];

    const userReply = 'User Reply';
    const dataChunk1 = 'Output';
    const dataChunk2 = 'message \n';

    mockStdoutCallback(userReply);
    mockStdoutCallback(dataChunk1);
    mockStdoutCallback(dataChunk2);

    const expectedMessage = `${dataChunk1}${dataChunk2}`.trim();

    expect(_mockWebSocketInstance.send).toHaveBeenCalledWith(expectedMessage);
  });

  it('should close the WebSocket when receiving the event to close it', () => {
    const mockCloseCallback = _mockWebSocketInstance.on.mock.calls.find(
      ([event]) => event === 'close',
    )[1];

    mockCloseCallback();

    expect(_mockWebSocketInstance.send).not.toHaveBeenCalled();
  });
});
