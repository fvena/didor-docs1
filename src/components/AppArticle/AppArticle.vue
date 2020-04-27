<template lang="pug">
  .article
    v-runtime-template(:template="content" v-if="content")
    div(v-else)
      h1 No se ha encontrado el archivo
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template';

export default {
  components: {
    VRuntimeTemplate,
  },
  props: {
    data: {
      type: String,
      required: true,
    },
  },

  computed: {
    content() {
      return `<div>${this.data}</div>`;
    },
  },
};
</script>

<style src="./AppArticle.scss" lang="scss"></style>
