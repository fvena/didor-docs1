<template lang="pug">
.appSocialLinks
  a.appSocialLinks__item(
    v-for="(link, name) in social"
    v-if="link"
    :key="name"
    :href="link"
    target="_blank"
  )
    dd-icon(:name="name" scale="0.7")
</template>

<script>
export default {
  data() {
    return {
      social: {},
    };
  },

  created() {
    this.social = window.$didor.social;
  },
};
</script>

<style src="./AppSocialLinks.scss" lang="scss" scoped></style>
