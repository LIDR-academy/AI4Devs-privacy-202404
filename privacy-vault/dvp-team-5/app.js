const express = require("express");
const app = express();
//const natural = require("natural");
//const tokenizer = new natural.RegexpTokenizer({ pattern: /\s+/ });

// Función para anonimizar un mensaje
function anonimizarMensaje(mensaje) {
    // Definir expresiones regulares para identificar datos sensibles
    const regexNombres = /([A-Z][a-z]+)\s([A-Z][a-z]+)/g; // Expresión regular para nombres
    const regexCorreos = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g; // Expresión regular para correos electrónicos
    const regexFechas = /\d{1,2}\/\d{1,2}\/\d{2,4}/g; // Expresión regular para fechas en formato dd/mm/aaaa
    const regexTelefonos = /\+\d{1,3}\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g; // Expresión regular para números de teléfono

    // Identificar nombres en el mensaje y generar tokens
    const nombresAnonimos = mensaje.replace(regexNombres, "NOMBRE_ANONIMO");

    // Identificar correos electrónicos en el mensaje y generar tokens
    const correosAnonimos = nombresAnonimos.replace(regexCorreos, "EMAIL_ANONIMO");

    // Identificar fechas en el mensaje y generar tokens
    const fechasAnonimas = correosAnonimos.replace(regexFechas, "FECHA_ANONIMA");

    // Identificar números de teléfono en el mensaje y generar tokens
    const telefonosAnonimos = fechasAnonimas.replace(regexTelefonos, "TELEFONO_ANONIMO");

    // Devolver el mensaje anonimizado
    return telefonosAnonimos;
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
