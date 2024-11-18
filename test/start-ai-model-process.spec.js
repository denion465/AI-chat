import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('#startAIModelProcess Test Suite', () => {
  let _aiProcess;

  beforeEach(async () => {
    jest.unstable_mockModule('node:child_process', () => ({
      spawn: jest.fn().mockReturnValue({
        stdout: { on: jest.fn() },
        stdin: {on: jest.fn()},
      }),
    }));

    const { startAIModelProcess } = await import('../src/start-ai-model-process.js');
    _aiProcess = startAIModelProcess();
  });

  it('should run llama command in child_process spawn and return it', async () => {
    const { spawn } = await import('node:child_process');
    const modelPath = resolve(__dirname, '../ai-models/Qwen2-7B-Instruct.Q2_K.gguf');

    expect(spawn).toHaveBeenCalledWith(
      'llama-cli',
      ['-m', modelPath, '-p', 'You are a helpful assistant.', '--conversation'],
      { stdio: 'pipe' },
    );
    expect(_aiProcess.stdin).toBeDefined();
    expect(_aiProcess.stdout.on).toBeDefined();
  });
});
