# Instrucciones para Ejecutar el Proyecto

Este proyecto utiliza Node.js y Express para ejecutarse en el puerto 3000, junto con MongoDB como base de datos. Sigue estos pasos para configurar y ejecutar el proyecto:

## Pre-requisitos

- **Node.js**: Asegúrate de tener Node.js instalado en tu sistema. Puedes verificarlo ejecutando `node -v` en tu terminal. Si no lo tienes instalado, descárgalo e instálalo desde [Node.js](https://nodejs.org/).

- **MongoDB**: Asegúrate de tener MongoDB instalado y ejecutándose en tu sistema. Puedes verificarlo ejecutando `mongo --version` en tu terminal. Si no lo tienes instalado, sigue las instrucciones de instalación en [MongoDB](https://www.mongodb.com/try/download/community).

## Configuración del Proyecto

1. **Clonar el Repositorio**: Si es necesario, clona el repositorio que contiene el proyecto y navega hasta la carpeta del proyecto en tu terminal.

2. **Instalar Dependencias**: Dentro de la carpeta del proyecto, instala las dependencias necesarias ejecutando:
   ```sh
   npm install
   ```

3. **Configurar MongoDB**: Asegúrate de que MongoDB esté ejecutándose. Por defecto, MongoDB escucha en `mongodb://127.0.0.1:27017`. Si tu configuración es diferente, actualiza la cadena de conexión en el archivo `index.js` acorde a tu configuración de MongoDB:
   ```javascript
   mongoose.connect('tu_cadena_de_conexión_a_mongoDB');
   ```

## Ejecutar el Proyecto

1. **Iniciar el Servidor**: Inicia el servidor Express ejecutando:
   ```sh
   node index.js
   ```
   Si todo está configurado correctamente, deberías ver un mensaje en tu terminal indicando que el servidor está escuchando en `http://localhost:3000`.

## Probar el Proyecto

Para realizar peticiones al servidor, puedes usar herramientas como Postman o cURL. Por ejemplo, para probar el endpoint `/anonymize`, puedes usar el siguiente comando cURL:
```sh
curl -X POST http://localhost:3000/anonymize -H "Content-Type: application/json" -d '{"message":"Este es un mensaje de prueba con un nombre Pedro"}'
````

Asegúrate de reemplazar el contenido de `-d` con el mensaje que deseas anonimizar.