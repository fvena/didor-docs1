<template lang="pug">
  transition(
    name="slide-down"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave")

    slot
</template>

<script>
export default {
  props: {
    float: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    beforeEnter(el) {
      el.style.height = '0';
    },

    enter(el) {
      if (this.float) {
        el.style.position = 'relative';
        el.style.height = `${el.scrollHeight}px`;
        el.style.position = 'absolute';
      } else {
        el.style.height = `${el.scrollHeight}px`;
      }
    },

    leave(el) {
      el.style.height = '0';
    },
  },
};
</script>

<style src="./SlideDownTransition.scss" lang="scss" scoped></style>
