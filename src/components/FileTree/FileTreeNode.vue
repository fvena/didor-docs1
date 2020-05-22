<template lang="pug">
  .fileTreeNode
    .fileTreeNode__row(@click="toggleOpenFolder")
      //- Icono Abrir/Cerrar carpeta
      .fileTreeNode__showFolder(v-if="node.type==='folder'")
        svg(v-if="openFolder" viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision" style="color: currentcolor;")
          rect(x="3" y="3" width="18" height="18" rx="2" ry="2")
          path(d="M8 12h8")

        svg(v-else viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision" style="color: currentcolor;")
          rect(x="3" y="3" width="18" height="18" rx="2" ry="2")
          path(d="M12 8v8")
          path(d="M8 12h8")

      //- Icono Carpeta
      svg.fileTreeNode__icon(v-if="node.type==='folder'")(viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision" style="color: currentcolor;")
        path(d="M2.707 7.454V5.62C2.707 4.725 3.469 4 4.409 4h4.843c.451 0 .884.17 1.204.474l.49.467c.126.12.296.186.473.186h8.399c.94 0 1.55.695 1.55 1.59v.737m-18.661 0h-.354a.344.344 0 00-.353.35l.508 11.587c.015.34.31.609.668.609h17.283c.358 0 .652-.269.667-.61L22 7.805a.344.344 0 00-.353-.35h-.278m-18.662 0h18.662")

      //- Icono Archivo
      svg.fileTreeNode__icon(v-else)(viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision" style="color: currentcolor;")
        path(d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z")
        path(d="M13 2v7h7")

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
      openFolder: this.open,
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
