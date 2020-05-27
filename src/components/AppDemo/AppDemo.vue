<template lang="pug">
  .appDemo(:class="{'appDemo--editable': editable, 'appDemo--showEditor': showEditor}")
    //- Demo
    Resize.appDemo__demo(v-if="demoContent" lockHeight)
      //- .appDemo__markdown(v-if="lang==='markdown'" v-html="demoContent")
      v-runtime-template.appDemo__markdown(v-if="lang==='markdown'" :template="demoContent")
      iframe.appDemo__iframe(v-else :src="demoContent" frameborder="0")

    //- Contenedor Editor
    .appDemo__editor(v-if="editable")

      //- Botón Mostrar/Ocultar Editor
      .appDemo__showEditor(@click="toggleEditor")
        svg(width="13" height="8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision" style="color: currentcolor;")
          polyline(points="2,6 6,2 10,6")
        | Editar código

      //- Editor
      .appDemo__code
        AppCode(
          :code="code"
          @change="refreshDemo"
          :lang="lang"
          editable)
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template';
import Resize from '@/components/Resize';
import AppCode from '@/components/AppCode';
import MarkdownUtils from '@/utils/markdown.utils';

export default {
  components: {
    VRuntimeTemplate,
    Resize,
    AppCode,
  },

  props: {
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'vue',
    },
    jsLib: {
      type: String,
      default: '',
    },
    cssLib: {
      type: String,
      default: '',
    },
    editable: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      demoContent: '',
      text: decodeURI(this.code),
      delay: null,
      showEditor: this.open,
      demoLibs: '',
    };
  },

  methods: {
    getDemoLibs() {
      const jsLib = this.jsLib ? this.jsLib.split(',') : [];
      const cssLib = this.cssLib ? this.cssLib.split(',') : [];
      let libs = '';

      jsLib.forEach(lib => {
        // eslint-disable-next-line no-useless-escape
        libs += `<script src="${lib}" rel="stylesheet"><\/script>`;
      });

      cssLib.forEach(lib => {
        libs += `<link href="${lib}" rel="stylesheet">`;
      });

      return libs;
    },

    async getDemoMarkdown(content) {
      const html = await MarkdownUtils.renderMarkdown(content);
      return `<div>${html.render}</div>`;
    },

    getDemoContent(content) {
      // Compruebo si es un componente completo o solo la parte del template
      if (!content.includes('<template>')) {
        content = `<template><div>${content}</div></template>`;
      }

      // Para poder pasar el código al iframe, necesito codificarlo previamente
      const encodeContent = encodeURIComponent(content.replace(/ {2}|\r\n|\n|\r/gm, ''));

      /* eslint-disable */
      const source = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1.0" />
            <title>Didor Demo</title>
            <script src="https://unpkg.com/vue"><\/script>
            <script src="https://unpkg.com/http-vue-loader"><\/script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.10.7/sass.sync.min.js"><\/script>
            ${this.demoLibs}
            <style>
              html {
                font-family: 'Source Sans Pro', Helvetica Neue, Arial, sans-serif;
                font-style: normal;
                font-weight: 400;
                line-height: 1.6rem;
                color: #3b4c54;
              }

              body {
                margin: 0;
              }

              #my-app {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 3.2rem 1.6rem;
              }
            </style>
          </head>

          <body>
            <div id="my-app">
              <my-component></my-component>
            </div>

            <script type="text/javascript">
              httpVueLoader.httpRequest = function(code) {
                return new Promise(function(resolve, reject) {
                  resolve(code);
                });
              };

              httpVueLoader.langProcessor.scss = function(scssText) {
                return new Promise(function(resolve, reject) {
                  Sass.compile(scssText, function (result) {
                    if ( result.status === 0 ) {
                      resolve(result.text)
                    } else {
                      reject(result)
                    }
                  });
                });
              }

              Vue.component("my-component", httpVueLoader('data:text/plain,' + decodeURIComponent('${encodeContent}')));
              Vue.config.devtools = false;
              Vue.config.productionTip = false;
              Vue.config.silent = true;

              new Vue({
                el: '#my-app',
                methods: {
                  resize() {
                    window.frameElement.style.height = this.$el.scrollHeight + 'px';
                  }
                },

                mounted() {
                  window.addEventListener('resize', this.resize);
                },

                updated() {
                  this.resize();
                },

                destroy() {
                  window.removeEventListener('resize', this.resize);
                }
              });
            <\/script>
          </body>
        </html>
      `;
      /* eslint-enable */
      const blob = new Blob([source], { type: 'text/html' });
      return URL.createObjectURL(blob);
    },

    /**
     * Actualiza la demo cada vez que hay cambios en el código
     * Para evitar que cada vez que se pulse una tecla se repinte la demo
     * añadimos un timeout de 1sg.
     */
    refreshDemo(code) {
      clearTimeout(this.delay);

      this.delay = setTimeout(async () => {
        if (this.lang === 'markdown') {
          this.demoContent = await this.getDemoMarkdown(code);
        } else {
          this.demoContent = this.getDemoContent(code);
        }
      }, 1000);
    },

    /**
     * Muestra/Oculta el contenido del dropdown
     */
    toggleEditor() {
      this.showEditor = !this.showEditor;
    },
  },

  async mounted() {
    this.demoLibs = this.getDemoLibs();

    if (this.lang === 'markdown') {
      this.demoContent = await this.getDemoMarkdown(this.text);
    } else {
      this.demoContent = this.getDemoContent(this.text);
    }
  },
};
</script>

<style src="./AppDemo.scss" lang="scss" scoped></style>
