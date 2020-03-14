<template lang="pug">
.docs(:class="{ 'docs--header-hidden': !showHeader }")
  //- Header Area
  Header.docs__header(@toggleSidebar="toggleSidebar")

  .docs__main
    //- Sidebar Area
    .docs__sidebar(:class="{'docs__sidebar--show' : showSidebar}")
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar
      div Sidebar

    //- Content Area
    .docs__content(ref="viewBox")
      .docs__wrapper
        //- Article Area
        .docs__article
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo
          div Artículo

        //- Footer Area
        .docs__footer Footer
</template>

<script>
import Header from '@/components/Header.component.vue';

export default {
  components: {
    Header,
  },
  data() {
    return {
      showSidebar: false,
      showHeader: true,
      lastScrollPosition: 0,
    };
  },
  methods: {
    toggleSidebar(open) {
      this.showSidebar = open;
    },

    onScroll() {
      const box = this.$refs.viewBox;
      const currentScrollPosition = box.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }

      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 85) {
        return;
      }

      this.showHeader = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },

  mounted() {
    const box = this.$refs.viewBox;
    box.addEventListener('scroll', this.onScroll, false);
  },

  beforeDestroy() {
    const box = this.$refs.viewBox;
    box.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style lang="scss" scoped></style>
