<template lang="pug">
  .appDeviceMenu
    slot

    .hamburguer(:class="{'hamburguer--close': isClose}" @click="change")
      .hamburguer__wrapper
        span
        span
        span
</template>

<script>
export default {
  data() {
    return {
      isClose: false,
    };
  },

  methods: {
    change() {
      this.isClose = !this.isClose;
      this.$emit('isChange', this.isClose);
    },
  },
};
</script>

<style src="./AppDeviceMenu.scss" lang="scss" scoped></style>
