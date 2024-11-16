import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { WebSocketCommunication } from '../src/websocket.js';

describe('#WebSocket Test Suit', () => {
  let mockWebSocketServer;
  let mockDockerProcess;
  let mockWebSocketInstance;

  beforeEach(() => {
    mockWebSocketServer = {
      on: jest.fn((_event, callback) => {
        mockWebSocketInstance = {
          on: jest.fn(),
          send: jest.fn(),
        };
        callback(mockWebSocketInstance);
      }),
    };

    mockDockerProcess = {
      stdin: {
        write: jest.fn(),
      },
      stdout: {
        on: jest.fn(),
      },
    };

    const webSocketCommunication = new WebSocketCommunication(mockWebSocketServer, mockDockerProcess);
    webSocketCommunication.handleWebSocketCommunication();
  });

  it('should write to Docker Process stdin when receiving a message on WebSocket', () => {
    const mockMessageCallback = mockWebSocketInstance.on.mock.calls.find(
      ([event]) => event === 'message',
    )[1];

    const message = 'Input Test';
    mockMessageCallback(message);

    expect(mockDockerProcess.stdin.write).toHaveBeenCalledWith(`${message} \n`);
  });

  it('should not send a message to the user if it is the first stdout reply', () => {
    const mockStdoutCallback = mockDockerProcess.stdout.on.mock.calls.find(
      ([event]) => event === 'data',
    )[1];

    const userReply = 'User Reply';
    const dataChunk1 = 'Output';
    const dataChunk2 = 'message \n';

    mockStdoutCallback(dataChunk1);
    mockStdoutCallback(dataChunk2);

    expect(mockWebSocketInstance.send).not.toHaveBeenCalledWith(userReply);
  });

  it('should send complete messages via WebSocket when processing DockerProcess stdout', () => {
    const mockStdoutCallback = mockDockerProcess.stdout.on.mock.calls.find(
      ([event]) => event === 'data',
    )[1];

    const userReply = 'User Reply';
    const dataChunk1 = 'Output';
    const dataChunk2 = 'message \n';

    mockStdoutCallback(userReply);
    mockStdoutCallback(dataChunk1);
    mockStdoutCallback(dataChunk2);

    const expectedMessage = `${dataChunk1}${dataChunk2}`.trim();

    expect(mockWebSocketInstance.send).toHaveBeenCalledWith(expectedMessage);

  });

  it('should close the WebSocket when receiving the event to close it', () => {
    const mockCloseCallback = mockWebSocketInstance.on.mock.calls.find(
      ([event]) => event === 'close',
    )[1];

    mockCloseCallback();

    expect(mockWebSocketInstance.send).not.toHaveBeenCalled();
  });
});
