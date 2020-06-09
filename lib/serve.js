const chalk = require('chalk'); // Colorea las salidas del terminal
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
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
    const docsFolders = await utils.getDocsFolders(config.folders); // Directorios definidos por el usuario
    const didorDocsPage = path.join(process.cwd(), './node_modules/@didor/docs/dist'); // Página de didor docs
    const didorDocsDocumentation = path.join(process.cwd(), './node_modules/@didor/docs/docs'); // Documentación de Didor Docs
    const didorFrameworkDocumentation = path.join(process.cwd(), './node_modules/@didor/framework/docs'); // Documentación de Didor Framework

    const contentBase = [...docsFolders, didorDocsPage];

    if (config.didorDocs) contentBase.push(didorDocsDocumentation);
    if (config.didorFramework) contentBase.push(didorFrameworkDocumentation);

    /**
     * Compruebo si existen los archivos de la libreria
     */
    if (config.lib) await checks.checkLibData(config.lib);

    /**
     * Configuro el servidor
     */
    const options = {
      contentBase,
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
          const appConfig = {
            logo: config.logo,
            title: config.title,
            description: config.description,
            navbar: config.navbar,
            sidebar: config.sidebar,
            defaultPath: config.defaultPath,
            buildPath: config.buildPath,
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
    log.error(e.message);
    return false;
  }
};
