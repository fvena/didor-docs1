<template lang="pug">
.header
  //- Botón para mostrar/ocultar el menú lateral
  .header__toggle-sidebar
    Hamburguer(@change="toggleSidebar")

  //- Logotipo + Link al home
  router-link.header__logo(:to="{name: 'section'}")
    Didor(title="Framework" horizontal)

  //- Buscador
  Search.header__search

  //- Menú Horizontal
  Menu.header__nav(
    ref="menu"
    v-observe-visibility="{callback: closeMenus, intersection: { threshold: 1 }}")

  //- Enlaces externos
  .header__social
    a.header__button(href="https://twitter.com/fvena" target="_blank")
      dd-icon(name="twitter" scale="0.9")
    a.header__button(href="https://github.com/fvena/didor-docs" target="_blank")
      dd-icon(name="github" scale="0.9")
</template>

<script>
import Vue from 'vue';
import Hamburguer from '@/components/Hamburguer.component.vue';
import Didor from '@/components/Didor.component.vue';
import Search from '@/components/Search.component.vue';
import Menu from '@/components/Menu.component.vue';
import { ObserveVisibility } from 'vue-observe-visibility';

Vue.directive('observe-visibility', ObserveVisibility);

export default {
  components: {
    Hamburguer,
    Didor,
    Search,
    Menu,
  },

  methods: {
    toggleSidebar(open) {
      this.$emit('toggleSidebar', open);
    },

    closeMenus() {
      this.$refs.menu.closeAllDropdown();
    },
  },
};
</script>

<style lang="scss" scoped></style>
