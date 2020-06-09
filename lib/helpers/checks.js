const pathExists = require('path-exists'); // Comprueba si existe un directorio
const chalk = require('chalk'); // Colorea las salidas del terminal

/**
 * Comprueba que existan los recursos de una libreria,
 * lanza un error si no los encuentra
 *
 * @param {Object} - Datos de la libreria
 * @return {Boolean} - Indica si existen todos los recursos
 * @throws {String} - Error al comprobar si existen las rutas de todos los recursos
 */
const checkLibData = async lib => {
  let errorLib = '';

  if (lib.components) {
    const componentPath = process.cwd() + lib.components;
    const validateComponentPath = await pathExists(componentPath).then(exists => exists);
    if (!validateComponentPath) errorLib += `- No se encuentra el directorio con los componentes ${chalk.rgb(40, 164, 189)(componentPath)}\n`;
  }

  if (lib.styles) {
    const stylePath = process.cwd() + lib.styles;
    const validateStylePath = await pathExists(stylePath).then(exists => exists);
    if (!validateStylePath) errorLib += `- No se encuentra el archivo con los estilos ${chalk.rgb(40, 164, 189)(stylePath)}\n`;
  }

  if (lib.shareStyles) {
    const shareStylesPath = process.cwd() + lib.shareStyles;
    const validateshareStylesPath = await pathExists(shareStylesPath).then(exists => exists);
    if (!validateshareStylesPath) errorLib += `- No se encuentra el archivo con los estilos compartidos ${chalk.rgb(40, 164, 189)(shareStylesPath)}\n`;
  }

  if (errorLib) throw new Error(errorLib);

  return true;
};

module.exports = {
  checkLibData,
};
