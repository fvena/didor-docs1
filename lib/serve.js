const chalk = require('chalk'); // Colorea las salidas del terminal
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const replace = require('replace-in-file');
const utils = require('./helpers/files');
const checks = require('./helpers/checks');
const configWebpack = require('./build/webpack.config.dev');
const log = require('./helpers/log'); // Logs por pantalla tuneados

/**
 * Obtiene los parámetros de configuración
 * y inicializa un servidor local para ver la documentación
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
     * Obtengo las rutas absolutas de los directorios con la documentación
     */
    const docsFolders = await utils.getDocsFolders(config.content.folders); // Directorios definidos por el usuario
    const didorDocsPage = path.join(process.cwd(), './node_modules/@didor/docs/dist'); // Página de didor docs
    const didorDocsDocumentation = path.join(process.cwd(), './node_modules/@didor/docs/docs'); // Documentación de Didor Docs
    const didorStylesDocumentation = path.join(process.cwd(), './node_modules/@didor/styles/docs'); // Documentación de Didor Styles

    const contentBase = [...docsFolders, didorDocsPage];

    if (config.content.didorDocs) contentBase.push(didorDocsDocumentation);
    if (config.content.didorStyles) contentBase.push(didorStylesDocumentation);

    /**
     * Compruebo si existen los archivos de la libreria
     */
    if (config.demo) await checks.checkLibData(config.demo);

    /**
     * Configuro las rutas proxi
     */
    const proxy = {};

    config.content.folders.forEach(folder => {
      proxy[folder] = {
        target: `http://localhost:${config.devServer.port}`,
        pathRewrite: {},
      };

      proxy[folder].pathRewrite[`^${folder}`] = '';
    });

    /**
     * Configuro el servidor
     */
    const options = {
      contentBase,
      proxy,
      port: config.devServer.port,
      hot: true,
      compress: true,
      open: config.devServer.open,
      publicPath: '/',
      host: 'localhost',
      quiet: false,
      clientLogLevel: 'silent',
      disableHostCheck: true,
      noInfo: true,
      historyApiFallback: true,
      onListening: server => {
        const serverPort = server.listeningApp.address().port;

        log.info(`Servidor arrancado en el puerto ${chalk.rgb(40, 164, 189)(`http://localhost:${serverPort}`)}.`);
        log.info('Contenido servido desde:');
        for (let index = 0; index < docsFolders.length; index += 1) {
          log.message(`  - ${docsFolders[index]}`);
        }
      },
      before(app) {
        /**
         * Middelware donde se exportan los parámetros de configuración en el objeto window
         * para poderlos utilizar dentro de la aplicación.
         */
        app.get('/didor.config.js', (req, res) => {
          if (config.demo.components || config.demo.styles) {
            if (!Object.prototype.hasOwnProperty.call(config.demo, 'jsLib')) config.demo.jsLib = [];
            config.demo.jsLib.push(`http://localhost:${config.devServer.port}/lib_bundle.js`);
          }
          res.send(`window.$didor = ${JSON.stringify(config)}`);
        });
      },
    };

    /**
     * Configuro webpack
     *
     * Genero un bundle con la librería para poder usarlos en la demo
     */
    if (config.demo.components || config.demo.styles) {
      const paths = [];
      if (config.demo.components) paths.push(path.join(process.cwd(), config.demo.components));
      if (config.demo.styles) paths.push(path.join(process.cwd(), config.demo.styles));

      configWebpack.entry = paths;
      configWebpack.output = {
        path: path.resolve(__dirname, './dist'),
        filename: 'lib_bundle.js',
        library: 'libBundle',
      };
    } else {
      configWebpack.entry = './node_modules/@didor/docs/lib/src/index.js';
    }

    // Añado la librería compartida como base de la demo
    configWebpack.module.rules.push({
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'style-resources-loader',
          options: {
            patterns: config.demo && config.demo.shareStyles ? [path.join(process.cwd(), config.demo.shareStyles)] : '',
          },
        },
      ],
    });

    /**
     * Actualizo los links del index.html y manifest.json
     */
    await replace({
      files: ['./node_modules/@didor/docs/dist/index.html', './node_modules/@didor/docs/dist/manifest.json'],
      from: [/<title>(.*)<\/title>/g, /href=[^>]*\/favicon/g, /href=[^>]*\/apple-icon/g, /href=[^>]*\/apple-splash/g, /"src": "[^,]*\/manifest-icon/g],
      to: [`<title>${config.customize.title}</title>`, `href=${config.customize.pwa.outputFolder}/favicon`, `href=${config.customize.pwa.outputFolder}/apple-icon`, `href=${config.customize.pwa.outputFolder}/apple-splash`, `"src": "${config.customize.pwa.outputFolder}/manifest-icon`],
    });

    /**
     * Levanto un servidor para mostrar la documentación
     */
    WebpackDevServer.addDevServerEntrypoints(configWebpack, options);
    const compiler = webpack(configWebpack);
    const webServer = new WebpackDevServer(compiler, options);
    webServer.listen(config.devServer.port);

    return true;
  } catch (e) {
    log.error(e.message);
    return false;
  }
};
