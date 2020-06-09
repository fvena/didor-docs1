const pathExists = require('path-exists'); // Comprueba si existe un directorio
const path = require('path');
const fsPromises = require('fs').promises;
const chalk = require('chalk'); // Colorea las salidas del terminal
const defaultConfig = require('../build/default');
const log = require('./log'); // Logs por pantalla tuneados

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

  throw new Error(`  - No se encuentra el archivo de configuración ${log.link(configPath)}`);
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
      errorFolders += `- No se encuentra el directorio ${chalk.rgb(40, 164, 189)(docsBasePath)}\n`;
    } else {
      docsFolders.push(docsBasePath);
    }
  }

  if (errorFolders) throw new Error(errorFolders);

  return docsFolders;
};

const resolve = dir => path.join(__dirname, '..', dir);

const assetsPath = _path => {
  const assetsSubDirectory = 'static';
  return path.posix.join(assetsSubDirectory, _path);
};

/**
 * Elimina todos los directorios vacios de un directorio dado.
 * Si el propio directorio está vacío, también lo elimina.
 *
 * @param {string} directory Ruta del directorio que vamos a limpiar
 */
const removeEmptyDirectories = async directory => {
  const fileStats = await fsPromises.lstat(directory);

  if (!fileStats.isDirectory()) return;

  let fileNames = await fsPromises.readdir(directory);

  if (fileNames.length > 0) {
    const recursiveRemovalPromises = fileNames.map(fileName => removeEmptyDirectories(path.join(directory, fileName)));
    await Promise.all(recursiveRemovalPromises);

    // volvemos a evaluar fileNames despues de eliminar sus subdirectorios
    // por si se ha quedado vacío
    fileNames = await fsPromises.readdir(directory);
  }

  if (fileNames.length === 0) {
    await fsPromises.rmdir(directory);
  }
};

module.exports = {
  getConfigFile,
  getDocsFolders,
  resolve,
  assetsPath,
  removeEmptyDirectories,
};
