import { describe, expect, it, jest, beforeEach } from '@jest/globals';

describe('startDockerProcess', () => {
  let dockerProcess;

  beforeEach(async () => {
    jest.unstable_mockModule('node:child_process', () => ({
      spawn: jest.fn().mockReturnValue({
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn(),
      }),
    }));

    const { startDockerProcess } = await import('../src/docker.js');
    dockerProcess = startDockerProcess();
  });

  it('should run docker command in child_process spawn and return it', async () => {
    const { spawn } = await import('node:child_process');

    expect(spawn).toHaveBeenCalledWith(
      'docker',
      ['start', '-i', 'ai-chat'],
      { stdio: 'pipe' },
    );
    expect(dockerProcess.on).toBeDefined();
    expect(dockerProcess.stdout.on).toBeDefined();
    expect(dockerProcess.stderr.on).toBeDefined();
  });
});
