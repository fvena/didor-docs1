<template lang="pug">
  .article
    ScrollTracking(:blocks="anchors" v-if="content && anchors && anchors.length > 1")

    v-runtime-template(:template="content" v-if="content")
    div(v-else)
      h1 No se ha encontrado el archivo
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template';
import AppCode from '@/components/AppCode';
import AppDemo from '@/components/AppDemo';
import LastModified from '@/components/LastModified';
import ScrollTracking from '@/components/ScrollTracking';

export default {
  components: {
    VRuntimeTemplate,
    AppCode,
    AppDemo,
    LastModified,
    ScrollTracking,
  },
  props: {
    data: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      anchors: null,
    };
  },

  computed: {
    content() {
      return `<div>${this.data}</div>`;
    },
  },

  mounted() {
    const anchors = [];
    // const titles = document.getElementsByTagName('h2');
    const links = document.getElementsByClassName('anchor-link');

    for (let index = 0; index < links.length; index += 1) {
      const header = links[index].parentNode;
      let level = null;

      switch (header.tagName.toLowerCase()) {
        case 'h1':
          level = 1;
          break;
        case 'h2':
          level = 2;
          break;
        case 'h3':
          level = 3;
          break;
        case 'h4':
          level = 4;
          break;
        case 'h5':
          level = 5;
          break;
        case 'h6':
          level = 6;
          break;
        default:
          level = null;
          break;
      }
      const anchor = {
        title: header.innerText,
        slug: header.id,
        level,
      };
      anchors.push(anchor);
    }

    this.anchors = anchors;
  },
};
</script>

<style src="./AppArticle.scss" lang="scss"></style>
