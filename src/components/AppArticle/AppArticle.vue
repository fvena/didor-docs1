<template lang="pug">
  .article
    v-runtime-template(:template="content" v-if="content")
    div(v-else)
      h1 No se ha encontrado el archivo
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template';
import AppCode from '@/components/AppCode';
import AppDemo from '@/components/AppDemo';
import LastModified from '@/components/LastModified';

export default {
  components: {
    VRuntimeTemplate,
    AppCode,
    AppDemo,
    LastModified,
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
