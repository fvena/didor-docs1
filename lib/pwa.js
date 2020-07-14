const path = require('path');
const ora = require('ora');
const pwaAssetGenerator = require('pwa-asset-generator');
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
    const sourcePath = await utils.checkpath(config.customize.pwa.sourceFile, 'sourceFile', true);
    const appIconPath = (await utils.checkpath(config.customize.pwa.appIcon, 'appIcon')) || sourcePath;
    const splashIconPath = (await utils.checkpath(config.customize.pwa.splashIcon, 'splashIcon')) || sourcePath;
    const outputPath = await utils.checkfolder(config.customize.pwa.outputFolder, 'outputFolder');

    if ((!sourcePath, !outputPath)) return;

    const background = config.customize.pwa.background || '#ffffff';
    const bgSplash = config.customize.pwa.bgSplash || background;
    const padding = config.customize.pwa.padding || '25%';
    const paddingSplash = config.customize.pwa.paddingSplash || 'calc(50vh - 20%) calc(50vw - 30%)';

    /**
     * Inicio la generación de contenidos
     */

    log.info('Generando recursos PWA.');

    /**
     * Genero el favicon y añado la ruta al index
     */
    const spinner = ora('Generando favicon.').start();

    // log.info('Generando favicon.');

    await pwaAssetGenerator.generateImages(sourcePath, outputPath, {
      favicon: true,
      iconOnly: true,
      type: 'png',
      opaque: false,
      padding: 0,
      log: false,
    });
    spinner.succeed('Generado favicon.');

    /**
     * Genero los iconos, añado las rutas al index y modifico el manifies.json
     */
    spinner.start('Generando iconos de aplicación.');
    // log.info('Generando iconos de aplicación.');

    await pwaAssetGenerator.generateImages(appIconPath, outputPath, {
      background,
      iconOnly: true,
      type: 'png',
      padding,
      log: false,
    });
    spinner.succeed('Generados iconos de la aplicación.');

    /**
     * Genero los splash y añado las rutas al index
     */
    spinner.start('Generando Splash Screen.');
    // log.info('Generando Splash Screen.');

    await pwaAssetGenerator.generateImages(splashIconPath, outputPath, {
      background: bgSplash,
      splashOnly: true,
      type: 'png',
      padding: paddingSplash,
      log: false,
    });
    spinner.succeed('Generadas Splash Screen.');

    log.info('Finalizada la generación de recursos para PWA correctamente.');
  } catch (e) {
    log.error(e.message);
  }
};
