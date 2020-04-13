<template lang="pug">
  .didor-logo(:class="{'didor-logo--animate': animate, 'didor-logo--horizontal': horizontal}")
    svg.didor-logo__liquid(viewBox="157 0 190 190")
      defs
        path#path-1(d="M-149,44 C-117.465909,44 -88.0340909,24 -56.5,24 C-24.9659091,24 4.46590909,44 36,44 C67.5340909,44 96.9659091,24 128.5,24 C160.034091,24 189.465909,44 221,44 L221,192 L-149,192 L-149,44 Z")
        filter#filter-2(x="-3.8%" y="-10.7%" width="107.6%" height="116.7%" filterUnits="objectBoundingBox")
          feOffset(dx="0" dy="-4" in="SourceAlpha" result="shadowOffsetOuter1")
          feGaussianBlur(stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1")
          feColorMatrix(values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.08 0" type="matrix" in="shadowBlurOuter1")
        filter#filter-3(x="-4.2%" y="-11.6%" width="108.4%" height="118.5%" filterUnits="objectBoundingBox")
          feGaussianBlur(stdDeviation="5" in="SourceAlpha" result="shadowBlurInner1")
          feOffset(dx="0" dy="5" in="shadowBlurInner1" result="shadowOffsetInner1")
          feComposite(in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1")
          feColorMatrix(values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.11 0" type="matrix" in="shadowInnerInner1")

        path#path-8(d="M-34,82 C1.02840909,82 33.7215909,60 68.75,60 C103.778409,60 136.471591,82 171.5,82 C206.528409,82 239.221591,60 274.25,60 C309.278409,60 341.971591,82 377,82 L377,192 L-34,192 L-34,82 Z")
        filter#filter-5(x="-3.4%" y="-13.6%" width="106.8%" height="121.2%" filterUnits="objectBoundingBox")
          feOffset(dx="0" dy="-4" in="SourceAlpha" result="shadowOffsetOuter1")
          feGaussianBlur(stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1")
          feColorMatrix(values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.08 0" type="matrix" in="shadowBlurOuter1")
        filter#filter-6(x="-3.8%" y="-14.8%" width="107.5%" height="123.5%" filterUnits="objectBoundingBox")
          feGaussianBlur(stdDeviation="5" in="SourceAlpha" result="shadowBlurInner1")
          feOffset(dx="0" dy="5" in="shadowBlurInner1" result="shadowOffsetInner1")
          feComposite(in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1")
          feColorMatrix(values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.11 0" type="matrix" in="shadowInnerInner1")

        path#path-7(d="M-56,109 C-20.9715909,109 11.7215909,87 46.75,87 C81.7784091,87 114.471591,109 149.5,109 C184.528409,109 217.221591,87 252.25,87 C287.278409,87 319.971591,109 355,109 L355,192 L-56,192 L-56,109 Z")
        filter#filter-8(x="-3.4%" y="-17.1%" width="106.8%" height="126.7%" filterUnits="objectBoundingBox")
          feOffset(dx="0" dy="-4" in="SourceAlpha" result="shadowOffsetOuter1")
          feGaussianBlur(stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1")
          feColorMatrix(values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.08 0" type="matrix" in="shadowBlurOuter1")
        filter#filter-9(x="-3.8%" y="-18.6%" width="107.5%" height="129.5%" filterUnits="objectBoundingBox")
          feGaussianBlur(stdDeviation="5" in="SourceAlpha" result="shadowBlurInner1")
          feOffset(dx="0" dy="5" in="shadowBlurInner1" result="shadowOffsetInner1")
          feComposite(in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1")
          feColorMatrix(values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.11 0" type="matrix" in="shadowInnerInner1")

        path#path-10(d="M-145,137 C-104.517045,137 -66.7329545,115 -26.25,115 C14.2329545,115 52.0170455,137 92.5,137 C132.982955,137 170.767045,115 211.25,115 C251.732955,115 289.517045,137 330,137 L330,192 L-145,192 L-145,137 Z")
        filter#filter-11(x="-2.9%" y="-23.4%" width="105.9%" height="136.4%" filterUnits="objectBoundingBox")
          feOffset(dx="0" dy="-4" in="SourceAlpha" result="shadowOffsetOuter1")
          feGaussianBlur(stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1")
          feColorMatrix(values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.08 0" type="matrix" in="shadowBlurOuter1")
        filter#filter-12(x="-3.3%" y="-25.3%" width="106.5%" height="140.3%" filterUnits="objectBoundingBox")
          feGaussianBlur(stdDeviation="5" in="SourceAlpha" result="shadowBlurInner1")
          feOffset(dx="0" dy="5" in="shadowBlurInner1" result="shadowOffsetInner1")
          feComposite(in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1")
          feColorMatrix(values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.11 0" type="matrix" in="shadowInnerInner1")

        path#path-13(d="M-93,167 C-59.25,167 -27.75,139 6,139 C39.75,139 71.25,167 105,167 C138.75,167 170.25,139 204,139 C237.75,139 269.25,167 303,167 L303,192 L-93,192 L-93,167 Z")
        filter#filter-14(x="-3.5%" y="-34.0%" width="107.1%" height="152.8%" filterUnits="objectBoundingBox")
          feOffset(dx="0" dy="-4" in="SourceAlpha" result="shadowOffsetOuter1")
          feGaussianBlur(stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1")
          feColorMatrix(values="0 0 0 0 0.48   0 0 0 0 0.0216541353   0 0 0 0 0  0 0 0 0.147536058 0" type="matrix" in="shadowBlurOuter1")
        filter#filter-15(x="-3.9%" y="-36.8%" width="107.8%" height="158.5%" filterUnits="objectBoundingBox")
          feGaussianBlur(stdDeviation="5" in="SourceAlpha" result="shadowBlurInner1")
          feOffset(dx="0" dy="5" in="shadowBlurInner1" result="shadowOffsetInner1")
          feComposite(in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1")
          feColorMatrix(values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.2 0" type="matrix" in="shadowInnerInner1")

        //- circle#path-16(cx="95" cy="95" r="95")
        //- filter#filter-18(x="-3.9%" y="-3.9%" width="107.9%" height="107.9%" filterUnits="objectBoundingBox")
        //-   feGaussianBlur(stdDeviation="4" in="SourceAlpha" result="shadowBlurInner1")
        //-   feOffset(dx="0" dy="-4" in="shadowBlurInner1" result="shadowOffsetInner1")
        //-   feComposite(in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1")
        //-   feColorMatrix(values="0 0 0 0 0.68   0 0 0 0 0.273658537   0 0 0 0 0  0 0 0 0.09 0" type="matrix" in="shadowInnerInner1" result="shadowMatrixInner1")
        //-   feGaussianBlur(stdDeviation="5" in="SourceAlpha" result="shadowBlurInner2")
        //-   feOffset(dx="0" dy="5" in="shadowBlurInner2" result="shadowOffsetInner2")
        //-   feComposite(in="shadowOffsetInner2" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner2")
        //-   feColorMatrix(values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.11 0" type="matrix" in="shadowInnerInner2" result="shadowMatrixInner2")
        //-   feMerge
        //-     feMergeNode(in="shadowMatrixInner1")
        //-     feMergeNode(in="shadowMatrixInner2")

      g#Page-1(stroke="none" stroke-width="1" fill="none" fill-rule="evenodd")
        g#Logo(transform="translate(157.000000, 0.000000)")
          circle#path-6(fill="#7D002E" cx="95" cy="95" r="95")
          g#path-5.liquid__path.liquid__path--1
            use(fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1")
            use(fill="#BD1642" fill-rule="evenodd" xlink:href="#path-1")
            use(fill="black" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-1")
          g#path-4.liquid__path.liquid__path--2
            use(fill="black" fill-opacity="1" filter="url(#filter-5)" xlink:href="#path-8")
            use(fill="#DD224D" fill-rule="evenodd" xlink:href="#path-8")
            use(fill="black" fill-opacity="1" filter="url(#filter-6)" xlink:href="#path-8")
          g#path-3.liquid__path.liquid__path--3
            use(fill="black" fill-opacity="1" filter="url(#filter-8)" xlink:href="#path-7")
            use(fill="#FB4E65" fill-rule="evenodd" xlink:href="#path-7")
            use(fill="black" fill-opacity="1" filter="url(#filter-9)" xlink:href="#path-7")
          g#path-2.liquid__path.liquid__path--4
            use(fill="black" fill-opacity="1" filter="url(#filter-11)" xlink:href="#path-10")
            use(fill="#FF807A" fill-rule="evenodd" xlink:href="#path-10")
            use(fill="black" fill-opacity="1" filter="url(#filter-12)" xlink:href="#path-10")
          g#path-1.liquid__path.liquid__path--5
            use(fill="black" fill-opacity="1" filter="url(#filter-14)" xlink:href="#path-13")
            use(fill="#FFCEAD" fill-rule="evenodd" xlink:href="#path-13")
            use(fill="black" fill-opacity="1" filter="url(#filter-15)" xlink:href="#path-13")
          //- mask#mask-17(fill="white")
          //-   use(xlink:href="#path-16")
          //- g#path-0(fill="black" fill-opacity="1")
          //-   use(filter="url(#filter-18)" xlink:href="#path-16")
</template>

<script>
export default {
  props: {
    initAnimation: {
      type: Boolean,
      default: true,
    },
    isAnimate: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      animate: this.isAnimate,
    };
  },

  created() {
    if (this.initAnimation && !this.animate) {
      this.animate = true;
      setTimeout(() => {
        this.animate = false;
      }, 6000);
    }
  },
};
</script>

<style lang="scss" scoped>
$logo-height: 1em;
$logo-text-height-vertical: 0.5em;
$logo-text-height-horizontal: 0.4em;
$logo-margin-vertical: 0.15em;
$logo-margin-horizontal: 0.23em;

$logo-color-black: color(gray1);
$logo-color-white: color(gray7);
$logo-color: darken($brand, 5);
$logo-color-dark: darken($brand, 15);
$logo-color-light: lighten($brand, 10);

.didor-logo {
  @include shadow(3);

  position: relative;
  width: 1em;
  height: 1em;
  overflow: hidden;
  font-size: 10rem;
  cursor: pointer;
  border-radius: 0.5em;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 1em;
    height: 1em;
    overflow: hidden;
    content: '';
    border-radius: 0.5em;
    box-shadow: inset 0 -0.05em 0.1em rgba(173, 70, 0, 0.15), inset 0 0.05em 0.1em rgba(0, 0, 0, 0.2);
  }

  @include hover {
    .liquid__path,
    .liquid__drop {
      animation-play-state: running;
    }
  }

  &--animate {
    .liquid__path,
    .liquid__drop {
      animation-play-state: running;
    }
  }
}

.didor-logo__liquid {
  display: block;
  height: $logo-height;
  margin: 0 auto $logo-margin-vertical;
}

// Code for liquid waves
.liquid__path {
  // Animation will be paused at first
  animation: 3s linear infinite paused;
  // animation: move-forever 12s linear infinite;

  &--1 {
    transform: translateX(-15%);
    animation-name: wave1;
    // animation-duration: 11s;
    animation-delay: -0.35s;
  }
  &--2 {
    transform: translateX(20%);
    animation-name: wave2;
    // animation-duration: 11s;
    animation-delay: -0.5s;
  }
  &--3 {
    transform: translateX(-85%);
    animation-name: wave3;
    // animation-duration: 12s;
    animation-delay: -2.3s;
  }
  &--4 {
    transform: translateX(50%);
    animation-name: wave4;
    // animation-duration: 13s;
    animation-delay: -1.2s;
  }
  &--5 {
    transform: translateX(-75%);
    animation-name: wave5;
    // animation-duration: 12s;
    animation-delay: -2.2s;
  }

  // First (top) wave
  &--top,
  &--top-clip {
    fill: $logo-color-light;
    transform: translateX(0);
    animation-name: liquid-top;
  }

  // Second (bottom) wave
  &--bottom,
  &--bottom-clip {
    fill: $logo-color;
    transform: translate(-50px, 1px);
    animation-name: liquid-bottom;
    // Little phase shift respect the top wave
    animation-duration: 2.1s;
    animation-delay: -0.9s;
  }

  &--bottom-clip {
    fill: $logo-color-dark;
  }
}

// Animation for the top wave
@keyframes wave1 {
  100% {
    transform: translateX(80%);
  }
}

// Animation for the bottom wave
@keyframes wave2 {
  100% {
    transform: translateX(-90%);
  }
}

// Animation for the bottom wave
@keyframes wave3 {
  100% {
    transform: translateX(25%);
  }
}

// Animation for the bottom wave
@keyframes wave4 {
  100% {
    transform: translateX(-75%);
  }
}

// Animation for the bottom wave
@keyframes wave5 {
  100% {
    transform: translateX(30%);
  }
}
</style>
