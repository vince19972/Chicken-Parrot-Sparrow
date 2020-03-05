<template>
  <div class="selection">
    <div class="text-group">
      <div class="text-row" v-for="r in textCount.row" :key="r + 'row'">
        <div class="text-col" v-for="c in textCount.col" :key="c + 'col'">
          <p :class="['text-col__text', { '-is-useless': !(c % 2) }]">
            {{ textType(c) }}
          </p>
        </div>
      </div>
    </div>
    <p class="text -hidden" ref="textHidden">CHICKEN</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WindowSize as WindowSizeState } from "@/store/types/browser";

@Component
export default class Selection extends Vue {
  // computed setters
  get windowSize(): WindowSizeState {
    return this.$store.getters["browser/windowSize"];
  }
  get textCount() {
    return {
      row: Math.ceil(this.windowSize.height / this.textValue.height),
      col: Math.ceil(this.windowSize.width / this.textValue.width) * 2
    };
  }

  // methods
  textType(index: number) {
    return index % 2 ? "CHICKEN" : "CHIcKEN";
  }

  // data
  textValue = {
    width: this.windowSize.width,
    height: this.windowSize.height
  };
  eggAnimationTime = 1;

  // life cycle
  mounted() {
    const text = this.$refs.textHidden as HTMLElement;
    this.textValue.width = text.offsetWidth;
    this.textValue.height = text.offsetHeight;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/ChickenGrid.scss";

.selection {
  font-size: $f-size-lead;
  display: flex;
  // background-color: black;
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

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-radius: 100%;
  }
}
.text-col__text {
  text-align: center;
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

.text-col:after,
.text-col__text,
.text-col__text.-is-useless {
  animation-duration: $egg-duration;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
.text-col:after {
  animation-name: scaleEgg, colorEgg;
}
.text-col__text {
  animation-name: showText;
}
.text-col__text.-is-useless {
  animation-name: eliminateText;
}
</style>
