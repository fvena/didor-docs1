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
      // const regex = /(.*)\((.*)\)|(.*)/;
      const regex = /(.*)\((.*)\)\[(.*)\]|(.*)\((.*)\)|(.*)\[(.*)\]|(.*)/;

      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];

        let type = item.querySelector('ul') ? 'folder' : 'file';
        let name = '';
        let description = '';
        let select = false;
        let open = false;

        const content = item.childNodes[0].nodeValue.match(regex);

        if (content[1]) name = content[1].trim();
        if (content[4]) name = content[4].trim();
        if (content[6]) name = content[6].trim();
        if (content[8]) name = content[8].trim();

        if (content[2]) description = content[2].trim();
        if (content[5]) description = content[5].trim();

        if (content[3] && content[3].includes('folder')) type = 'folder';
        if (content[7] && content[7].includes('folder')) type = 'folder';
        if (content[3] && content[3].includes('select')) select = true;
        if (content[7] && content[7].includes('select')) select = true;
        if (content[3] && content[3].includes('open')) open = true;
        if (content[7] && content[7].includes('open')) open = true;

        const node = {
          type,
          name,
          description,
          select,
          open,
        };

        if (item.querySelector('ul')) {
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
