<template lang="pug">
  .tabs
    .tabs__titles
      .tabs__title(
        v-for="(tab, key) in tabs"
        :class="{'tabs__title--select': tab.isActive }"
        @click="selectTab(tab)")
        | {{ tab.title }}
    .tabs__content
      slot
</template>

<script>
import Tab from './Tab.vue';

export default {
  name: 'Tabs',
  components: {
    Tab,
  },
  data() {
    return {
      tabs: [],
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.title === selectedTab.title;
      });
    },
  },

  async created() {
    this.tabs = await this.$children;
    this.tabs[0].isActive = true;
  },
};
</script>

<style src="./Tabs.scss" lang="scss" scoped></style>
