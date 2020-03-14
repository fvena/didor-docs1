<template lang="pug">
nav.menu
  li.menu__item
    router-link(to="/nav1") Menu 1
  li.menu__item
    Dropdown(
      title="Menu 2"
      ref="dropdown1"
      :options="links"
      @change="linkTo"
      float)
  li.menu__item
    Dropdown(
      title="Menu 3"
      ref="dropdown2"
      :options="links"
      @change="linkTo"
      float)
  li.menu__item
    router-link(to="/nav1") Menu 4
</template>

<script>
import Dropdown from '@/components/Dropdown.component.vue';

export default {
  components: {
    Dropdown,
  },

  data() {
    return {
      links: [
        { title: 'Sub Menu 1', value: 'submenu1' },
        { title: 'Sub Menu 2', value: 'submenu2' },
        { title: 'Sub Menu 3', value: 'submenu3' },
        { title: 'Sub Menu 4', value: 'submenu4' },
      ],
    };
  },

  methods: {
    linkTo(value) {
      console.log(value);
    },

    closeAllDropdown() {
      Object.keys(this.$refs).forEach(item => this.$refs[item].close());
    },
  },

  beforeDestroy() {
    this.closeAllDropdown();
  },
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: row;

  &__item {
    position: relative;
    margin: 0;
    list-style: none;
    user-select: none;

    a {
      padding: 0 half();
      color: color(gray1);
      white-space: nowrap;
      cursor: pointer;
      border: none;
      transition: 0.15s;
    }
  }

  &::v-deep .dropdown {
    .dropdown__header {
      padding-left: half();
      color: color(gray1);
    }
  }
}
</style>
