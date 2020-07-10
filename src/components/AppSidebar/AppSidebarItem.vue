<template lang="pug">
  li.sidebarItem(:class="levelClass")
    router-link.sidebarItem__link(:to="link.link" v-if="link.link") {{ link.title }}
    .sidebarItem__title(v-else) {{ link.title }}

    AppSidebarLink(
      v-if="link.children.length"
      v-for="(children,key) in link.children"
      :key="key"
      :link="children"
      :deep="deep + 1")
</template>

<script>
export default {
  name: 'AppSidebarLink',
  props: {
    link: {
      type: Object,
      required: true,
    },
    deep: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    levelClass() {
      return `sidebarItem--level${this.deep}`;
    },
  },
};
</script>

<style src="./AppSidebarItem.scss" lang="scss" scoped></style>
