const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk'); // Colorea las salidas del terminal
const utils = require('./helpers/files');
const checks = require('./helpers/checks');
const log = require('./helpers/log'); // Logs por pantalla tuneados
/**
 * Obtiene los parámetros de configuración
 * Copia y compila los archivos para poder publicar la documentación
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
     * Genero un archivo de configuración con el objeto window
     * para poderlos utilizar dentro de la aplicación.
     */
    const appConfig = {
      logo: config.logo,
      title: config.title,
      description: config.description,
      navbar: config.navbar,
      sidebar: config.sidebar,
      defaultPath: config.defaultPath,
      buildPath: config.buildPath,
      social: config.social,
      jsLib: config.jsLib,
      cssLib: config.cssLib,
    };

    if (config.lib.components || config.lib.styles) {
      // const jsLibBundle = path.join(process.cwd(), './dist/didor.umd.min.js');
      // const cssLibBundle = path.join(process.cwd(), './dist/didor.css');
      const jsLibBundle = '/dist/didor.umd.min.js';
      const cssLibBundle = '/dist/didor.css';

      await checks.checkLibData({ components: jsLibBundle, styles: cssLibBundle });

      appConfig.jsLib.push('js/didor.umd.min.js');
      appConfig.cssLib.push('css/didor.css');
    }

    log.info('build');

    const publicPath = path.join(process.cwd(), './public');
    const publicDocsPath = path.join(process.cwd(), './public/docs');
    const configFilePath = path.join(process.cwd(), './public/didor.config.js');
    const jsLibBundlePath = config.lib.components ? path.join(process.cwd(), './dist/didor.umd.min.js') : null;
    const cssLibBundlePath = config.lib.styles ? path.join(process.cwd(), './dist/didor.css') : null;

    const docsFolders = await utils.getDocsFolders(config.folders); // Directorios definidos por el usuario
    const didorDocsPage = path.join(process.cwd(), './node_modules/@didor/docs/dist'); // Página de didor docs
    const didorDocsDocumentation = path.join(process.cwd(), './node_modules/@didor/docs/docs/didorDocs'); // Documentación de Didor Docs
    const didorFrameworkDocumentation = path.join(process.cwd(), './node_modules/@didor/framework/docs/didorFramework'); // Documentación de Didor Framework

    /**
     * Comprueba si existe la carpeta public,
     * si exista la limpia, sino la crea
     */
    await fs.emptyDir(publicPath);
    log.info(`Creada la carpeta ${chalk.rgb(40, 164, 189)('/public')}.`);

    /**
     * Copio los archivos base
     */
    await fs.copy(didorDocsPage, publicPath);
    log.info('Copiados los archivos base de didor docs');

    /**
     * Copio la librería
     */
    if (jsLibBundlePath) await fs.copy(jsLibBundlePath, './public/js/didor.umd.min.js');
    if (cssLibBundlePath) await fs.copy(cssLibBundlePath, './public/css/didor.css');
    log.info('Copiada la libreria del proyecto');

    /**
     * Genero el archivo de configuración
     */
    await fs.writeFileSync(configFilePath, `window.$didor = ${JSON.stringify(appConfig)}`);
    log.info(`Creado el fichero de configuración ${chalk.rgb(40, 164, 189)('/public/didor.config.js')}.`);

    /**
     * Copio los markdown del usuario
     */
    const filterMarkdown = src => {
      if (!config.build.onlyMarkdown) return true;

      if (fs.lstatSync(src).isDirectory()) return true;
      return src.split('.').pop() === 'md';
    };

    for (let index = 0; index < docsFolders.length; index += 1) {
      const folder = docsFolders[index];
      await fs.copy(folder, publicDocsPath, { filter: filterMarkdown }); // eslint-disable-line
    }

    /**
     * Copio la documentación de los proyectos
     */
    if (config.didorDocs) await fs.copy(didorDocsDocumentation, `${publicDocsPath}/didorDocs`);
    if (config.didorFramework) await fs.copy(didorFrameworkDocumentation, `${publicDocsPath}/didorFramework`);

    log.info('Copiados todos los documentos markdown');

    /**
     * Copio los assets
     */
    if (config.build.assets) {
      const assetsFolder = config.build.assets.split('/').pop();
      const assets = path.join(process.cwd(), config.build.assets);
      const publicAssets = path.join(publicPath, assetsFolder);
      console.log(assets);
      console.log(publicAssets);
      await fs.copy(assets, publicAssets);

      log.info('Copiados los assets');
    }

    /**
     * Limpio la carpeta eliminando todos los directorios vacios
     */
    await utils.removeEmptyDirectories(publicPath);

    log.info('Limpiado el proyecto');

    return true;
  } catch (e) {
    console.log(e);
    log.error(e.message);
    return false;
  }
};
