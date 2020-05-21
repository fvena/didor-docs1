/* eslint no-console: 0 */
const chalk = require('chalk'); // Colorea las salidas del terminal
const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const utils = require('./build/utils');
const configWebpack = require('./build/webpack.config.dev');

const log = console.log;
const info = message => log(`${chalk.rgb(27, 131, 152)('ℹ')} ${chalk.gray('｢didor｣')}: ${message}`);
const error = message => log(`${chalk.rgb(27, 131, 152)('ℹ')} ${chalk.gray('｢didor｣')}: ${chalk.red('Error al generar la documentación:')}\n${message}\n\n`);

/**
 * Obtiene los parámetros de configuración
 * y inicializa un servidor local para ver la documentación
 *
 * @param {string} configFile -Ruta de la documentación
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
     * Obtengo las rutas absolutas de los directorios
     */
    const docsFolders = await utils.getDocsFolders(config.folders);

    /**
     * Compruebo si existen los archivos de la libreria
     */
    if (config.lib) await utils.checkLibData(config.lib);

    /**
     * Configuro el servidor
     */
    const options = {
      contentBase: [path.join(process.cwd(), './node_modules/@didor/docs/lib/src'), path.join(process.cwd(), './node_modules/@didor/docs/dist'), ...docsFolders],
      port: config.port,
      hot: true,
      compress: true,
      open: config.open,
      publicPath: '/',
      host: 'localhost',
      quiet: false,
      clientLogLevel: 'silent',
      disableHostCheck: true,
      noInfo: true,
      historyApiFallback: true,
      onListening: server => {
        const serverPort = server.listeningApp.address().port;

        info(`Servidor arrancado en el puerto ${chalk.rgb(40, 164, 189).underline(`http://localhost:${serverPort}`)}.`);
        info('Contenido servido desde:');
        for (let index = 0; index < docsFolders.length; index += 1) {
          log(`  - ${chalk.rgb(40, 164, 189)(docsFolders[index])}`);
        }
      },
      before(app) {
        /**
         * La aplicación toma los parámetros de configuración del archivo /didor.config.js
         */
        app.get('/didor.config.js', (req, res) => {
          const appConfig = {
            logo: config.logo,
            title: config.title,
            description: config.description,
            navbar: config.navbar,
            sidebar: config.sidebar,
            defaultPath: config.defaultPath,
            gitRepoLink: config.gitRepoLink,
            jsLib: config.jsLib,
            cssLib: config.cssLib,
          };

          if (config.lib.components || config.lib.styles) appConfig.jsLib.push(`http://localhost:${config.port}/lib_bundle.js`);

          res.send(`window.$didor = ${JSON.stringify(appConfig)}`);
        });
      },
    };

    /**
     * Configuro webpack
     *
     * Genero un bundle con la librería para poder usarlos en la demo
     */
    if (config.lib.components || config.lib.styles) {
      const paths = [];
      if (config.lib.components) paths.push(path.join(process.cwd(), config.lib.components));
      if (config.lib.styles) paths.push(path.join(process.cwd(), config.lib.styles));

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
            patterns: config.lib && config.lib.shareStyles ? [path.join(process.cwd(), config.lib.shareStyles)] : '',
          },
        },
      ],
    });

    /**
     * Levanto un servidor para mostrar la documentación
     */
    WebpackDevServer.addDevServerEntrypoints(configWebpack, options);
    const compiler = webpack(configWebpack);
    const server = new WebpackDevServer(compiler, options);
    server.listen(config.port);

    return true;
  } catch (e) {
    error(e.message);
    return false;
  }
};
