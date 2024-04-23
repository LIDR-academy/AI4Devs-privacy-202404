// index.js

// Importar los módulos necesarios
const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const nlp = require('compromise');
const datePlugin = require('compromise-dates');
nlp.plugin(datePlugin);

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dataPrivacyVault');

// Definir el esquema del documento
const vaultSchema = new mongoose.Schema({
    original: String,
    anonymized: String,
    type: String // Añadir esta línea para incluir el campo 'type'
});

// Definir el modelo basado en el esquema
const Vault = mongoose.model('Vault', vaultSchema);


// Crear una instancia de Express
const app = express();
const port = 3000; 

// Middleware para analizar JSON en las solicitudes
app.use(express.json());

// Función para anonimizar un mensaje
function anonymizeMessage(message) {
    // Expresiones regulares para buscar teléfonos, emails, nombres y apellidos
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const nameRegex = /\b[A-Z][a-z]*\b/g;
    const dateRegex = /\b(0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](20)?\d\d\b/g; // Fechas de nacimiento en formato dd/mm/yyyy

    let originalMessage = message;
    // Array para almacenar los datos encontrados
    const dataFound = {
        phones: [],
        emails: [],
        names: [],
        dates: []
    };

    // Anonimizar y almacenar teléfonos
    message = message.replace(phoneRegex, (match) => {
        const token = anonymize(match);
        dataFound.phones.push({ original: match, anonymized: token });
        return token;
    });

    // Anonimizar y almacenar emails
    message = message.replace(emailRegex, (match) => {
        const token = anonymize(match);
        dataFound.emails.push({ original: match, anonymized: token });
        return token;
    });

    // Anonimizar y almacenar nombres y apellidos
    message = message.replace(nameRegex, (match) => {
        const token = anonymize(match);
        dataFound.names.push({ original: match, anonymized: token });
        return token;
    });

    // Anonimizar y almacenar fechas de nacimiento
    /*message = message.replace(dateRegex, (match) => {
        const token = anonymize(match);
        dataFound.dates.push({ original: match, anonymized: token });
        return token;
    });*/

    // Uso de compromise para fechas a modo test de la funcionalidad
    const doc = nlp(originalMessage);
    const people = doc.people().out('array');
    const places = doc.places().out('array');
    const dates = doc.dates().out('array');

    dates.forEach(date => {
        // Buscar la fecha en el mensaje original para reemplazarla
        message = message.replace(new RegExp(date, 'g'), (match) => {
            const token = anonymize(match);
            dataFound.dates.push({ original: match, anonymized: token });
            return token;
        });
    });



    // Almacenar los datos en MongoDB
    saveToMongo(dataFound.phones, 'phone');
    saveToMongo(dataFound.emails, 'email');
    saveToMongo(dataFound.names, 'name');
    saveToMongo(dataFound.dates, 'date');

    

    // Aquí puedes hacer uso de dataFound según sea necesario

    return message;
}

// Función para anonimizar un dato específico (aquí puedes implementar tu lógica de anonimización)
function anonymize(data) {
    // Generar un token único de 8 caracteres para anonimizar el dato
    const token = crypto.randomBytes(4).toString('hex');
    console.log(token);
    return token;
}

// Función para de-anonimizar un mensaje
async function deanonymizeMessage(message) {
    // Expresión regular para buscar tokens en el mensaje
    const tokenRegex = /(?:\b[\da-fA-F]{8}\b)/g;

    // Buscar tokens en el mensaje
    const tokens = message.match(tokenRegex);

    if (!tokens || tokens.length === 0) {
        // No se encontraron tokens, devolver el mensaje original
        return message;
    }

    // Crear un objeto para almacenar las correspondencias de token-valor
    const tokenValueMap = {};

    // Buscar los valores originales en la base de datos para cada token
    for (const token of tokens) {
        // Buscar en la base de datos el valor original correspondiente al token
        const vaultData = await Vault.findOne({ anonymized: token });
        if (vaultData) {
            // Almacenar la correspondencia token-valor
            tokenValueMap[token] = vaultData.original;
        }
    }

    // De-anonimizar el mensaje reemplazando los tokens por sus valores originales
    let deAnonymizedMessage = message;
    for (const [token, value] of Object.entries(tokenValueMap)) {
        deAnonymizedMessage = deAnonymizedMessage.replace(new RegExp(token, 'g'), value);
    }

    return deAnonymizedMessage;
}


// Función para almacenar los datos en MongoDB
function saveToMongo(dataArray, type) {
    dataArray.forEach(data => {
        const newData = new Vault({
            original: data.original,
            anonymized: data.anonymized,
            type: type
        });
        newData.save();
    });
}

// Ruta para anonimizar el mensaje
app.post('/anonymize', (req, res) => {
    // Obtener el mensaje del cuerpo de la solicitud
    const { message } = req.body;

    // Anonimizar el mensaje utilizando la función definida anteriormente
    const anonymizedMessage = anonymizeMessage(message);

    // Enviar la respuesta con el mensaje anonimizado
    res.json({ anonymizedMessage });
});

// Endpoint POST para de-anonimizar un mensaje
app.post('/deanonymize', async (req, res) => {
    try {
        // Obtener el mensaje con tokens del cuerpo de la solicitud
        const { anonymizedMessage } = req.body;

        if (!anonymizedMessage) {
            return res.status(400).json({ error: 'El parámetro "anonymizedMessage" es obligatorio' });
        }

        // De-anonimizar el mensaje
        const deAnonymizedMessage = await deanonymizeMessage(anonymizedMessage);

        // Devolver el mensaje de-anonimizado
        res.json({ originalMessage: deAnonymizedMessage });
    } catch (error) {
        console.error('Error al de-anonimizar el mensaje:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});