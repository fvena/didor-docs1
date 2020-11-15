<template lang="pug">
  .appThemeMode
    //- Icono light
    dd-icon.appThemeMode__icon(
      name="sun"
      scale="0.6"
      :class="{'appThemeMode__icon--select': mode === 'light'}")

    //- Switch
    .appThemeMode__switch(
      :class="{'appThemeMode__switch--on': mode === 'dark'}"
      @click="toggleMode")
      .appThemeMode__switch__node

    //- Icono dark
    dd-icon.appThemeMode__icon(
      name="moon"
      scale="0.6"
      :class="{'appThemeMode__icon--select': mode === 'dark'}")
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'light',
    },
  },

  methods: {
    /**
     * Alterna entre el modo 'light' y 'dark'
     */
    toggleMode() {
      const mode = this.mode === 'light' ? 'dark' : 'light';
      this.$emit('toggleMode', mode);
    },
  },
};
</script>

<style src="./AppThemeMode.scss" lang="scss" scoped></style>
