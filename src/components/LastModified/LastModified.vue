<template lang="pug">
  .lastModified
    | {{ parseDate }}
</template>

<script>
import moment from 'moment';

export default {
  props: {
    date: {
      type: String,
      default: '',
    },
  },
  computed: {
    parseDate() {
      moment.locale('es');
      return moment(this.date).fromNow();
    },
  },
};
</script>

<style src="./LastModified.scss" lang="scss" scoped></style>
