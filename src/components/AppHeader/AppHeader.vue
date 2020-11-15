<template lang="pug">
.appHeader
  //- Logotipo, enlaza con el home
  router-link.appHeader__logo(:to="{name: 'section'}")
    img(:src="logo" v-if="logo")
    span(v-else) {{ title }}

  .appHeader__bar
    //- Buscador
    slot(name="headerSearch")

    //- Menú Principal
    .appHeader__nav
      slot(name="headerMenu")

    //- Enlaces externos
    AppSocialLinks.appHeader__social

    //- Mostrar/Ocultar el menú móvil
    .appHeader__toggle-sidebar(:class="{'appHeader__toggle-sidebar--close': showMenu}" @click="toggleMenu")
      span
      span
      span
</template>

<script>
import AppSocialLinks from '@/components/AppSocialLinks';

export default {
  components: {
    AppSocialLinks,
  },

  props: {
    showMenu: {
      type: Boolean,
      default: false,
    },

    mode: {
      type: String,
      default: 'light',
    },

    title: {
      type: String,
      default: '',
    },
  },

  computed: {
    logo() {
      const lightLogo = window.$didor.customize.logo;
      const darkLogo = window.$didor.customize.logoDark;

      if (lightLogo && !darkLogo) return lightLogo;
      if (darkLogo && !lightLogo) return darkLogo;
      if (lightLogo && darkLogo) return this.mode === 'light' ? lightLogo : darkLogo;

      return null;
    },
  },

  methods: {
    toggleMenu() {
      this.$emit('toggleMenu');
    },
  },
};
</script>

<style src="./AppHeader.scss" lang="scss" scoped></style>
