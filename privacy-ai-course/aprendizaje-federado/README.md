# Curso: Introducción al Aprendizaje Federado (Federated Learning)

## Descripción del curso
Este curso está diseñado para principiantes que desean aprender sobre el Aprendizaje Federado (Federated Learning), una técnica de aprendizaje automático distribuido que permite entrenar modelos sin centralizar los datos. A lo largo del curso, los estudiantes aprenderán los conceptos fundamentales, la arquitectura y las aplicaciones del Aprendizaje Federado.

## Objetivos del curso
Al finalizar este curso, los estudiantes serán capaces de:

- Comprender los principios básicos del Aprendizaje Federado.
- Identificar los desafíos y beneficios del Aprendizaje Federado en comparación con los enfoques tradicionales de aprendizaje automático.
- Familiarizarse con la arquitectura y los componentes clave del Aprendizaje Federado.
- Conocer las aplicaciones y casos de uso del Aprendizaje Federado en diferentes industrias.

## Requisitos previos
- Conocimientos básicos de aprendizaje automático y redes neuronales.
- Familiaridad con conceptos de programación y algoritmos.

## Contenido del curso
### [Módulo 1: Introducción al Aprendizaje Federado](#módulo-1-introducción-al-aprendizaje-federado)
- ¿Qué es el Aprendizaje Federado?
- Motivación y beneficios del Aprendizaje Federado
- Diferencias entre el Aprendizaje Federado y el aprendizaje automático tradicional

### Módulo 2: Arquitectura del Aprendizaje Federado
- Componentes principales del Aprendizaje Federado
- Servidor central y clientes locales
- Comunicación y sincronización entre el servidor y los clientes

```mermaid
graph LR
A[Servidor Central] -- Agregación de modelos --> B[Cliente 1]
A -- Agregación de modelos --> C[Cliente 2]
A -- Agregación de modelos --> D[Cliente 3]
B -- Actualización local del modelo --> A
C -- Actualización local del modelo --> A
D -- Actualización local del modelo --> A
```

### Módulo 3: Proceso de entrenamiento en el Aprendizaje Federado
- Inicialización del modelo en el servidor central
- Distribución del modelo a los clientes locales
- Entrenamiento local en los clientes utilizando sus propios datos
- Envío de actualizaciones locales al servidor central
- Agregación de actualizaciones en el servidor y actualización del modelo global

### Módulo 4: Desafíos y consideraciones del Aprendizaje Federado
- Privacidad y seguridad de los datos
- Heterogeneidad de los datos y desequilibrio en los clientes
- Comunicación y ancho de banda limitados
- Tolerancia a fallos y robustez del sistema

### Módulo 5: Aplicaciones del Aprendizaje Federado
- Aplicaciones en la industria de la salud
- Aplicaciones en dispositivos móviles y IoT
- Aplicaciones en servicios financieros y banca
- Otras aplicaciones y casos de uso emergentes

## Recursos adicionales
- [Federated Learning: Inteligencia Artificial sin comprometer la privacidad](https://www.aepd.es/prensa-y-comunicacion/blog/federated-learning-inteligencia-artificial-sin-comprometer-la-privacidad#:~:text=El%20Aprendizaje%20Federado%20habilita%20la,donde%20est%C3%A1n%20ubicados%20los%20datos.)

Este curso proporciona una base sólida para comprender el Aprendizaje Federado y sus aplicaciones. A medida que avances en el curso, adquirirás los conocimientos necesarios para participar en proyectos de Aprendizaje Federado y explorar áreas más avanzadas de esta emocionante tecnología.

# Módulo 1: Introducción al Aprendizaje Federado
## ¿Qué es el Aprendizaje Federado?

El Aprendizaje Federado (Federated Learning) es un enfoque de aprendizaje automático distribuido que permite entrenar modelos en múltiples fuentes de datos descentralizadas, sin necesidad de compartir o centralizar los datos. Esto se logra mediante la colaboración de varios dispositivos o servidores (clientes) que realizan el entrenamiento localmente en sus propios datos y comparten únicamente las actualizaciones del modelo con un servidor central.

```mermaid
graph TD
A[Servidor Central] --> B[Cliente 1]
A --> C[Cliente 2]
A --> D[Cliente 3]
B --> A
C --> A
D --> A
```

## Tipos de Aprendizaje Federado
### Aprendizaje Federado Horizontal (HFL):
- También conocido como Aprendizaje Federado basado en Muestras.
- Los clientes tienen conjuntos de datos con características similares pero diferentes muestras.
- Cada cliente entrena el modelo en su propio conjunto de datos y comparte las actualizaciones con el servidor central.
- Adecuado cuando los clientes tienen datos con una superposición significativa en las características pero diferentes instancias.

```mermaid
graph TD
    A[Cliente 1<br>Muestras A] --> D{Servidor Central}
    B[Cliente 2<br>Muestras B] --> D
    C[Cliente 3<br>Muestras C] --> D
    D --> A
    D --> B
    D --> C

    subgraph Características similares
        A
        B
        C
    end
```

### Aprendizaje Federado Vertical (VFL):
- También conocido como Aprendizaje Federado basado en Características.
- Los clientes tienen conjuntos de datos con diferentes características para las mismas muestras.
- Cada cliente entrena el modelo en su propio conjunto de características y comparte las actualizaciones con el servidor central.
- Adecuado cuando los clientes tienen datos con diferentes características para las mismas instancias.

```mermaid
graph LR
A[Cliente 1<br>Características A] --> C{Servidor Central}
B[Cliente 2<br>Características B] --> C
C --> A
C --> B
```

## Motivación y beneficios del Aprendizaje Federado
El Aprendizaje Federado surge como una solución a los desafíos de privacidad y seguridad en el aprendizaje automático tradicional. Algunos de los principales beneficios son:

1. **Privacidad de datos**: Los datos sensibles permanecen en los dispositivos locales y no se comparten directamente con el servidor central, lo que reduce los riesgos de violación de privacidad.

2. **Seguridad de datos**: Al evitar la centralización de los datos, se reduce la superficie de ataque y se minimiza el riesgo de brechas de seguridad.

3. **Colaboración sin compartir datos**: Permite la colaboración entre diferentes organizaciones o entidades sin la necesidad de compartir datos directamente, lo que facilita el cumplimiento de las regulaciones de protección de datos.

4. **Escalabilidad**: Permite entrenar modelos en grandes conjuntos de datos distribuidos en múltiples dispositivos o servidores, lo que mejora la escalabilidad y el rendimiento.

## Diferencias entre el Aprendizaje Federado y el aprendizaje automático tradicional
| Aprendizaje Federado                       | Aprendizaje Automático Tradicional                |
|--------------------------------------------|---------------------------------------------------|
| Datos descentralizados                     | Datos centralizados                               |
| Actualizaciones de modelo compartidas      | Datos compartidos                                 |
| Privacidad y seguridad mejoradas           | Mayor riesgo de violación de privacidad           |
| Colaboración sin compartir datos           | Requiere compartir datos                          |
| Escalabilidad en dispositivos distribuidos | Escalabilidad limitada por recursos centralizados |

# AIs utilizadas
- Claude AI hasta el módulo 1.
