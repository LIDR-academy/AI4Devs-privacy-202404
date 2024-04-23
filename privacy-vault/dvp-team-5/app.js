const express = require("express");
const app = express();
const natural = require("natural");
const tokenizer = new natural.RegexpTokenizer({ pattern: /\s+/ });

// Función para anonimizar un mensaje
function anonimizarMensaje(mensaje) {
  const tokens = tokenizer.tokenize(mensaje);
  const palabrasSensibles = ["Nombre", "telefono", "dirección"]; // Ejemplo de palabras sensibles
  const mensajeAnonimizado = tokens
    .map((token) => {
      if (palabrasSensibles.includes(token)) {
        return "***"; // Tokenizar datos sensibles
      } else {
        return token;
      }
    })
    .join(" ");

  return mensajeAnonimizado;
}

app.use(express.json()); // Middleware para parsear JSON

// Endpoint POST /anonymize
app.post("/anonymize", (req, res) => {
  const { message } = req.body;
  // Aquí agregarías la lógica para anonimizar el mensaje
  const anonymizedMessage = anonimizarMensaje(message); // Temporalmente sin modificar
  res.json({ anonymizedMessage });
});

// Endpoint POST /deanonymize
app.post("/deanonymize", (req, res) => {
  const { message } = req.body;
  // Aquí agregarías la lógica para desanonimizar el mensaje
  const deanonymizedMessage = message; // Temporalmente sin modificar
  res.json({ deanonymizedMessage });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
