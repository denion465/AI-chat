import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function startAIModelProcess() {
  const modelPath = resolve(__dirname, '../ai-models/Qwen2-7B-Instruct.Q2_K.gguf');
  const command = 'llama-cli';
  const args = ['-m', modelPath, '-p', 'You are a helpful assistant.', '--conversation'];
  const aiProcess = spawn(command, args, { stdio: 'pipe' });

  return aiProcess;
}

export {
  startAIModelProcess,
};
