const express = require('express');
const { MongoClient } = require('mongodb');
const { extractPIIs, extractTokens } = require('./app/lib');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db('dataVault');
const piiCollection = database.collection('piiData');

app.post('/anonymize', async (req, res) => {
  try {
    let message = req.body.message;
    const piis = extractPIIs(message); // Implementar esta función para extraer PII
    for (const pii of piis) {
      const token = uuidv4();
      message = message.replace(pii.value, token);
      await piiCollection.insertOne({ pii: pii.value, token: token, type: pii.type });
    }
    res.json({ anonymizedMessage: message });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/deanonymize', async (req, res) => {
  try {
    let message = req.body.message;
    const tokens = extractTokens(message); // Implementar esta función para extraer tokens
    for (const token of tokens) {
      const piiData = await piiCollection.findOne({ token: token });
      if (piiData) {
        message = message.replace(token, piiData.pii);
      }
    }
    res.json({ anonymizedMessage: message });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
