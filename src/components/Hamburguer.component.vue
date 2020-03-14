<template lang="pug">
  .hamburguer(:class="{'hamburguer--close': close}" @click="change")
    .hamburguer__wrapper
      span
      span
      span
</template>

<script>
export default {
  data() {
    return {
      close: false,
    };
  },

  methods: {
    change() {
      this.close = !this.close;
      this.$emit('change', this.close);
    },
  },
};
</script>

<style lang="scss" scoped>
.hamburguer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;

  span {
    display: block;
    width: 20px;
    height: 3px;
    background-color: color(gray2);
    border-radius: 2px;
    transition: $transition;

    &:nth-child(1) {
      transform: scaleX(1);
    }
    &:nth-child(2) {
      margin: 3px 0;
      transform: scaleX(0.6) translate(-6px, 0);
    }
    &:nth-child(3) {
      transform: scaleX(0.8) translate(-2px, 0);
    }
  }

  &--close {
    span:nth-child(1) {
      transform: scaleX(1) rotate(45deg) translate(2px, 2px);
    }
    span:nth-child(2) {
      transform: scaleX(0);
    }
    span:nth-child(3) {
      transform: scaleX(1) rotate(-45deg) translate(6.5px, -6.5px);
    }
  }
}
</style>
