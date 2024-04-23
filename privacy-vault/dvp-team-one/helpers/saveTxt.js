const fs = require('fs');

function saveTxt(datos) {
    const contenido = datos.map(obj => `key: "${obj.key}", value: "${obj.value}"`).join('\n');
    const nombreArchivo = "base_de_datos.txt";    
    try {
      fs.writeFileSync(nombreArchivo, contenido);
    } catch (error) {
      console.error('Hubo un error al guardar el archivo:', error);
    }
  }

module.exports = { saveTxt };
  