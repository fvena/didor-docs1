<template lang="pug">
.search
  .search__icon
    dd-icon(name="search" scale="0.8")
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
      fill: color(gray5);
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
      fill: color(gray4);
    }
  }
}
</style>
