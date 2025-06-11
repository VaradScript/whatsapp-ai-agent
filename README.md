# 💬 WhatsApp AI Companion with n8n + OpenRouter

This project is a lightweight conversational AI agent built in [n8n](https://n8n.io/), powered by [OpenRouter's](https://openrouter.ai/) Gemini 2.5 Pro model.  
It receives WhatsApp messages via webhook, processes them with an AI model, and responds in real-time.

> 🔧 Ideal for building WhatsApp bots, virtual companions, or basic assistants without writing a backend server.

---

## 🧠 What It Does

- ✅ Accepts **incoming WhatsApp messages** (via POST request)
- 🧠 Extracts the message content and sender
- 🗣 Uses **Gemini 2.5 Pro (via OpenRouter)** to generate responses
- 🔁 Sends the AI-generated message back through the webhook

---

## 🖼 Workflow Preview

![Workflow Diagram](screenshots/wa.png)

---
# 🐳 Running n8n Locally with Docker(Install docker software to run the workflow)

You can run n8n locally using Docker with persistent data by mounting your `.n8n` directory.

### 🧱 Docker Command

```bash
docker run -it --rm -p 5678:5678 -v C:\Users\gamin\.n8n:/home/node/.n8n n8nio/n8n     **add your path
```
🚀 Access the Editor
```bash
http://localhost:5678
```
## 🔄 Step-by-Step Workflow

1. **Webhook Node (`/webhook/whatsapp`)**
   - Receives POST request from your WhatsApp provider (like Meta, Twilio, or Baileys)
   - Payload contains message content (`body`) and sender info (`from`)

2. **Extract Message**
   - A function node that pulls out:
     - `message.body`
     - `message.from`

3. **Basic LLM Chain**
   - Uses a predefined instruction: `"You are a helpful AI companion"`
   - Sends message text to Gemini 2.5 via the next node

4. **OpenRouter Chat Model**
   - Gemini 2.5 Pro (via OpenRouter)
   - Processes and replies with conversational text

5. **Return AI Reply**
   - Captures AI output and formats it into a response object

6. **Respond to Webhook**
   - Sends the response back to your WhatsApp bridge (or direct client)

---

# 💬 WhatsApp AI Bot (Node.js Version)

This is a local WhatsApp chatbot built using **Node.js** 
It connects to WhatsApp Web via a QR code and responds with AI-generated messages using OpenAI or OpenRouter.

---

## 🛠 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Varadscript/whatsapp-ai-agent.git
cd whatsapp-ai-agent/WhatsApp-Bot
```

---
2. Install Dependencies
   
```bash
npm install
```

🚀 Run the WhatsApp Bot
```bash
node bot.js
```

node bot.js
✅ First-Time Setup
When you run the bot for the first time, it will open a QR code in your terminal.

📱 Scan the QR code using your WhatsApp mobile app:

Go to WhatsApp > Linked Devices > Link a Device

Once scanned, the session will be saved inside the tokens/ folder — no need to scan again next time.

🤖 AI Integration
The AI_Bot.json file contains the AI prompt or personality config

Make sure your bot.js is connected to:

OpenAI API key OR

OpenRouter API key



🧪 Example Message Flow
User sends: “Hi, who are you?”

Bot replies: “I'm your friendly AI assistant. How can I help you today?”



****

