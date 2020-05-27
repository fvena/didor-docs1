<template lang="pug">
  .appCode(:class="{'appCode--hasFilename': filename}" :data-lang="lang")

    //- Nombre del archivo
    .appCode__filename(v-if="filename")
      dd-icon(name="file" scale="0.7")
      | {{ filename }}

    //- Botones
    .appCode__buttons
      //- Botón reset
      .appCode__button(@click="reset" v-if="editable")
        dd-icon(name="rotate-cw" scale="0.7")

      //- Botón copiar
      .appCode__button(ref="copyButton")
        dd-icon(name="copy" scale="0.7")

    //- Textarea que utiliza codemirror para obtener el código
    .appCode__code
      textarea(ref="textarea")
</template>

<script>
import CodeMirror from 'codemirror';
import Clipboard from 'clipboard';

// language
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/pug/pug';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/markdown/markdown';

// base style AND theme css
import 'codemirror/lib/codemirror.css';

export default {
  props: {
    lang: {
      type: String,
      default: 'javascript',
    },
    code: {
      type: String,
      default: '',
    },
    lines: {
      type: String,
      required: false,
    },
    filename: {
      type: String,
      required: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      editor: null,
      text: decodeURI(this.code).trim(),
    };
  },

  methods: {
    /**
     * Inicializa y configura el editor de código
     */
    initializeEditor() {
      // Parece que findModebyname no reconoce la cadena 'vue', por lo que tengo que manejarla manualmente
      const lang = this.lang === 'vue' ? 'vue' : CodeMirror.findModeByName(this.lang).mode;

      this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
        readOnly: !this.editable,
        mode: lang,
        tabSize: 2,
        lineNumbers: true,
        viewportMargin: Infinity,
      });

      this.editor.setValue(this.text);

      this.editor.on('change', () => {
        this.$emit('change', this.editor.getValue());
      });

      this.showSelectedLines(this.lines);
      this.initializeClipboard();
    },

    /**
     * Ilumina las líneas seleccionadas
     *
     * ejemplo: 3
     * ejemplo: 3,5,7
     * ejemplo: 6-9
     * ejemplo: 3,6-9
     */
    showSelectedLines(data) {
      if (!data) return;

      const blocks = data.split(',');
      blocks.forEach(block => {
        const lines = block.split('-');

        if (lines.length === 2) {
          const firstLine = parseInt(lines[0], 10) - 1;
          const lastLine = parseInt(lines[1], 10) - 1;

          for (let line = firstLine; line <= lastLine; line += 1) {
            this.editor.addLineClass(line, 'background', 'cm-test-highlight');
          }
        } else if (lines.length === 1) {
          const line = parseInt(lines, 10) - 1;
          this.editor.addLineClass(line, 'background', 'cm-test-highlight');
        }
      });
    },

    /**
     * Habilita la opción de copiar código
     *
     * TODO: Mostrar un mensaje indicando el resultado de la acción
     */
    initializeClipboard() {
      const clipboard = new Clipboard(this.$refs.copyButton, {
        text: () => this.editor.getValue(),
      });

      // Evento cuando el código se ha copiado correctamente
      clipboard.on('success', e => {
        console.info('Copiado al portapapeles');

        e.clearSelection();
      });

      // Evento cuando el código no se ha copiado y ha ocurrido un error
      clipboard.on('error', () => {
        console.error('Error al copiar el código');
      });
    },

    /**
     * Restaura la demo y el código a su valor por defecto
     *
     * TODO: Mostrar un mensaje indicando el resultado de la acción
     */
    reset() {
      if (!this.editable) return;

      this.editor.setValue(this.text);
      console.info('El código ha sido restaurado');
    },
  },

  mounted() {
    this.initializeEditor();
  },
};
</script>

<style src="./AppCode.scss" lang="scss" scoped></style>
