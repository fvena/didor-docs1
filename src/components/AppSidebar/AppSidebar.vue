<template lang="pug">
.sidebar
  .sidebar__wrapper
    //- Level 1
    nav.sidebar__list.sidebar__list--level1(v-if="links.length")
      li.sidebar__item(v-for="(level1, key1) in links" :key="key1")
        router-link(:to="level1.link" v-if="level1.link") {{ level1.title }}

        //- Level 2
        .sidebar__list.sidebar__list--level2(v-else)
          .sidebar__title {{ level1.title }}
          li.sidebar__item(v-for="(level2, key2) in level1.children" :key="key2")
            router-link(:to="level2.link" v-if="level2.link") {{ level2.title }}

            //- Level 3
            .sidebar__list.sidebar__list--level3(v-else)
              .sidebar__title {{ level2.title }}
              li.sidebar__item(v-for="(level3, key3) in level2.children" :key="key3")
                router-link(:to="level3.link") {{ level3.title }}
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style src="./AppSidebar.scss" lang="scss" scoped></style>
