<template lang="pug">
  .footer
    //- Prev link
    .pagination-item.pagination-item--previous
      router-link(:to="prevArticle.link" v-if="prevArticle")
        .pagination-item-label
          svg.icon(width="10" height="16" viewBox="0 0 10 16")
            polyline(fill="none" vector-effect="non-scaling-stroke" points="8,2 2,8 8,14")
          span Anterior
        .pagination-item-title {{ prevArticle.title }}

    //- Next link
    .pagination-item.pagination-item--next
      router-link(:to="nextArticle.link" v-if="nextArticle")
        .pagination-item-label
          span Siguiente
          svg(width="10" height="16" viewBox="0 0 10 16")
            polyline(fill="none" vector-effect="non-scaling-stroke" points="2,2 8,8 2,14")
        .pagination-item-title {{ nextArticle.title }}
</template>

<script>
export default {
  props: {
    prevArticle: {
      type: Object,
      default: () => {},
    },
    nextArticle: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style src="./AppFooter.scss" lang="scss" scoped></style>
