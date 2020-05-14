<template lang="pug">
  .article
    v-runtime-template(:template="content" v-if="content")
    div(v-else)
      h1 No se ha encontrado el archivo
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template';
import Alarm from '@/components/Alarm';
import Codegroup from '@/components/Codegroup';
import Collapse from '@/components/Collapse';
import Demo from '@/components/Demo';

export default {
  components: {
    VRuntimeTemplate,
    Alarm,
    Codegroup,
    Collapse,
    Demo,
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
