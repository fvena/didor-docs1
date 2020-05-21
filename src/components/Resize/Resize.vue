<template lang="pug">
  .resize(ref="container" :class="{'resize--width':!lockWidth, 'resize--height':!lockHeight}")
    //- Botones para modificar el tamaño del contenedor
    .resize__width(ref="widthDragger" v-if="!lockWidth")
    .resize__height(ref="heihgtDragger" v-if="!lockHeight")
    .resize__both(ref="sizeDragger" v-if="!lockWidth && !lockHeight")

    //- Visor del tamaño del contenedor
    .resize__size(:class="{'visible':dragging}") {{ widthSize }}x{{ heightSize }} px

    //- Cuando el contenido es un iframe, al estrechar el contenedor
    //- si el cursor pasa por encima del iframe, se dejan de recibir
    //- los eventos y se produce un funcionamiento anómalo
    .resize__protective(v-if="dragging")

    //- Contenido
    slot


</template>

<script>
export default {
  props: {
    lockWidth: {
      type: Boolean,
      default: false,
    },
    lockHeight: {
      type: Boolean,
      default: false,
    },
    widthMin: {
      type: Number,
      default: 150,
    },
    heightMin: {
      type: Number,
      default: 150,
    },
    widthDefault: {
      type: String,
      default: '100%',
    },
    heightDefault: {
      type: String,
      default: 'auto',
    },
  },

  data() {
    return {
      widthInit: '',
      widthSize: '',
      heightInit: '',
      heightSize: '',
      resizer: '',
      dragging: false,
      hideSize: null,
    };
  },

  methods: {
    /**
     * Inicializa el componente
     *
     * Añade los eventos a los distintos elementos
     * y almacena los valores inciales
     */
    initialize() {
      const container = this.$refs.container;

      this.widthInit = container.offsetWidth;
      this.heightInit = container.offsetHeight;
      this.widthSize = container.offsetWidth;
      this.heightSize = container.offsetHeight;

      container.style.width = this.widthDefault;
      container.style.height = this.heightDefault;

      // Evento sobre el botón diagonal
      if (!this.lockWidth && !this.lockHeight) {
        this.$refs.sizeDragger.addEventListener('mousedown', event => {
          event.preventDefault();

          this.resizer = 'both';
          this.dragging = true;
          clearTimeout(this.hideSize);

          window.addEventListener('mousemove', this.resize);
          window.addEventListener('mouseup', this.stopResize);
        });
      }

      // Evento sobre el botón de la anchura
      if (!this.lockWidth) {
        this.$refs.widthDragger.addEventListener('mousedown', event => {
          event.preventDefault();

          this.resizer = 'width';
          this.dragging = true;
          clearTimeout(this.hideSize);

          window.addEventListener('mousemove', this.resize);
          window.addEventListener('mouseup', this.stopResize);
        });
      }

      // Evento sobre el botón de la altura
      if (!this.lockHeight) {
        this.$refs.heihgtDragger.addEventListener('mousedown', event => {
          event.preventDefault();

          this.resizer = 'height';
          this.dragging = true;
          clearTimeout(this.hideSize);

          window.addEventListener('mousemove', this.resize);
          window.addEventListener('mouseup', this.stopResize);
        });
      }
    },

    resize(event) {
      if (!this.dragging) return;

      const container = this.$refs.container;

      /**
       * Modifica la anchura del contenedor
       */
      if (this.resizer === 'width' || this.resizer === 'both') {
        // Obtengo la nueva anchura
        const width = Math.round(event.pageX - container.getBoundingClientRect().left);

        // Si el nuevo tamaño es similar al tamaño inicial,
        // hago que se iguale automáticamente para simular un efecto de imán
        if (width + 15 < this.widthInit || width - 15 > this.widthInit) {
          this.widthSize = width > this.widthMin ? width : this.widthMin;
        } else {
          this.widthSize = this.widthInit;
        }

        // Cuando la anchura del contenedor es mayor que su anchura inicial
        // lo desplazo a la izquierda para que quede centrado horizontalmente
        let left = 0;
        if (this.widthSize > this.widthInit) {
          left = Math.round((this.widthInit - this.widthSize) / 2);
        }

        // Actualizo el estilo del contenedor
        container.style.width = `${this.widthSize}px`;
        container.style.left = `${left}px`;
      }

      /**
       * Modifica la altura del contenedor
       */
      if (this.resizer === 'height' || this.resizer === 'both') {
        // Obtengo la nueva anchura
        const height = Math.round(event.pageY - container.getBoundingClientRect().top);

        // Si el nuevo tamaño es similar al tamaño inicial,
        // hago que se iguale automáticamente para simular un efecto de imán
        if (height + 15 < this.heightInit || height - 15 > this.heightInit) {
          this.heightSize = height > this.heightMin ? height : this.heightMin;
        } else {
          this.heightSize = this.heightInit;
        }

        // Actualizo el estilo del contenedor
        container.style.height = `${this.heightSize}px`;
      }
    },

    /**
     * Deja de modificar las dimensiones del contendor
     */
    stopResize(event) {
      event.preventDefault();
      clearTimeout(this.hideSize);

      this.hideSize = setTimeout(() => {
        this.dragging = false;
      }, 300);

      this.$emit('change');

      window.removeEventListener('mousemove', this.resize);
    },
  },

  mounted() {
    this.initialize();
  },
};
</script>

<style src="./Resize.scss" lang="scss" scoped></style>
