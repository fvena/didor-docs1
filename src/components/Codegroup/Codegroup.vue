<template lang="pug">
  .codegroup
    .codegroup__files
      .codegroup__file(
        v-for="(file, key) in files"
        :class="{'codegroup__file--select': key === index }"
        @click="showFile(key + 1)")
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
    showFile(index) {
      this.index = index - 1;
      const codeBlocks = this.$el.children;
      const array = [...codeBlocks];

      // eslint-disable-next-line
      array.forEach(codeBlock => {
        if (codeBlock.className === 'codegroup__files') return;
        codeBlock.style.display = 'none';
      });

      codeBlocks[index].style.display = 'block';
    },
    getFiles() {
      // eslint-disable-next-line
      return new Promise(resolve => {
        const codeBlocks = this.$el.children;
        const array = [...codeBlocks];

        // eslint-disable-next-line
        array.forEach(codeBlock => {
          const blocks = codeBlock.children;
          const arrayBlocks = [...blocks];

          // eslint-disable-next-line
          arrayBlocks.forEach(blocksChildren => {
            const blockChildren = blocksChildren.children;
            const arrayChildren = [...blockChildren];

            // eslint-disable-next-line
            arrayChildren.forEach(item => {
              if (item.className !== 'file') return;
              this.files.push(item.innerHTML);
            });
          });
        });

        resolve(true);
      });
    },
  },
  mounted() {
    setTimeout(async () => {
      await this.getFiles();
      this.showFile(1);
    }, 50);
  },
};
</script>

<style src="./Codegroup.scss" lang="scss" scoped></style>
