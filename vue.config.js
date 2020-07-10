const path = require('path');

module.exports = {
  configureWebpack: {
    devServer: {
      contentBase: [path.join(process.cwd(), './public'), path.join(process.cwd(), './docs')],
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
          @import "./node_modules/@didor/styles/src/_didor-share.scss";
          @import "./src/design/_var.scss";
        `,
      },
    },
  },
};
