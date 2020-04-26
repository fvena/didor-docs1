<template lang="pug">
.docsLayout(:class="{ 'docsLayout--header-hidden': !showHeader }")

  //- Header Area
  AppHeader.docsLayout__header
    template(slot="headerMenu")
      AppMenu(
        ref="headerMenu"
        :links="navbarLinks"
        v-observe-visibility="{callback: closeHeaderMenus, intersection: { threshold: 0.9 }}")

  .docsLayout__main

    //- Sidebar Area
    .docsLayout__sidebar
      AppSidebar(:links="sidebarLinks")


    //- Content Area
    .docsLayout__content(ref="viewBox")
      .docsLayout__wrapper
        //- Article Area
        .docsLayout__article
          h1 Ideal Insight
          p Ideal Insight are a creative agency who specialise in video and social media campaigns. The Ideal Insight team approached us to design a stunning modern website that would showcase the quality of their videos to potential clients.

          h2 An engaging platform to showcase quality videos
          p The Ideal Insight team wanted the website to feature a selection of their best video content. In line with their brand guidelines, they wanted the website to have a slick and confident feel with strong typography and plenty of spacing.
          p Our main challenge was to make sure Ideal Insight’s videos would load quickly and play seamlessly on all devices. While our primary goal was to showcase the videos, the website would also promote Ideal Insight’s brand. So we needed to create an engaging interface that would complement the videos but not distract from them.

          h3 UX Wireframes
          p Because users’ attention would be focussed on the videos, the site needed to be very intuitive to navigate. We built a series of wireframes to ensure layout and navigation was as simple as possible from the outset.

          h3 Prototyping
          p Next, we created a series of prototypes to refine the site’s visuals and content. Here we worked closely with the Ideal Insight team. The team could click through each prototype version to experience browsing from the users’ perspective. This made it easy for them to choose appropriate content for each page.

          h3 Typography
          p Working to Ideal Insight’s basic guidelines, we developed a bold typography style. For a balanced look we’ve contrasted a modern serif body font with san-serif headings. We also created a clear hierarchy by contrasting font size and colour, which makes the text very easy to scan.

          h3 Custom Iconography
          p We created unique icons to describe the key benefits Ideal Insight offer. These icons enhance the Ideal Insight brand and help users see benefits at a glance. We’ve passed these to the Ideal Insight team for use on their future marketing materials.


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
  AppDeviceMenu.docsLayout__device-menu
    DidorLogo(title="Framework")
    AppMenu(:links="navbarLinks" vertical)
    AppSocialLinks
    AppSidebar(:links="sidebarLinks")
</template>

<script>
import DidorLogo from '@/components/DidorLogo';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import AppMenu from '@/components/AppMenu';
import AppDeviceMenu from '@/components/AppDeviceMenu';
import AppSocialLinks from '@/components/AppSocialLinks';
import { ObserveVisibility } from 'vue-observe-visibility';

export default {
  directives: {
    ObserveVisibility,
  },
  components: {
    DidorLogo,
    AppHeader,
    AppSidebar,
    AppMenu,
    AppDeviceMenu,
    AppSocialLinks,
  },
  data() {
    return {
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
