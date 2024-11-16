import { spawn } from 'node:child_process';

function startDockerProcess() {
  const command = 'docker';
  const args = ['start', '-i', 'ai-chat'];
  const dockerProcess = spawn(command, args, { stdio: 'pipe' });

  return dockerProcess;
}

export {
  startDockerProcess,
};
