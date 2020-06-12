<template lang="pug">
  .fileTreeNode
    .fileTreeNode__row(@click="toggleOpenFolder" :class="{'fileTreeNode__row--folder': node.type==='folder' && node.children && node.children.length, 'fileTreeNode__row--select': node.select}")
      //- Icono Abrir/Cerrar carpeta
      .fileTreeNode__showFolder(v-if="node.type==='folder' && node.children && node.children.length")
        dd-icon.fileTreeNode__icon(name="minus-square" scale="0.45" v-if="openFolder")
        dd-icon.fileTreeNode__icon(name="plus-square" scale="0.45" v-else)

      //- Icono Carpeta
      dd-icon.fileTreeNode__icon(name="folder" scale="0.7" v-if="node.type==='folder'")

      //- Icono Archivo
      dd-icon.fileTreeNode__icon(name="file" scale="0.7" v-else)

      //- Título
      .fileTreeNode__title
        | {{ node.name }}

      //- Descripción
      .fileTreeNode__description(v-if="node.description") {{ node.description }}

    //- Hijos
    .fileTreeNode__children(v-if="node.children && node.children.length && openFolder")
      FileTreeNode(v-for="(child, key) in node.children" :node="child" :key="key" :open="open")
</template>

<script>
export default {
  name: 'FileTreeNode',
  data() {
    return {
      openFolder: this.open || this.node.open,
    };
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleOpenFolder() {
      this.openFolder = !this.openFolder;
    },
  },
};
</script>

<style src="./FileTreeNode.scss" lang="scss" scoped></style>
