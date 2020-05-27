<template lang="pug">
  .tab(v-show="isActive")
    slot
</template>

<script>
export default {
  name: 'Tab',
  props: {
    title: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isActive: false,
    };
  },
};
</script>
