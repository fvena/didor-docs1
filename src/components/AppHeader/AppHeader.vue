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
  AppSocialLinks.appHeader__social
</template>

<script>
import DidorLogo from '@/components/DidorLogo';
import AppSocialLinks from '@/components/AppSocialLinks';
import Search from '@/components/Search.component.vue';

export default {
  components: {
    DidorLogo,
    AppSocialLinks,
    Search,
  },
};
</script>

<style src="./AppHeader.scss" lang="scss" scoped></style>
