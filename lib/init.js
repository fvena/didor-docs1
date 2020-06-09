const log = require('./helpers/log'); // Logs por pantalla tuneados

/**
 * Obtiene los parámetros de configuración
 * Genera los archivos mínimos necesarios para comenzar a documentar
 *
 * @param {string} configFile - Ruta del archivo de configuración
 */
module.exports = async configFile => {
  try {
    log.info(configFile);
    log.info('init');
    return true;
  } catch (e) {
    log.error(e.message);
    return false;
  }
};
