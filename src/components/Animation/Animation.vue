<template lang="pug">
  component(
    :is="componentType"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"
    v-bind="$attrs"
    v-on="hooks")
    slot
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: '',
    },
    enter: {
      type: String,
      required: false,
    },
    leave: {
      type: String,
      required: false,
    },
    /**
     * Transition duration. Número para especificar la misma duración para las transiciones de entrada y salida.
     * Objeto para especificar duraciones diferentes {enter: 300, leave: 300}.
     */
    duration: {
      type: [Number, Object],
      default: 300,
    },
    /**
     * Transition delay. Número para especificar el mismo retraso para las transiciones de entrada y salida.
     * Objeto para especificar retrasos diferentes {enter: 300, leave: 300}.
     */
    delay: {
      type: [Number, Object],
      default: 0,
    },
    /**
     * Indica si es una transición de grupo.
     */
    group: {
      type: Boolean,
      default: false,
    },
    /**
     *  Posición del origen de la transición https://tympanus.net/codrops/css_reference/transform-origin/.
     *  center, left, top center, bottom right, 100% 30px, 30% 50% 0px,
     */
    origin: {
      type: String,
      default: '',
    },
  },

  computed: {
    componentType() {
      return this.group ? 'transition-group' : 'transition';
    },

    enterClass() {
      return this.enter ? `${this.enter}In` : `${this.name}In`;
    },

    leaveClass() {
      return this.leave ? `${this.leave}Out` : `${this.name}Out`;
    },

    hooks() {
      return {
        ...this.$listeners,
        beforeEnter: el => {
          this.setConfig(el);
          this.$emit('before-enter', el);
        },
        afterEnter: el => {
          this.cleanUpConfig(el);
          this.$emit('after-enter', el);
        },
        beforeLeave: el => {
          this.setConfig(el);
          this.$emit('after-enter', el);
        },
        afterLeave: el => {
          this.cleanUpConfig(el);
          this.$emit('before-leave', el);
        },
      };
    },
  },

  methods: {
    setConfig(el) {
      const enterDuration = this.duration.enter ? this.duration.enter : this.duration;
      el.style.animationDuration = `${enterDuration}ms`;

      const enterDelay = this.delay.enter ? this.delay.enter : this.delay;
      el.style.animationDelay = `${enterDelay}ms`;

      if (this.origin) {
        el.style.transformOrigin = this.origin;
      }
    },

    cleanUpConfig(el) {
      el.style.animationDuration = '';
      el.style.animationDelay = '';
      el.style.transformOrigin = '50% 50%';
    },
  },
};
</script>

<style src="./Animation.scss" lang="scss" scoped></style>
