<template lang="pug">
  .fileTree
    .fileTree__content
      FileTreeNode(v-for="(child, key) in treeData" :node="child" :key="key" :open="open")

    .fileTree__data
      slot
</template>

<script>
import FileTreeNode from './FileTreeNode.vue';

export default {
  components: {
    FileTreeNode,
  },

  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      treeData: [],
    };
  },
  methods: {
    /**
     * Obtiene los datos de todos los nodos hijos
     */
    getChild(parent) {
      const jsonTree = [];
      const items = parent.children;
      const regex = /(.*)\((.*)\)|(.*)/;

      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];

        const type = item.querySelector('ul') ? 'folder' : 'file';
        const content = item.childNodes[0].nodeValue.match(regex);
        const name = content[1] ? content[1].trim() : content[3].trim();
        const description = content[2] ? content[2].trim() : '';

        const node = {
          type,
          name,
          description,
        };

        if (type === 'folder') {
          const children = this.getChild(item.querySelector('ul'));
          node.children = children;
        }

        jsonTree.push(node);
      }

      return jsonTree;
    },
  },

  mounted() {
    this.treeData = this.getChild(this.$el.querySelector('ul'));
  },
};
</script>

<style src="./FileTree.scss" lang="scss" scoped></style>
