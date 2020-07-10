const path = require('path');
const pathExists = require('path-exists'); // Comprueba si existe un directorio
const pwaAssetGenerator = require('pwa-asset-generator');
const chalk = require('chalk'); // Colorea las salidas del terminal
const utils = require('./helpers/files');
const log = require('./helpers/log'); // Logs por pantalla tuneados

/**
 * Genera automáticamente un favicon, iconos y pantallas de inicio según
 * las especificaciones del Manifiesto de Aplicaciones Web y la guía de Apple de Interfaces para humanos.
 * También genera los archivos manifiest.json y actualiza el archivo index.html para enlazarlas.
 *
 * @param {string} configFile - Ruta del archivo de configuración
 */
module.exports = async configFile => {
  try {
    /**
     * Obtengo los datos del archivo de configuración del proyecto
     * y los mezclo con los valores por defecto
     */
    const configPath = configFile ? path.join(process.cwd(), configFile) : path.join(process.cwd(), 'didor.config.js');
    const config = await utils.getConfigFile(configPath);

    /**
     * Defino los parámetros principales
     */
    const appIcon = process.cwd() + config.customize.pwa.appIcon;
    const splashIcon = config.customize.pwa.splashIcon ? process.cwd() + config.customize.pwa.splashIcon : appIcon;
    const background = config.customize.pwa.background;
    const output = path.join(process.cwd(), './node_modules/@didor/docs/dist/img');

    /**
     * Compruebo si encuentra los recursos
     */
    if (!appIcon) {
      log.error(`Debe indicar ${chalk.rgb(40, 164, 189)('appIcon')} para generar los recursos.\n`);
      return;
    }

    const validateAppIconPath = await pathExists(appIcon).then(exists => exists);

    if (!validateAppIconPath) {
      log.error(`No se encuentra el archivo ${chalk.rgb(40, 164, 189)(appIcon)}\n`);
      return;
    }

    if (splashIcon !== appIcon) {
      const validateSplashIconPath = await pathExists(splashIcon).then(exists => exists);

      if (!validateSplashIconPath) {
        log.error(`No se encuentra el archivo ${chalk.rgb(40, 164, 189)(splashIcon)}\n`);
        return;
      }
    }

    /**
     * Inicio la generación de contenidos
     */

    log.info('Configurando PWA.');

    /**
     * Genero el favicon y añado la ruta al index
     */
    log.info('Generando favicon.');

    await pwaAssetGenerator.generateImages(appIcon, output, {
      favicon: true,
      iconOnly: true,
      type: 'png',
      opaque: false,
      padding: 0,
      log: false,
    });

    /**
     * Genero los iconos, añado las rutas al index y modifico el manifies.json
     */
    log.info('Generando iconos de aplicación.');

    await pwaAssetGenerator.generateImages(appIcon, output, {
      background,
      iconOnly: true,
      type: 'png',
      padding: '25%',
      log: false,
    });

    /**
     * Genero los splash y añado las rutas al index
     */
    log.info('Generando las Splash Screen.');

    await pwaAssetGenerator.generateImages(splashIcon, output, {
      background,
      splashOnly: true,
      type: 'png',
      padding: 'calc(50vh - 20%) calc(50vw - 30%)',
      log: false,
    });

    log.info('Finalizado la configuración de PWA correctamente.');
  } catch (e) {
    log.error(e.message);
  }
};
