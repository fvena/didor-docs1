<template lang="pug">
nav.appMenu(:class="{'appMenu--vertical': vertical}")

  //- Menu Item
  li.appMenu__item(v-for="(item, key) in links" :key="key")

    //- Link externo
    a.appMenu__item--link(
      v-if="item.link && item.link.startsWith('http')"
      :href="item.link"
      target="_blanck")
      | {{ item.title }}

    //- Link interno
    router-link.appMenu__item--link(
      v-if="item.link"
      :to="item.link")
      | {{ item.title }}

    //- Dropdown
    Dropdown.appMenu__item--dropdown(
      v-if="item.children"
      :title="item.title"
      :ref="'dropdown' + key"
      :options="item.children"
      :float="!vertical"
      :closeOutside="!vertical")
</template>

<script>
import Dropdown from '@/components/Dropdown';

export default {
  components: {
    Dropdown,
  },

  props: {
    vertical: {
      type: Boolean,
      default: false,
    },

    links: {
      type: Array,
      required: true,
    },
  },

  methods: {
    closeAllDropdown() {
      Object.keys(this.$refs).forEach(item => this.$refs[item][0].close());
    },
  },
};
</script>

<style src="./AppMenu.scss" lang="scss" scoped></style>
