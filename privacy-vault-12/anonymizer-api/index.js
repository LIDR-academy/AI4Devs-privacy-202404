// Importar las dependencias
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { SyncRedactor } = require('redact-pii');

// Crear la aplicación Express
const app = express();
const port = 3000;

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(':memory:'); // Usando una base de datos en memoria para este ejemplo

// Crear tabla para almacenar los tokens y datos sensibles
db.serialize(() => {
  db.run("CREATE TABLE tokens (id INTEGER PRIMARY KEY, token TEXT, data TEXT)");
});

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Crear un redactor para anonimizar datos
const redactor = new SyncRedactor();

// Endpoint para anonimizar datos sensibles
app.post('/anonymize', (req, res) => {
  const message = req.body.data;

  // Anonimizar el mensaje utilizando el redactor
  const anonymizedMessage = redactor.redact(message);

  // Almacenar el token y el dato original en la base de datos
  const stmt = db.prepare("INSERT INTO tokens (token, data) VALUES (?, ?)");
  const token = generateToken(); // Función para generar un token único
  stmt.run(token, message);
  stmt.finalize();

  res.json({ anonymizedMessage, token });
});

// Endpoint para desanonimizar datos sensibles
app.post('/deanonymize', (req, res) => {
  const token = req.body.token;

  // Buscar el dato original asociado al token en la base de datos
  db.get("SELECT data FROM tokens WHERE token = ?", [token], (err, row) => {
    if (err || !row) {
      res.status(404).json({ error: 'Token not found' });
    } else {
      const originalData = row.data;
      res.json({ originalData });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Función para generar un token único
function generateToken() {
  // Implementación de generación de token único, puede ser un UUID u otro método seguro
  // Por simplicidad, usaremos un valor aleatorio para este ejemplo
  return Math.random().toString(36).substr(2, 10);
}
