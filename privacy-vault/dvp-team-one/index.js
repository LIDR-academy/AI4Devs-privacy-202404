const express = require('express');
const bodyParser = require('body-parser');
const { saveTxt } = require('./helpers/saveTxt'); 
const { tokenizePII } = require('./helpers/tokenizar'); 

const app = express();
const port = 3000;

function tokenizarTexto(content, tokens) {
    let textoAnonimizado = content;
    tokens.forEach(token => {
        // Usamos una expresión regular para reemplazar todas las ocurrencias de la clave
        const regex = new RegExp(token.key, 'g');
        textoAnonimizado = textoAnonimizado.replace(regex, token.value);
    });
    return textoAnonimizado;
}

// Middleware para parsear el body en formato JSON
app.use(bodyParser.json());

// Función de ejemplo para "anonimizar" el contenido
const anonimizar = (content) => {
    //TODO implementar función anonimizar;
    
    // llamar funcion para tokenizar
    const datos = tokenizePII(content);
    
    //SAVE INFO IN BD
    saveTxt(datos);

    // reemplazar tokens dentro del texto
    return tokenizarTexto(content, datos);
};

// Función de ejemplo para "desanonimizar" el contenido
const desanonimizar = (content) => {
    // TODO desanonimizar

    // detectar tokenizados

    // buscar tokens en bd

    // reemplazar valores en texto original
    return "Texto desanonimizado"
};

// Endpoint POST para anonimizar contenido
app.post('/anonimizar', (req, res) => {
    const { message } = req.body;
    const result = anonimizar(message);
    res.json({ anonimizado: result });
});

// Endpoint POST para desanonimizar contenido
app.post('/desanonimizar', (req, res) => {
    const { content } = req.body;
    const result = desanonimizar(content);
    res.json({ desanonimizado: result });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});