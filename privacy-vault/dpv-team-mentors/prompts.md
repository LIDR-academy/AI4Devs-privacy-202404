## Construcción Data Privacy Vault

1. Estoy creando un Data Privacy Vault que permita anonimizar prompts para LLMs. Lo estoy haciendo en node. Necesito la primera etapa: una API que recoge un mensaje dado, el prompt, y lo devuelve anonimizado, con tokens. Dime paso a paso como lo harias, con ejemplos de codigo, y pideme más información cuando lo necesites. Usa buenas practicas de codigo y comentarios en las funciones

2. quiero aislar el proceso de anonimizar en una función aparte, ya que el proceso será algo más complejo. Deja la función vacía de momento, devolviendo lo que llega sin modificarlo


3. En la funcion de anonimizar, quiero que explores el contenido y busques telefonos, emails, nombres y apellidos de personas. Cada vez que encuentres uno, guárdalo en un array dataFound por tipo de contenido

4. ahora quiero que en la funcion anonymize implementes una logica de anonimizacion sencilla

5. ahora quiero que anonimices cada uno de los matches en dataFound llamando a la funcion anoymize, haciendo que sea un array PII-token-tipo, por ejemplo para un telefono 76728726 cuyo token es 5f3a7d52, [original: 76728726, anonymized: 5f3a7d52]

6. ahora necesito que almacenes en mongo cada resultado PII-token-tipo

7. ahora necesito una funcion que de-anonimice un mensaje dado con tokens, reemplazandolo por el valor en bbdd en caso de que lo encuentre

8. necesito el endpoint POST que dado un mensaje con tokens, me devuelve el mensaje original usando la funcion anterior


## Diagramas de flujo

Creame un diagrama de bloques en mermaid que refleje las diferentes etapas por las que pasa el sistema, uno para la deanonimización y otro para la reanonimizacion



### Anonimización

```
flowchart TD
    A(Recibir Mensaje 🔁) --> B[Detección de PII 🧠]
    B --> C[Generar Token 🧠]
    C --> D[Almacenar Relación PII-Token 💽]
    D --> E[Reemplazar PII con Token 🧠]
    E --> F[Enviar Mensaje Anonimizado 🔁]

    classDef api fill:#f6de82,stroke:#FFB300,stroke-width:2px;
    classDef db fill:#ccf,stroke:#33f,stroke-width:2px;
    classDef algo fill:#cfc,stroke:#393,stroke-width:2px;

    class A,F api;
    class B,C,E algo;
    class D db;
```

[![](https://mermaid.ink/img/pako:eNqFkb9OwzAQh1_FcheQUqlqJARBQkqaBHVAQqVbwnC1z63BcaLEodCqA6-A2GHjAZiZeCEeATdtafkj4ck-f9_vzvKcspwj9ahQ-ZRNoDRkGKaa2OXvDZDJkSzJGeoKrpB8PD3e75N2-4QESYgGGZPvr5pwJOf9vr19eb5cqUED9ZJT1FhCSYb5NepdoNcAYeKrDBhqiwxQwSrOZrU3wsPbWggbIUoGiFmhYGaNZU-W69_hUcPGSaRvJGyn93WuZSZnwPPmJZZe8UxBVYUoCBSSCKmU1xIHHA-7TmVKG-614jhwO531sT2V3Ey8bnF7_MPno7XOmPhyXVf8K4Ia5xtVsK165P6l7sjEd-Ll2LuBJHB6TtRkfiuHdj5boA7NsMxAcvvr8yWQUjPBDFPq2S1HAbUyKU31wqJQm_ziTjPqmbJGh9YFB4OhhHEJGfUEqAoXn7npxCo?type=png)](https://mermaid.live/edit#pako:eNqFkb9OwzAQh1_FcheQUqlqJARBQkqaBHVAQqVbwnC1z63BcaLEodCqA6-A2GHjAZiZeCEeATdtafkj4ck-f9_vzvKcspwj9ahQ-ZRNoDRkGKaa2OXvDZDJkSzJGeoKrpB8PD3e75N2-4QESYgGGZPvr5pwJOf9vr19eb5cqUED9ZJT1FhCSYb5NepdoNcAYeKrDBhqiwxQwSrOZrU3wsPbWggbIUoGiFmhYGaNZU-W69_hUcPGSaRvJGyn93WuZSZnwPPmJZZe8UxBVYUoCBSSCKmU1xIHHA-7TmVKG-614jhwO531sT2V3Ey8bnF7_MPno7XOmPhyXVf8K4Ia5xtVsK165P6l7sjEd-Ll2LuBJHB6TtRkfiuHdj5boA7NsMxAcvvr8yWQUjPBDFPq2S1HAbUyKU31wqJQm_ziTjPqmbJGh9YFB4OhhHEJGfUEqAoXn7npxCo)

**Inicio:** Recibir Datos: El sistema recibe los datos que necesitan ser procesados.
**Detección de PII:** Se utiliza un algoritmo o herramienta de NLP para identificar información de identificación personal en el texto.
**Generar Token:** Se genera un token nico para cada pieza de PII detectada.
**Almacenar Relación Token-Datos:** El sistema guarda la relación entre el token y los datos originales en una base de datos segura.
**Reemplazar PII con Token:** La información sensible en los datos se reemplaza con los tokens generados.
**Enviar Datos Anonimizados:** Los datos, ahora anonimizados con tokens, se envían para su uso o almacenamiento.


### Desanonimización

```
flowchart TD
    A(Recibir Mensaje Anonimizado 🔁) --> B[Extraer Tokens 🧠]
    B --> C[Buscar Tokens en la Base de Datos 💽]
    C --> D[Recuperar Datos Originales 💽]
    D --> E[Reemplazar Tokens con Datos Originales 🧠]
    E --> F[Enviar Mensaje Desanonimizado 🔁]

    classDef api fill:#f6de82,stroke:#FFB300,stroke-width:2px;
    classDef db fill:#ccf,stroke:#33f,stroke-width:2px;
    classDef algo fill:#cfc,stroke:#393,stroke-width:2px;

    class A,F api;
    class B,E algo;
    class C,D db;
```

[![](https://mermaid.ink/img/pako:eNqFkk1KAzEUgK8S4kZhCqUDoiMInc7MTgTtruPiNXlpo5lkyGRsbenCK4h73XkK7-QRTKe1fxTMKnnv-94PZE6Z4UgjKpSZsDFYR_pJrok_3dM7ZHIoLblBXcEjkq42WhZyBtyQn4_31zPSal2TeJBOnQW0pG-ePOlTX58PqxpxQ_QGcV0x2ACoiQISQ4WEI0nAmaX09r2Weo2UDHz7ukTrvRVya-VIalC4RycNnXoai1LBbNuGGX3M3AyXNmY2SPWzhO2WCVZwsKgXVgpTUFUJCgKlJEIqFZ2Ic44XnaBy1neNTrIsDtvt9bM1kdyNo045vTrw-XCtMyY2bhiKf0VQI_OnCrZVL8Nj6o5MukG2HHu3IImDtKm4F-wFiZ_Ph2hAC7QFSO4_yHyJ5NSNscCcRv7KUUCtXE5zvfAo1M7cv2hGI2drDGhdcnCYSBhZKGgkQFW4-AWB1NQm?type=png)](https://mermaid.live/edit#pako:eNqFkk1KAzEUgK8S4kZhCqUDoiMInc7MTgTtruPiNXlpo5lkyGRsbenCK4h73XkK7-QRTKe1fxTMKnnv-94PZE6Z4UgjKpSZsDFYR_pJrok_3dM7ZHIoLblBXcEjkq42WhZyBtyQn4_31zPSal2TeJBOnQW0pG-ePOlTX58PqxpxQ_QGcV0x2ACoiQISQ4WEI0nAmaX09r2Weo2UDHz7ukTrvRVya-VIalC4RycNnXoai1LBbNuGGX3M3AyXNmY2SPWzhO2WCVZwsKgXVgpTUFUJCgKlJEIqFZ2Ic44XnaBy1neNTrIsDtvt9bM1kdyNo045vTrw-XCtMyY2bhiKf0VQI_OnCrZVL8Nj6o5MukG2HHu3IImDtKm4F-wFiZ_Ph2hAC7QFSO4_yHyJ5NSNscCcRv7KUUCtXE5zvfAo1M7cv2hGI2drDGhdcnCYSBhZKGgkQFW4-AWB1NQm)

**Inicio:** Recibir Datos Anonimizados: El sistema recibe datos que contienen tokens en lugar de la información original.
**Extraer Token:** Se extraen los tokens de los datos recibidos.
**Buscar Token en la Base de Datos:** Se busca cada token en la base de datos para encontrar los datos originales asociados.
**Recuperar Datos Originales:** Se recuperan los datos originales correspondientes a cada token.
**Reemplazar Token con Datos Originales:** Los tokens en los datos son reemplazados por la información original recuperada.
**Enviar Datos Desanonimizados:** Los datos, ahora con la información original restaurada, se envían para su uso o almacenamiento.


## Implementar oauth2
Quiero implementar seguridad en las llamadas de API con oauth2, usando alguna libreria especializada

Chat GPT:
Para implementar seguridad en las llamadas de API utilizando OAuth2 en Node.js, puedes usar la biblioteca oauth2-server. Esta biblioteca te permite integrar fácilmente la autenticación OAuth2 en tu aplicación Express. A continuación, te muestro cómo puedes empezar a implementarlo en tu proyecto actual.
Primero, necesitas instalar oauth2-server y una biblioteca adicional para manejar promesas, como bluebird, ya que oauth2-server utiliza promesas para muchas de sus operaciones.

## Preparar prompt para LLM
Utiliza tokens en la respuesta para poder de-anonimizarlos después

## Usar librerías NLP
Utiliza librerías NLP para identificar PII en el contenido del mensaje, principalmente nombres, emails, teléfonos, fechas, IDs y números de tarjetas de crédito

## Unit testing
Crea tests unitarios con jest para testear el proceso de anonimizacion y deanonimizacion usando las mejores practicas de testing y contemplando los edge cases