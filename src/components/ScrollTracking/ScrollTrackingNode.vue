<template lang="pug">
  .scrollTrackingNode
    a.scrollTrackingNode__link(
      :href="'#'+block.slug"
      :class="{'scrollTrackingNode__link--active': block.slug === activeBlock }"
      @click="selected(block.slug)")
      | {{block.title}}

    ScrollTrackingNode(
      v-if="block.children"
      v-for="(node, key) in block.children"
      :key="key"
      :block="node"
      :activeBlock="activeBlock")
</template>

<script>
import EventBus from '../EventBus';

export default {
  name: 'ScrollTrackingNode',
  props: {
    block: {
      type: Object,
      required: true,
    },
    activeBlock: {
      type: String,
      required: true,
    },
  },
  methods: {
    selected(hash) {
      EventBus.$emit('selectHash', hash);
    },
  },
};
</script>

<style src="./ScrollTrackingNode.scss" lang="scss" scoped></style>
