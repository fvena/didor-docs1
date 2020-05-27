<template lang="pug">
.search
  .search__icon
    dd-icon(name="search" scale="0.7")
  input.search__input(type="text" placeholder="Buscador")

</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.search {
  &__icon {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;

    svg {
      stroke: color(gray5);
    }
  }

  &__input {
    padding: 0 half();
    border: 0;

    &::placeholder {
      color: color(gray5);
    }
  }

  @include hover {
    input::placeholder {
      color: color(gray4);
    }

    svg {
      stroke: color(gray4);
    }
  }
}
</style>
