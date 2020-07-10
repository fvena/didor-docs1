<template lang="pug">
  nav.scrollTracking
    .scrollTracking__block(v-if="treeBlock")
      a.scrollTracking__title(
        :href="'#'+treeBlock.anchor"
        :class="{'scrollTracking__title--active': treeBlock.anchor === activeBlock }")
        | {{treeBlock.content}}

      ScrollTrackingNode(
        v-if="treeBlock.children"
        v-for="(node, key) in treeBlock.children"
        :key="key"
        :block="node"
        :activeBlock="activeBlock")
</template>

<script>
import ScrollTrackingNode from './ScrollTrackingNode.vue';
import EventBus from '../EventBus';

export default {
  name: 'ScrollTracking',
  components: {
    ScrollTrackingNode,
  },
  props: {
    blocks: {
      type: Array,
      default: () => [],
    },
    percentVisible: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      activeBlock: null,
      reverseBlock: this.blocks,
      treeBlock: [],
      isScrolling: null,
      isEventChange: false,
    };
  },
  methods: {
    handleScroll() {
      // Comprueba cuando ha terminado de hacer scroll
      window.clearTimeout(this.isScrolling);

      this.isScrolling = setTimeout(() => {
        if (this.isEventChange) this.isEventChange = false;
      }, 66);

      if (this.isEventChange) return;

      const visible = this.reverseBlock.find(block => {
        const element = document.getElementById(block.anchor);
        if (!element) return false;
        const topElement = element.offsetTop;
        const viewportBottom = window.scrollY + (window.innerHeight * (100 - this.percentVisible)) / 100;
        return topElement < viewportBottom;
      });

      if (!visible) return;

      this.activeBlock = visible.anchor;
    },

    getTree(list) {
      const levels = [{}];
      list.forEach(item => {
        levels.length = item.level;
        levels[item.level - 1].children = levels[item.level - 1].children || [];
        levels[item.level - 1].children.push(item);
        levels[item.level] = item;
      });

      return levels[1];
    },
  },

  created() {
    window.addEventListener('scroll', this.handleScroll);
  },

  mounted() {
    this.activeBlock = this.blocks[0].anchor;
    this.reverseBlock = this.blocks.slice().reverse();
    this.treeBlock = this.getTree(this.blocks);

    EventBus.$on('selectHash', hash => {
      this.isEventChange = true;
      this.activeBlock = hash;
    });
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style src="./ScrollTracking.scss" lang="scss" scoped></style>
