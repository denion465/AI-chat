FROM ubuntu:24.04

RUN apt-get update && apt-get install -y libgomp1 libcurl4 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

COPY docker/bin/llama-cli /bin/

ENTRYPOINT ["llama-cli"]

CMD ["--hf-repo", "MaziyarPanahi/Qwen2-7B-Instruct-GGUF", "--hf-file", "Qwen2-7B-Instruct.Q2_K.gguf", "-p", "You are a helpful assistant", "--conversation"]
