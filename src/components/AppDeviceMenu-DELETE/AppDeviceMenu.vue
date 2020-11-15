<template lang="pug">
.appDeviceMenu(:class="{'appDeviceMenu--show': isShow}")
  .appDeviceMenu__wrapper
    .appDeviceMenu__content
      slot

    //- Botón hamburguer para mostrar ocultar el menú
    .appDeviceMenu__hamburguer(:class="{'appDeviceMenu__hamburguer--close': isShow}" @click="toggle")
      .appDeviceMenu__hamburguer__wrapper
        span
        span
        span
</template>

<script>
export default {
  name: 'AppDeviceMenu',

  data() {
    return {
      isShow: false,
    };
  },

  methods: {
    /**
     * Muestra/Oculta el menú
     * Lanza un evento indicando la acción realizada
     */
    toggle() {
      this.isShow = !this.isShow;

      if (this.isShow) {
        this.$emit('isOpen');
      } else {
        this.$emit('isClose');
      }
    },
  },
};
</script>

<style src="./AppDeviceMenu.scss" lang="scss" scoped></style>
