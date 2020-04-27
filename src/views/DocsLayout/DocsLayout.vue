<template lang="pug">
.docsLayout(:class="{ 'docsLayout--header-hidden': !showHeader, 'docsLayout--sidebar-hidden': !sidebarLinks.length }")

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
          AppArticle(
            v-if="content"
            :data="content")

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
import AppArticle from '@/components/AppArticle';
import { ObserveVisibility } from 'vue-observe-visibility';
import DefaultConfig from '@/didor.config.js';
import FileService from '@/services/file.service';
import ParamsUtil from '@/utils/params.utils';
import ArrayUtil from '@/utils/array.utils';

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
    AppArticle,
  },
  data() {
    return {
      logo: '',
      github: '',
      defaultPath: '',
      navbarPath: '',
      sidebarPath: '',
      section: null,
      article: null,
      showHeader: true,
      lastScrollPosition: 0,
      navbarLinks: [],
      sidebarLinks: [],
      content: '',
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

    /**
     * Obtiene los datos para mostrar la documentación
     *
     * @params {String} routeTo - Ruta de destino
     * @params {String} routeFrom - Ruta de origen
     */
    async getData(routeTo, routeFrom) {
      /**
       * Si la ruta viene con un "/" al final,
       * da problemas al comparar la ruta
       */
      if (routeTo !== '/' && routeTo.slice(-1) === '/') {
        routeTo = routeTo.slice(0, -1);
      }

      /**
       * Si no se especifica ninguna ruta y tengo un artículo por defecto
       * redirijo a dicho artículo
       */
      if (routeTo === '/' && this.defaultPath) {
        this.$router.push(this.defaultPath);
      }

      /**
       * Cuando tenemos secciones y no se especifica ninguna ruta, redirecciono a la primera sección
       * El listado 'this.navbarLinks' puede contener una estructura anidada
       * para asegurarme que obtengo el primer link, lo busco en una estructura plana
       */
      if (routeTo === '/' && ArrayUtil.checkArray(this.navbarLinks)) {
        const flatNavbarLinks = ArrayUtil.flattenList(this.navbarLinks);
        const firstSection = flatNavbarLinks[0].link;
        this.$router.push(firstSection);
      }

      /**
       * Si la sección ha cambiado, obtenemos la nueva sección y el sidebar
       */
      const fromSection = ParamsUtil.getSection(routeFrom);
      const toSection = ParamsUtil.getSection(routeTo);

      if (fromSection !== toSection) {
        /**
         * Si la sección ha cambiado, inicializo los valores
         */
        this.section = null;
        this.sidebarLinks = [];

        /**
         * Si tenemos secciones, busco la sección actual
         */
        if (ArrayUtil.checkArray(this.navbarLinks)) {
          const section = await ArrayUtil.searchItemByLinks(this.navbarLinks, toSection);
          this.section = section.current;
        }

        /**
         * Compruebo si la sección actual es un archivo o un directorio
         * si es un directorio, intento obtener el listado de artículos
         */
        const sectionIsFolder = this.section && this.section.file.slice(-3) !== '.md';

        if (sectionIsFolder) {
          const sidebarPath = `${this.section.file}/${this.sidebarPath}`;
          const sectionLink = this.section.link;
          this.sidebarLinks = await FileService.getLinks(sidebarPath, sectionLink);
        }
      }

      /**
       * Si tenemos un listado de artículos, busco el artículo actual
       */
      this.article = null;
      this.content = '';
      this.deviceShow = false;

      if (ArrayUtil.checkArray(this.sidebarLinks)) {
        /**
         * Cuando no se especifica ninguna ruta o la ruta es una sección,
         * redirecciono al primer artículo de la sección
         * El listado 'this.sidebarLinks' puede contener una estructura anidada
         * para asegurarme que obtengo el primer link, lo busco en una estructura plana
         */
        if (routeTo === '/' || (this.section && this.section.link === routeTo)) {
          const flatSidebarLinks = ArrayUtil.flattenList(this.sidebarLinks);
          const firstArticle = flatSidebarLinks[0].link;
          this.$router.push(firstArticle);
          return;
        }

        this.article = await ArrayUtil.searchItemByLinks(this.sidebarLinks, routeTo);
      }

      /**
       * Obtenemos el contenido del árticulo y los datos
       */
      const file = this.article ? this.article.current.file : this.section ? this.section.file : '';
      const content = file ? await FileService.getArticle(file) : null;
      const title = this.article ? this.article.current.title : this.section ? this.section.title : '';

      this.content = content && content.render ? content.render : '';
      this.deviceShow = content && content.data && content.data.device ? content.data.device : false;

      document.title += ` - ${title}`;
    },
  },

  async created() {
    /**
     * Obtengo la configuración del proyecto
     */
    const config = { ...DefaultConfig, ...window.$didor };

    this.logo = config.logo;
    this.github = config.gitRepoLink;
    this.defaultPath = config.defaultPath;
    this.navbarPath = config.navbar;
    this.sidebarPath = config.sidebar;

    document.title = config.title;

    /**
     * Intento obtener los links de la secciones
     */
    this.navbarLinks = await FileService.getLinks(this.navbarPath);

    /**
     * Obtengo los datos de la ruta
     */
    this.getData(this.$route.path);
  },

  mounted() {
    const box = this.$refs.viewBox;
    box.addEventListener('scroll', this.onScroll, false);
  },

  beforeDestroy() {
    const box = this.$refs.viewBox;
    box.removeEventListener('scroll', this.onScroll);
  },

  async beforeRouteUpdate(routeTo, routeFrom, next) {
    /**
     * Por defecto, si la ruta de destino apunta a una sección y no a un artículo
     * redirijo al primer artículo de dicha sección.
     * El problema es que si estoy en el primer artículo de la sección,
     * y pulso en algún enlace que apunte a la sección,
     * al intentar ir a la misma ruta en la que me encuentro se genera un error.
     * Para evitarlo, compruebo cuando se dá el caso y evito que la redirección.
     */

    /**
     * Cuando tenemos secciones:
     * Si la ruta de destino apunta a la sección actual,
     * compruebo si la ruta de ORIGEN coincide con el primer artículo de la sección,
     * en cuyo caso no debo realizar la redirección.
     */
    const sectionLink = this.section ? this.section.link : '/';

    if (this.sidebarLinks && routeTo.path === sectionLink) {
      const flatSidebarLinks = ArrayUtil.flattenList(this.sidebarLinks);
      const firstSection = flatSidebarLinks[0].link;
      if (routeFrom.path === firstSection) return;
    }

    /**
     * Cuando no tenemos secciones y tenemos un listado de artículos:
     * Si la ruta de destino apunta a la raíz, se cargará por defecto el primer artículo,
     * compruebo si la ruta de ORIGEN coincide con el primer artículo de la sección,
     * en cuyo caso no debo realizar la redirección.
     */
    if (!this.sidebarLinks && this.navbarLinks && routeTo.path === '/') {
      const flatNavbarLinks = ArrayUtil.flattenList(this.navbarLinks);
      const firstArticle = flatNavbarLinks[0].link;
      if (routeFrom.path === firstArticle) return;
    }

    /**
     * Obtengo los datos de la nueva ruta
     */
    await this.getData(routeTo.path, routeFrom.path);

    next();
  },
};
</script>

<style src="./DocsLayout.scss" lang="scss" scoped></style>
