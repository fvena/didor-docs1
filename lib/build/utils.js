const chalk = require('chalk'); // Colorea las salidas del terminal
const pathExists = require('path-exists'); // Comprueba si existe un directorio
const path = require('path');
const defaultConfig = require('./default');

/**
 * Devuelve una cadena formateado con el nombre del archivo.
 *
 * @param {String} - Nombre del archivo
 * @return {String} - Nombre del archivo formateado
 */
const fileLog = file => chalk.rgb(40, 164, 189).underline(`${file}`);

/**
 * Obtiene el archivo con la configuración del proyecto,
 * sino lo encuentra, devuelve los parámetros por defecto.
 *
 * @param {String} - Ruta del archivo de configuración del proyecto
 * @return {Object} - Datos de configuración del proyecto
 * @throws {String} - Error al no encontrar el archivo de configuración del proyecto
 */
const getConfigFile = async configPath => {
  const validateConfigPath = await pathExists(configPath).then(exists => exists);

  if (validateConfigPath) {
    const customConfig = require(configPath); // eslint-disable-line
    return Object.assign(defaultConfig, customConfig);
  }

  throw new Error(`  - No se encuentra el archivo de configuración ${fileLog(configPath)}`);
};

/**
 * Obtiene las rutas completas de los directorios con la documentación
 * comprueba que los directorios existen y lanza un error si no los encuentra
 *
 * @param {Array} - Listado de directorios
 * @return {Array} - Rutas completas de los directorios con la documentación
 * @throws {String} - Error al comprobar si alguno de los directorios no existe
 */
const getDocsFolders = async folders => {
  const docsFolders = [];
  let errorFolders = '';

  if (!Array.isArray(folders)) {
    throw new Error('  - El campo folders debe ser un Array');
  }

  for (let index = 0; index < folders.length; index += 1) {
    const docsBasePath = process.cwd() + folders[index];
    const validateDocFolder = await pathExists(docsBasePath).then(exists => exists); // eslint-disable-line

    if (!validateDocFolder) {
      errorFolders += `- No se encuentra el directorio ${fileLog(docsBasePath)}\n`;
    } else {
      docsFolders.push(docsBasePath);
    }
  }

  if (errorFolders) throw new Error(errorFolders);

  return docsFolders;
};

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
    if (!validateComponentPath) errorLib += `- No se encuentra el directorio con los componentes ${chalk.rgb(40, 164, 189).underline(`${componentPath}`)}\n`;
  }

  if (lib.styles) {
    const stylePath = process.cwd() + lib.styles;
    const validateStylePath = await pathExists(stylePath).then(exists => exists);
    if (!validateStylePath) errorLib += `- No se encuentra el archivo con los estilos ${chalk.rgb(40, 164, 189).underline(`${stylePath}`)}\n`;
  }

  if (lib.shareStyles) {
    const shareStylesPath = process.cwd() + lib.shareStyles;
    const validateshareStylesPath = await pathExists(shareStylesPath).then(exists => exists);
    if (!validateshareStylesPath) errorLib += `- No se encuentra el archivo con los estilos compartidos ${chalk.rgb(40, 164, 189).underline(`${shareStylesPath}`)}\n`;
  }

  if (errorLib) throw new Error(errorLib);

  return true;
};

const resolve = dir => path.join(__dirname, '..', dir);

const assetsPath = _path => {
  const assetsSubDirectory = 'static';
  return path.posix.join(assetsSubDirectory, _path);
};

module.exports = {
  getConfigFile,
  getDocsFolders,
  checkLibData,
  resolve,
  assetsPath,
};
