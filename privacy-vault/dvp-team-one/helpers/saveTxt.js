const fs = require('fs');


function saveTxt(datos) {
    const contenido = datos.map(obj => `key: "${obj.key}", value: "${obj.value}"`).join('\n');
    try {
      fs.writeFileSync("base_de_datos.txt", contenido);
      console.log('El archivo fue guardado correctamente.');
    } catch (error) {
      console.error('Hubo un error al guardar el archivo:', error);
    }
}

module.exports = { saveTxt };
  