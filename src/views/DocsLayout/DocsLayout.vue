<template lang="pug">
.docsLayout(:class="{ 'docsLayout--header-hidden': !showHeader }")

  //- Header Area
  AppHeader.docsLayout__header
    template(slot="headerMenu")
      AppMenu(ref="headerMenu" :links="navbarLinks" v-observe-visibility="{callback: closeHeaderMenus, intersection: { threshold: 0.9 }}")


  .docsLayout__main

    //- Sidebar Area
    .docsLayout__sidebar
      AppSidebar(:links="sidebarLinks")


    //- Content Area
    .docsLayout__content(ref="viewBox")
      .docsLayout__wrapper
        //- Article Area
        .docsLayout__article
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
        .docsLayout__footer Footer

  //- Botón para mostrar/ocultar el menú lateral
  .docsLayout__device-menu(:class="{'docsLayout__device-menu--show' : showDeviceMenu}")
    AppDeviceMenu(@isChange="toggleDeviceMenu")
      AppMenu.sidebar__main-nav(:links="navbarLinks" vertical)
      AppSidebar(:links="sidebarLinks")
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import AppMenu from '@/components/AppMenu';
import AppDeviceMenu from '@/components/AppDeviceMenu';
import { ObserveVisibility } from 'vue-observe-visibility';

export default {
  directives: {
    ObserveVisibility,
  },
  components: {
    AppHeader,
    AppSidebar,
    AppMenu,
    AppDeviceMenu,
  },
  data() {
    return {
      showDeviceMenu: false,
      showHeader: true,
      lastScrollPosition: 0,
      navbarLinks: [
        { title: 'Menu 1', link: '/nav1' },
        {
          title: 'Menu 2',
          children: [{ title: 'Sub Menu 1 Sub Menu 1 Sub Menu 1 Sub Menu 1 Sub Menu 1 Sub Menu 1', link: '/submenu1' }, { title: 'Sub Menu 2', link: '/submenu2' }, { title: 'Sub Menu 3', link: '/submenu3' }, { separator: true }, { title: 'Sub Menu 4', link: '/submenu4' }],
        },
        {
          title: 'Menu 3',
          children: [
            { title: 'Sub Menu 1', link: '/submenu5' },
            { title: 'Sub Menu 2', link: '/submenu6' },
            { title: 'Sub Menu 3', link: '/submenu7' },
            { title: 'Sub Menu 4', link: '/submenu8' },
          ],
        },
        { title: 'Menu 4', link: '/nav4' },
      ],
      sidebarLinks: [
        { title: 'Menu 1', link: '/nav1' },
        { title: 'Menu 2', link: '/nav2' },
        { title: 'Menu 3', link: '/nav3' },
        {
          title: 'Menu 4',
          children: [
            {
              title: 'Sub Menu 1',
              children: [
                { title: 'Sub Menu 1', link: '/submenu1' },
                { title: 'Sub Menu 2', link: '/submenu2' },
                { title: 'Sub Menu 3', link: '/submenu3' },
                { title: 'Sub Menu 4', link: '/submenu4' },
              ],
            },
            {
              title: 'Sub Menu 2',
              children: [
                { title: 'Sub Menu 1', link: '/submenu5' },
                { title: 'Sub Menu 2', link: '/submenu6' },
                { title: 'Sub Menu 3', link: '/submenu7' },
                { title: 'Sub Menu 4', link: '/submenu8' },
              ],
            },
          ],
        },
        {
          title: 'Menu 5',
          children: [
            { title: 'Sub Menu 1', link: '/submenu9' },
            { title: 'Sub Menu 2', link: '/submenu10' },
            { title: 'Sub Menu 3', link: '/submenu11' },
            { title: 'Sub Menu 4', link: '/submenu12' },
          ],
        },
      ],
    };
  },
  methods: {
    toggleDeviceMenu() {
      this.showDeviceMenu = !this.showDeviceMenu;
    },

    closeHeaderMenus() {
      this.$refs.headerMenu.closeAllDropdown();
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

<style src="./DocsLayout.scss" lang="scss" scoped></style>
