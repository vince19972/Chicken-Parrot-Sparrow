<template>
  <div class="selection">
    <div class="text-group">
      <div class="text-row" v-for="r in textCount.row" :key="r + 'row'">
        <div
          :class="['text-col', { '-is-useless': isUseless(c) }]"
          ref="test"
          v-for="c in textCount.col"
          :key="c + 'col'"
        >
          <p :class="['text-col__text']">
            {{ textType(c) }}
          </p>
          <div v-if="isUseless(c)" class="text-col__cover"></div>
        </div>
      </div>
    </div>
    <p class="text -hidden" ref="textHidden">CHICKEN</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WindowSize as WindowSizeState } from "@/store/types/browser";
import { TimelineMax } from "gsap";

@Component
export default class Selection extends Vue {
  // computed setters
  get windowSize(): WindowSizeState {
    return this.$store.getters["browser/windowSize"];
  }
  get textCount() {
    return {
      row: Math.ceil(this.windowSize.height / this.textValue.height),
      col: Math.ceil(this.windowSize.width / this.textValue.width) * 3
    };
  }

  // methods
  isUseless(index: number) {
    return !(index % 2);
  }
  textType(index: number) {
    return this.isUseless(index) ? "chicken" : "chicKen";
  }

  // data
  textValue = {
    width: this.windowSize.width,
    height: this.windowSize.height
  };

  // life cycle
  mounted() {
    // text values
    const text = this.$refs.textHidden as HTMLElement;
    this.textValue.width = text.offsetWidth;
    this.textValue.height = text.offsetHeight;
  }
  updated() {
    // gsap
    const tl = new TimelineMax({ repeat: -1 });
    const $selection = ".selection";
    const $textCover = ".text-col__cover";
    const $textColUseless = ".text-col.-is-useless";
    const $text = ".text-col__text";
    const $textUseless = ".text-col.-is-useless .text-col__text";
    tl.staggerFromTo($text, 0.1, { opacity: 0 }, { opacity: 1 }, 0.01, "-=0.5")
      .staggerTo($text, 1, { fontWeight: "normal" }, 0.01, "hatched")
      .to($selection, 0.5, { backgroundColor: "black" }, "hatched+=0.5")
      .to($selection, 0.5, { backgroundColor: "white" }, "hatched+=1")
      .addLabel("filter", "-=0.5")
      .staggerTo($textUseless, 0.1, { color: "red" }, 0.01, "filter")
      .staggerTo($textCover, 0.1, { width: "100%" }, 0.01, "filter+=0.5")
      .staggerTo($textUseless, 0.1, { opacity: 0 }, 0, "filter+=0.5")
      .staggerTo($textCover, 0.1, { width: "0" }, 0.01, "filter+=1")
      .staggerTo($textUseless, 0.25, { width: "0" }, 0, "filter+=1")
      .staggerTo($textColUseless, 0.1, { marginRight: 0 }, 0.01, "filter+=0.5");
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/ChickenGrid.scss";

.selection {
  height: 100%;
  font-size: calc(#{$f-size-lead} * 2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-row {
  display: flex;

  &:nth-child(1n) {
    transform: translate3d(-10vw, 0, 0);
  }
  &:nth-child(2n) {
    transform: translate3d(-20vw, 0, 0);
  }
}

.text.-hidden {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.text-col {
  position: relative;
  margin-right: calc(#{$v-gutter} / 2);
}
.text-col__text {
  text-align: center;
  font-weight: lighter;
}
.text-col__cover {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: red;

  // animation
  width: 0;
}

/*
** animation
*/

$egg-duration: 5s;

@keyframes scaleEgg {
  0%,
  10% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1, 5, 1);
  }
  31%,
  100% {
    transform: scale3d(1, 1, 1);
  }
}
@keyframes colorEgg {
  0%,
  28% {
    background-color: black;
  }
  28.5% {
    background-color: white;
  }
  29%,
  98% {
    background-color: transparent;
  }
}
@keyframes showText {
  0%,
  28%,
  89.1%,
  100% {
    opacity: 0;
  }
  29%,
  89% {
    opacity: 1;
  }
}
@keyframes eliminateText {
  0%,
  28%,
  89.1%,
  100% {
    opacity: 0;
    color: black;
    // transform: scale3d(1, 1, 1);
    letter-spacing: normal;
    width: inherit;
  }
  29% {
    opacity: 1;
    // transform: scale3d(1, 1, 1);
    letter-spacing: normal;
    width: inherit;
  }
  60% {
    opacity: 1;
    color: red;
    // transform: scale3d(1, 1, 1);
    letter-spacing: normal;
    width: inherit;
  }
  65% {
    opacity: 1;
    // transform: scale3d(1, 0, 1);
    letter-spacing: -0.5em;
    width: 0px;
    // margin-right: calc(#{$v-gutter} * -2);
  }
  80%,
  89% {
    opacity: 0;
    color: red;
    // transform: scale3d(1, 0, 1);
    letter-spacing: -0.5em;
    width: 0px;
    // margin-right: calc(#{$v-gutter} * -2);
  }
}

.text-col__egg,
.text-col__text,
.text-col.-is-useless .text-col__text {
  animation-duration: $egg-duration;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
.text-col__egg {
  // animation-name: scaleEgg, colorEgg;
}
.text-col__text {
  // animation-name: showText;
}
.text-col.-is-useless .text-col__text {
  // animation-name: eliminateText;
}
</style>
