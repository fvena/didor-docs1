<template lang="pug">
  .collapse(:class="{'collapse--open': isOpen}")
    .collapse__header(@click.prevent="toggle")
      | {{ title }}
      svg.collapse__icon(width="16" height="9")
        polyline(points="2,8 8,2 14,8")

    SlideDownTransition
      .collapse__body(v-show="isOpen")
        .collapse__content
          slot
</template>

<script>
import SlideDownTransition from '@/components/SlideDownTransition';

export default {
  components: {
    SlideDownTransition,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style src="./Collapse.scss" lang="scss" scoped></style>
