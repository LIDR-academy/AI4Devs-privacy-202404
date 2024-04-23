# Curso sobre Perturbación de Datos en IA para Proteger la Privacidad de Datos

## Introducción
La perturbación de datos es una técnica crucial en el campo de la inteligencia artificial (IA) para proteger la privacidad de los datos durante el entrenamiento de modelos. En este curso, exploraremos en qué consiste esta técnica, las técnicas existentes, las herramientas disponibles y algunos ejemplos prácticos.

## ¿En qué consiste la Perturbación de Datos?

La perturbación de datos es una técnica utilizada para introducir ruido o perturbaciones aleatorias en los datos de entrenamiento antes de utilizarlos para entrenar un modelo de IA. El objetivo es proteger la privacidad de los datos al evitar que el modelo aprenda detalles específicos o sensibles sobre los individuos en los datos.

## Técnicas Existentes

### 1. Perturbación de Ruido Aditivo
   - Consiste en agregar ruido aleatorio a los datos originales antes de entrenar el modelo.
   - El ruido puede ser generado a partir de una distribución normal o uniforme.
   - Se controla la magnitud de la perturbación mediante un parámetro.

### 2. Perturbación de Ruido Multiplicativo
   - Multiplica los datos originales por un factor de ruido aleatorio.
   - El factor de ruido se elige para preservar la similitud estadística con los datos originales.

## Herramientas

- **TensorFlow Privacy**: Extensión de TensorFlow que proporciona herramientas para entrenar modelos de IA con protección de la privacidad.
- **IBM Adversarial Robustness Toolbox (ART)**: Biblioteca de código abierto para evaluar y mejorar la robustez de los modelos de IA frente a ataques adversarios.

## Ejemplos

- **Aplicación de Perturbación de Datos en Datos Médicos**: Introducir ruido en datos médicos para proteger la privacidad de los pacientes mientras se entrena un modelo de diagnóstico.
- **Perturbación de Datos en Datos Financieros**: Agregar ruido a datos financieros para proteger la privacidad de los clientes al entrenar modelos de detección de fraudes.

## Referencias
- [TensorFlow Privacy](https://github.com/tensorflow/privacy)
- [IBM Adversarial Robustness Toolbox (ART)](https://github.com/Trusted-AI/adversarial-robustness-toolbox)
- Dwork, C., & Roth, A. (2014). The algorithmic foundations of differential privacy. Foundations and Trends® in Theoretical Computer Science, 9(3-4), 211-407.
- Abadi, M., et al. (2016). Deep learning with differential privacy. Proceedings of the 2016 ACM SIGSAC Conference on Computer and Communications Security.
