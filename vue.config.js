module.exports = {
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
