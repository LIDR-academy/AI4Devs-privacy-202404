# Ejercicio grupal: Data Privacy Vault

_Tiempo: 30 minutos_

Con la ayuda de un asistente de IA, desarrollad por equipos un data privacy vault básico que funcione según las siguientes especificaciones:
- El vault debe ser capaz de **de-identificar/anonimizar información personal (PII) de un mensaje de texto** dado.
    - Reemplazará los términos PII encontrados por tokens, y devolverá el mensaje sin información personal.
    - Almacenará los PII-token-tipoDeDato en una base de datos mongo que permita re-identificar después si se encuentra el match. Ejemplos: _Pedro-36c48f31-nombre, 16/12/2001-561b25cb-fecha_
    - Utilizará el endpoint `POST /anonymize` que recibirá el mensaje en la variable `message`, y devolverá el mensaje de texto sin información personal en la variable `anonymizedMessage`. Si hay algún error, devolverá el status HTTP correspondiente y un mensaje de error.

- El vault debe ser capaz de **re-identificar información personal (PII) de un prompt con tokens dado**
    - Reemplazará de vuelta los tokens encontrados por los términos PII de referencia, y devolverá el mensaje con información personal.
    - Recuperará los pares PII-token de la base de datos mongo si se encuentra match para cada uno de los tokens.
    - Utilizará el endpoint `POST /deanonymize` que recibirá el mensaje en la variable `message`, y devolverá el mensaje de texto sin información personal en la variable `anonymizedMessage`. Si hay algún error, devolverá el status HTTP correspondiente y un mensaje de error.

Los equipos trabajaréis utilizando Node en javascript para implementar la aplicación, que correrá sobre Express en el puerto 3000.

Una vez terminado, debe responder a las peticiones de la siguiente forma:

```sh
curl -X POST http://localhost:3000/anonymize -H "Content-Type: application/json" -d '{"message":"Este es un mensaje de prueba con un teléfono 123-456-7890, un email ejemplo@dominio.com, un nombre Pedro, una fecha de nacimiento 16/12/2001 y un número de DNI español 53651397K."}'
```

```sh
{
    "anonymizedMessage": "Este es un mensaje de prueba con un teléfono af9cbdc2, un email cdd42026, un nombre 36c48f31, una fecha de nacimiento 561b25cb y un número de DNI español 2c37a5d4."
}
```

Completad la tarea en una carpeta personal dentro de `privacy-vault` para vuestro equipo, usando la nomenclatura `dpv-team-numSala` correspondiente a vuestro número de sala de trabajo.
- Debéis incluir los prompts utilizados en prompts.md, el código fuente, debidamente formateado y comentado, y un README.md que explique la instalación y funcionamiento de la aplicación con ejemplos para usar en cURL o postman, además de enumerar las tareas realizadas (obligatorias y opcionales).
- Al finalizar, haced un PR con el título `dpv-team-numSala`

Tareas extra a explorar si hay tiempo una vez habéis realizado el PR funcional:
- Test unitarios de la anonimizacion y de-anonimizacion
- Endpoint extra `/anonymize-llm` que, además de anonimizar, rodea el mensaje de un prompt específico para LLMs, explicando que use los mismos tokens a la salida. De esta manera podremos encontrar los tokens en la salida y de-anonimizar de vuelta, tan solo copiando el resultado en el asistente que usemos.
- Usar detección PII avanzada con librerías NLP
- API con autenticación segura i.e. OAuth2
- Interfaz gráfica que permita tanto copiar el mensaje anonimizado directamente al portapapeles para pegarlo directamente en el LLM, como copiar el contenido del LLM con tokens para de-anonimizar directamente y obtener el contenido final


