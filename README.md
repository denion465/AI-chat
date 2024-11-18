# AI Chat Application 🚀

![preview](https://github.com/user-attachments/assets/8bfc15aa-4b12-43d4-a6f3-1ea8b5c575ac)

Uma aplicação de chat com IA, que roda inteiramente dentro de um ambiente Docker. Esta aplicação permite interações em tempo real com um modelo de inteligência artificial por meio de WebSockets.

---

## 🛠️ Recursos

- **Chat com IA:** Interação em tempo real com um modelo de linguagem.
- **Containerizado:** Toda a aplicação roda dentro de contêineres Docker, facilitando a instalação e a execução.
- **Escalável:** Configuração simples para rodar em diferentes ambientes.
- **WebSocket:** Comunicação rápida e eficiente entre cliente e servidor.

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
