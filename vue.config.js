const path = require('path');
const config = require('./lib/build/default');

module.exports = {
  configureWebpack: {
    devServer: {
      contentBase: [path.join(process.cwd(), './public'), path.join(process.cwd(), './docs')],
      before: app => {
        app.get('/didor.config.js', async (req, res) => {
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

          if (config.lib.components || config.lib.styles) appConfig.jsLib.push(`http://localhost:${config.port}/lib_bundle.js`);

          res.send(`window.$didor = ${JSON.stringify(appConfig)}`);
        });
      },
    },
  },
  runtimeCompiler: true,
  transpileDependencies: ['@didor/didor'],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, '@/design/_var.scss')],
    },
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `
          @import "./node_modules/@didor/framework/src/_didor-share.scss";
          @import "./src/design/_var.scss";
        `,
      },
    },
  },
  // css: {
  //   sourceMap: true,
  //   loaderOptions: {
  //     // pass options to sass-loader
  //     sass: {
  //       // @/ is an alias to src/
  //       // so this assumes you have a file named `@/design/index.scss`
  //       data: `
  //         @import "@/design/_var.scss";
  //         @import "./node_modules/@didor/framework/src/_didor-share.scss";
  //       `,
  //     },
  //   },
  // },
};
