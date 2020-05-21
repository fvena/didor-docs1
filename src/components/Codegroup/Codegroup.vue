<template lang="pug">
  .codegroup
    .codegroup__files
      .codegroup__file(
        v-for="(file, key) in files"
        :class="{'codegroup__file--select': key === index }"
        @click="showFile(key)")
        | {{ file }}
    slot
</template>

<script>
export default {
  data() {
    return {
      files: [],
      index: 0,
    };
  },
  methods: {
    /**
     * Obtengo todos los nombres de los archivos o idiomas
     */
    getFiles() {
      const codeBlocks = this.$el.querySelectorAll('.appCode');

      for (let index = 0; index < codeBlocks.length; index += 1) {
        const filename = codeBlocks[index].querySelector('.appCode__filename');
        if (filename) {
          this.files.push(filename.textContent);
        } else {
          this.files.push(codeBlocks[index].dataset.lang);
        }
      }
    },

    /**
     * Muestro el archivo seleccionado
     */
    showFile(position) {
      this.index = position;
      const codeBlocks = this.$el.querySelectorAll('.appCode');

      for (let index = 0; index < codeBlocks.length; index += 1) {
        codeBlocks[index].style.display = 'none';
      }

      codeBlocks[position].style.display = 'block';
    },
  },

  mounted() {
    this.getFiles();
    this.showFile(0);
  },
};
</script>

<style src="./Codegroup.scss" lang="scss" scoped></style>
