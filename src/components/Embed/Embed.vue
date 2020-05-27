<template lang="pug">
  .embedContent
    Resize
      .embedContent__block
        slot

    a.embedContent__link(
      v-if="link"
      :href="link"
      target="_blank")
      | {{ link }}
</template>

<script>
import Resize from '@/components/Resize';

export default {
  components: {
    Resize,
  },
  props: {
    link: {
      type: String,
      default: '',
    },
  },
};
</script>

<style src="./Embed.scss" lang="scss" scoped></style>
