<template lang="pug">
  .alarm(:class="alarm")
    .alarm__icon(v-if="tip") 😉
    .alarm__icon(v-if="note") 🤓
    .alarm__icon(v-if="warn") 😱
    slot
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'note',
    },
  },
  computed: {
    alarm() {
      return this.type !== 'note' && this.type !== 'tip' && this.type !== 'warn' ? 'note' : `alarm--${this.type}`;
    },
    note() {
      return this.type === 'note';
    },
    tip() {
      return this.type === 'tip';
    },
    warn() {
      return this.type === 'warn';
    },
  },
};
</script>

<style src="./Alarm.scss" lang="scss" scoped></style>
