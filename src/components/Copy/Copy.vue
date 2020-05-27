<template lang="pug">
  .copy(ref="copyButton")
    .copy__content
      slot
    .copy__value(v-if="title") {{ title }}
</template>

<script>
import Clipboard from 'clipboard';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },
  },

  methods: {
    /**
     * Habilita la opción de copiar el valor
     *
     * TODO: Mostrar un mensaje indicando el resultado de la acción
     */
    initializeClipboard() {
      const clipboard = new Clipboard(this.$refs.copyButton, {
        text: () => this.value,
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
  },

  mounted() {
    this.initializeClipboard();
  },
};
</script>

<style src="./Copy.scss" lang="scss" scoped></style>
