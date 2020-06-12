<template lang="pug">
  nav.scrollTracking
    .scrollTracking__block(v-for="(block, key) in treeBlock" :key="key")
      a.scrollTracking__title(
        :href="'#'+block.slug"
        :class="{'scrollTracking__title--active': block.slug === activeBlock }")
        | {{block.title}}

      ScrollTrackingNode(
      v-if="block.children"
      v-for="(node, key) in block.children"
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
        const viewport = document.getElementById('main');
        const element = document.getElementById(block.slug);

        if (!element) return false;

        const topElement = element.offsetTop;
        const viewportBottom = viewport.scrollTop + (viewport.offsetHeight * (100 - this.percentVisible)) / 100;

        return topElement < viewportBottom;
      });

      if (!visible) return;

      this.activeBlock = visible.slug;
    },

    getTree(list) {
      const levels = [{}];
      list.forEach(item => {
        levels.length = item.level;
        levels[item.level - 1].children = levels[item.level - 1].children || [];
        levels[item.level - 1].children.push(item);
        levels[item.level] = item;
      });
      return levels[0].children;
    },
  },
  created() {
    document.getElementById('main').addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.activeBlock = this.blocks[0].slug;
    this.reverseBlock = this.blocks.slice().reverse();
    this.treeBlock = this.getTree(this.blocks);

    EventBus.$on('selectHash', hash => {
      this.isEventChange = true;
      this.activeBlock = hash;
    });
  },
  destroyed() {
    document.getElementById('main').removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style src="./ScrollTracking.scss" lang="scss" scoped></style>
