<template lang="pug">
.appHeader
  //- Logotipo, enlaza con el home
  router-link.appHeader__logo(:to="{name: 'section'}")
    img(:src="logo" v-if="logo")
    img.didorLogo(src="/didorLogo.svg" v-else)

  .appHeader__bar

    //- Buscador
    Search.appHeader__search

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
    //- .appHeader__toggle-sidebar(@click="toggleMenu")
    //-   dd-icon(name="menu" scale="0.8")
</template>

<script>
import AppSocialLinks from '@/components/AppSocialLinks';
import Search from '@/components/Search.component.vue';

export default {
  components: {
    AppSocialLinks,
    Search,
  },

  props: {
    showMenu: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      logo: '',
    };
  },

  methods: {
    toggleMenu() {
      this.$emit('toggleMenu');
    },
  },

  created() {
    this.logo = window.$didor.logo;
  },
};
</script>

<style src="./AppHeader.scss" lang="scss" scoped></style>
