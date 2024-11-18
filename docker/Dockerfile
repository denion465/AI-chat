FROM ubuntu:24.04

WORKDIR /app

ADD https://deb.nodesource.com/setup_22.x /tmp/setup_22.x

RUN chmod +x /tmp/setup_22.x && \
  /tmp/setup_22.x && \
  apt-get install -y libcurl4 libgomp1 nodejs && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /tmp/setup_22.x && \
  mkdir -p /app/ai-models

COPY package.json package-lock.json /app/

RUN npm ci --silent

COPY . /app
COPY docker/bin/llama-cli /bin/

ADD https://huggingface.co/MaziyarPanahi/Qwen2-7B-Instruct-GGUF/resolve/main/Qwen2-7B-Instruct.Q2_K.gguf?download=true \
  /app/ai-models/Qwen2-7B-Instruct.Q2_K.gguf

EXPOSE 8080

CMD [ "npm", "start" ]
