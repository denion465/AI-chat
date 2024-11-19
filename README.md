# AI Chat Application 🚀

![preview](https://github.com/user-attachments/assets/8bfc15aa-4b12-43d4-a6f3-1ea8b5c575ac)

Uma aplicação de chat com IA, que roda inteiramente dentro de um ambiente Docker. Esta aplicação permite interações em tempo real com um modelo de inteligência artificial por meio de WebSockets.

---

## 🛠️ Recursos

1. **Desenvolvido com Node.js:** Backend construído com módulos nativos do Node.js, proporcionando alto desempenho e uma base sólida para extensibilidade.

2. **Chat com IA:** Oferece interação em tempo real com um modelo de linguagem avançado, proporcionando respostas rápidas e precisas para uma experiência dinâmica.

3. **WebSocket:** Utiliza WebSockets para comunicação bidirecional em tempo real entre cliente e servidor, garantindo eficiência e baixa latência na troca de dados.

4. **Containerização com Docker:** Toda a aplicação é empacotada em um container Docker, simplificando o processo de instalação, configuração e execução, além de garantir portabilidade entre diferentes ambientes.

5. **Integração com LLaMA.cpp:** Aproveita a eficiência do LLaMA.cpp para executar modelos de linguagem diretamente no ambiente local, eliminando a necessidade de dependências externas ou serviços em nuvem.

---

## 🚀 Como executar a aplicação

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado

### Opção 1: Rodar diretamente pelo Docker Hub

Execute o seguinte comando para baixar e rodar a imagem diretamente:
```bash
docker run -it --name ai-chat -p 8080:8080 denion465/ai-chat:v1
```

- Descrição:
  - ```-it```: Permite interação no terminal.
  - ```--name ai-chat```: Dá um nome ao contêiner.
  - ```-p 8080:8080```: Mapeia a porta 8080 do contêiner para a máquina local.
  - ```denion465/ai-chat:v1```: Nome e versão da imagem publicada no Docker Hub.

Pronto! A aplicação estará acessível em http://localhost:8080.

---

### Opção 2: Clonar o repositório e construir a imagem

#### 1. Clone o repositório:
```bash
git clone https://github.com/denion465/AI-chat.git
```
Entre na pasta do projeto:
```bash
cd AI-chat
```
#### 2. Construa a imagem Docker:
Use o Dockerfile incluído no projeto para criar a imagem:
```bash
docker build -t ai-chat -f ./docker/Dockerfile .
```
- ```-t``` ai-chat: Dá o nome ai-chat à imagem criada.
- ```-f``` ./docker/Dockerfile: Especifica o caminho do Dockerfile.

#### 3. Execute o contêiner com a imagem criada:

```bash
docker run -it --name ai-chat -p 8080:8080 ai-chat
```

---

## 📌 Observação
- Certifique-se de que a porta 8080 está disponível no seu sistema para evitar conflitos.

---

## ❤️ Agradecimentos
- Modelo de IA:
  - Fonte: [Hugging Face](https://huggingface.co/MaziyarPanahi/Qwen2-7B-Instruct-GGUF/)
- LLaMA.cpp:
  - Repositório oficial: [LLaMA.cpp](https://github.com/ggerganov/llama.cpp)
