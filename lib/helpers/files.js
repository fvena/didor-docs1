const pathExists = require('path-exists'); // Comprueba si existe un directorio
const path = require('path');
const fsPromises = require('fs').promises;
const chalk = require('chalk'); // Colorea las salidas del terminal
const deepmerge = require('deepmerge');
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
    const mergeConfig = deepmerge(defaultConfig, customConfig);

    // Deepmerge no sustituye un array por otro, sino que los une,
    // esto provoca que la carpeta /docs por defecto siempre esté presente
    // aunque el usuario haya especificado otras.
    if (customConfig.content.folders.length) mergeConfig.content.folders = customConfig.content.folders;

    return mergeConfig;
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

/**
 * Comprueba si un archivo existe
 *
 * @param {String} filePath - Ruta del archivo
 * @param {String} param - Nombre del parámetro para mostrar el error
 * @param {Boolean} required - Indica si es obligatorio
 */
const checkpath = async (filePath, param, required = false) => {
  if (!filePath && required) {
    log.error(`Debe indicar ${chalk.rgb(40, 164, 189)(param)}.\n`);
    return null;
  }

  if (!filePath) return null;

  const fullPath = process.cwd() + filePath;
  const validatePath = await pathExists(fullPath).then(exists => exists);

  if (!validatePath) {
    log.error(`No se encuentra el archivo ${chalk.rgb(40, 164, 189)(fullPath)}\n`);
    return null;
  }

  return fullPath;
};

/**
 * Comprueba si una carpeta existe
 *
 * @param {String} folderPath - Ruta de la carpeta
 * @param {String} param - Nombre del parámetro para mostrar el error
 */
const checkfolder = async (folderPath, param) => {
  if (!folderPath) {
    log.error(`Debe indicar ${chalk.rgb(40, 164, 189)(param)}.\n`);
    return null;
  }

  const fullPath = path.join(process.cwd(), folderPath);
  const validatePath = await pathExists(fullPath).then(exists => exists);

  if (!validatePath) {
    log.error(`No se encuentra la carpeta ${chalk.rgb(40, 164, 189)(fullPath)}\n`);
    return null;
  }

  return fullPath;
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
  checkpath,
  checkfolder,
  resolve,
  assetsPath,
  removeEmptyDirectories,
};
