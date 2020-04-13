<template lang="pug">
  .dropdown(
    v-click-outside:isVisible="close"
    :class="{'dropdown--open': isVisible, 'dropdown--float': float, 'dropdown--link-active': isChildrenLinkActive}"
    :disable-click-outside="!closeOutside")

    //- Dropdown Header
    //- Esta es la parte que será visible siempre
    .dropdown__header(@click.stop.prevent="toggle")
      a(aria-haspopup="true" aria-controls="{ 'dropdown-menu'}") {{ title }}
      svg.dropdown__icon(width="13" height="8")
        polyline(points="2,6 6,2 10,6")

    //- Transición
    SlideDownTransition(:float="float")

      //- Dropdown List
      .dropdown__content(v-if="isVisible" role="menu")

        //- Dropdown Item
        .dropdown__item(
          v-for="(item, key) in options"
          :key="key")

          //- Opción
          a.dropdown__item--option(
            v-if="item.value"
            @click="change(item.value)")
            | {{ item.title }}

          //- Link externo
          a.dropdown__item--link(
            v-if="item.link && item.link.startsWith('http')"
            :href="item.link"
            target="_blanck"
            @click="close")
            | {{ item.title }}

          //- Link interno
          router-link.dropdown__item--link(
            v-if="item.link"
            :to="item.link"
            @click.native="close")
            | {{ item.title }}

          //- Separador
          .dropdown__item--separator(v-if="item.separator")
</template>

<script>
import SlideDownTransition from '@/components/SlideDownTransition';
import ClickOutside from '@/directives/ClickOutside.directive';

export default {
  name: 'Dropdown',
  components: {
    SlideDownTransition,
  },
  directives: {
    ClickOutside,
  },

  data() {
    return {
      isVisible: false,
    };
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    float: {
      type: Boolean,
      default: true,
    },

    closeOutside: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    /**
     * Comprueba si alguno de los links está activo
     */
    isChildrenLinkActive() {
      const path = this.$route.path;
      return this.options.some(item => item.link === path);
    },
  },

  methods: {
    /**
     * Muestra/Oculta el contenido del dropdown
     */
    toggle() {
      this.isVisible = !this.isVisible;

      if (this.isVisible) this.$emit('isOpen');
      else this.$emit('isClose');
    },

    /**
     * Emite un evento con el valor de la opción y oculta el contenido del dropdown
     */
    change(value) {
      this.$emit('isChange', value);
      this.close();
    },

    /**
     * Oculta el contenido del dropdown
     */
    close() {
      this.isVisible = false;
      this.$emit('isClose');
    },
  },
};
</script>

<style src="./Dropdown.scss" lang="scss" scoped></style>
