<template lang="pug">
  .dropdown(:class="{'dropdown--open': isActive, 'dropdown--float': float}" v-click-outside:isActive="close")
    .dropdown__header(@click.stop.prevent="toggle")
      a(
        aria-haspopup="true"
        aria-controls="{ 'dropdown-menu'}") {{ title }}
      svg.dropdown__icon(width="13" height="8")
        polyline(points="2,6 6,2 10,6")

    transition(
      name="dropdown"
      @before-enter="start"
      @enter="end"
      @before-leave="end"
      @leave="start")
      .dropdown__body(v-if="isActive")
        .dropdown__content(role="menu")
          a.dropdown__item(
            v-for="(item, key) in options"
            :key="key"
            @click="change(item.value)")
            | {{ item.title }}

</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    float: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    toggle() {
      this.isActive = !this.isActive;

      if (this.isActive) this.$emit('isOpen');
      else this.$emit('isClose');
    },

    change(value) {
      this.$emit('change', value);
      this.close();
    },

    close() {
      this.isActive = false;
      this.$emit('isClose');
    },

    start(el) {
      el.style.height = '0';
    },

    end(el) {
      if (this.float) {
        el.style.position = 'relative';
        el.style.height = `${el.scrollHeight}px`;
        el.style.position = 'absolute';
      } else {
        el.style.height = `${el.scrollHeight}px`;
      }
    },
  },
};
</script>

<style lang="scss">
.dropdown {
  position: relative;

  &__header {
    position: relative;
    padding-right: simple();
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    a {
      color: color(gray1);

      @include hover {
        text-decoration: none;
      }
    }
  }

  &__icon {
    position: absolute;
    top: 0.6em;
    right: quarter();
    fill: none;
    stroke: color(gray1);
    stroke-linecap: round;
    stroke-width: 2;
    transition: all 0.4s ease-in-out;
    transform: rotate(90deg);
  }

  &__body {
    @include shadow(3);

    top: 150%;
    width: 100%;
    min-width: 8rem;
    overflow: hidden;
    background-color: color(white);
    border-radius: $border-radius;
    transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
  }

  &__content {
    width: 100%;
    padding: quarter() half();
  }

  &__item {
    display: block;
    overflow: hidden;
    color: color(gray1);
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    @include hover {
      text-decoration: none;
    }
  }

  &--open {
    .dropdown__icon {
      transform: rotate(180deg);
    }
  }

  &--float {
    .dropdown__content {
      position: absolute;
      left: 0;
    }
  }
}
</style>
