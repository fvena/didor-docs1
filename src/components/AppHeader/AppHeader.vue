<template lang="pug">
.appHeader
  //- Logotipo, enlaza con el home
  router-link.appHeader__logo(:to="{name: 'section'}")
    DidorLogo(title="Framework" horizontal)

  //- Buscador
  Search.appHeader__search

  //- Menú Principal
  .appHeader__nav
    slot(name="headerMenu")

  //- Enlaces externos
  .appHeader__social
    a.appHeader__button(href="https://twitter.com/fvena" target="_blank")
      dd-icon(name="twitter" scale="0.9")

    a.appHeader__button(href="https://github.com/fvena/didor-docs" target="_blank")
      dd-icon(name="github" scale="0.9")
</template>

<script>
import DidorLogo from '@/components/DidorLogo';
import Search from '@/components/Search.component.vue';

export default {
  components: {
    DidorLogo,
    Search,
  },
};
</script>

<style src="./AppHeader.scss" lang="scss" scoped></style>
