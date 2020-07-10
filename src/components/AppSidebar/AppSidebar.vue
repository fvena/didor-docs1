<template lang="pug">
.sidebar
  nav.sidebar__wrapper(v-if="links.length")
    AppSidebarItem(
      v-for="(link,key) in links"
      :key="key"
      :link="link"
      :deep="1")
</template>

<script>
import AppSidebarItem from './AppSidebarItem.vue';

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarItem,
  },
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style src="./AppSidebar.scss" lang="scss" scoped></style>
