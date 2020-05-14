<template lang="pug">
  .collapse(:class="{'collapse--open': isOpen}")
    .collapse__header(@click.prevent="toggle")
      | {{ title }}
      svg.collapse__icon(width="16" height="9")
        polyline(points="2,8 8,2 14,8")

    transition(
      name="collapse"
      @before-enter="start"
      @enter="end"
      @before-leave="end"
      @leave="start")
      .collapse__body(v-if="isOpen")
        .collapse__content
          slot
</template>

<script>
export default {
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
    start(el) {
      el.style.height = '0';
    },
    end(el) {
      el.style.height = `${el.scrollHeight}px`;
    },
  },
};
</script>

<style src="./Collapse.scss" lang="scss" scoped></style>
