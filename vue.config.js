module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/design/_var.scss";
          @import "./node_modules/@didor/framework/src/_didor-share.scss";
        `,
      },
    },
  },
};
