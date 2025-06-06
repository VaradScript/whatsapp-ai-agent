const venom = require('venom-bot');
const axios = require('axios');
const express = require('express');

const app = express();
app.use(express.json());
let client;

// --- Function to Process a Message ---
async function processMessage(client, message, isSimulatedSelf = false) {
  console.log("Processing message:", message);
  if (isSimulatedSelf) {
    console.log("This is a simulated self message (from Express endpoint).");
  } else {
    console.log("This message was received via venom-bot onMessage event.");
  }

  if (message.body && message.body.trim() !== '') {
    try {
      const response = await axios.post('http://localhost:5678/webhook-test/webhook/whatsapp', {
        body: message.body,
        from: message.from,
      });

      if (response.data && response.data.reply) {
        console.log('Reply from AI:', response.data.reply);
        await client.sendText(message.from, response.data.reply);
        console.log('Message sent successfully');
      } else {
        console.log('No reply field in response data:', response.data);
      }
    } catch (error) {
      console.error('Error processing message or sending reply:', error.message);
    }
  } else {
    console.log("Received an empty message; skipping processing.");
  }
}

// --- Venom-bot Initialization ---
venom
  .create({
    session: 'ai-agent-session',
    headless: false, // set to false to show browser for QR scan
  })
  .then((venomClient) => {
    client = venomClient;
    console.log("Venom-bot client initialized.");
    startVenomClient(client);
  })
  .catch((err) => {
    console.error("Error initializing venom:", err);
  });

// --- Start Listening for WhatsApp Messages ---
function startVenomClient(client) {
  client.onMessage(async (message) => {
    console.log("Received message event:", message);

    if (message.fromMe) {
      console.log("Self message detected via onMessage event (this usually should not happen).");
    } else {
      await processMessage(client, message, false);
    }
  });
}

// --- Express Endpoint for Simulated Self Messages ---
app.post('/simulate-self', async (req, res) => {
  const simulatedMessage = req.body;
  if (!simulatedMessage || !simulatedMessage.body || !simulatedMessage.from) {
    return res.status(400).send({ error: "Please provide 'body' and 'from' in the request." });
  }
  console.log("Simulated self message received via Express endpoint:", simulatedMessage);
  await processMessage(client, simulatedMessage, true);
  res.send({ status: "Simulated self message processed." });
});

// --- Start the Express Server ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
