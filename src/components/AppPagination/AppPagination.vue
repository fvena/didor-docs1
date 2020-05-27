<template lang="pug">
  .appPagination(:class="{'appPagination--noPrev': !prevArticle, 'appPagination--noNext': !nextArticle}")
    //- Prev link
    router-link.appPagination__item.appPagination__item--previous(:to="prevArticle.link" v-if="prevArticle")
      .appPagination__label
        svg.icon(width="10" height="16" viewBox="0 0 10 16")
          polyline(fill="none" vector-effect="non-scaling-stroke" points="8,2 2,8 8,14")
        span Anterior
      .appPagination__title {{ prevArticle.title }}

    //- Next link
    router-link.appPagination__item.appPagination__item--next(:to="nextArticle.link" v-if="nextArticle")
      .appPagination__label
        span Siguiente
        svg(width="10" height="16" viewBox="0 0 10 16")
          polyline(fill="none" vector-effect="non-scaling-stroke" points="2,2 8,8 2,14")
      .appPagination__title {{ nextArticle.title }}
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

<style src="./AppPagination.scss" lang="scss" scoped></style>
