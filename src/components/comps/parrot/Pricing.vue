<template>
  <div class="pricing">
    <div v-for="g in 3" :key="'group' + g" :class="['group -flex']">
      <div v-for="n in 8" :key="'set-' + n" class="set -f-grid-condensed">
        <div class="set__box -flex-center-all">
          <p class="set__box-text">
            PARROT
          </p>
        </div>
        <div class="set__sub -flex-center-all">
          <div class="set__sub-container">
            <p class="set__sub-text">${{ getRandomInt(1, 250) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WindowSize as WindowSizeState } from "@/store/types/browser";
import { TimelineMax, Power4 } from "gsap";

@Component
export default class Pricing extends Vue {
  // data
  timeline: TimelineMax = new TimelineMax({
    repeat: -1,
    ease: Power4.easeInOut,
    onRepeat: this.updateRandomValues
  });

  // computed
  get windowSize(): WindowSizeState {
    return this.$store.getters["browser/windowSize"];
  }
  get textCount() {
    return {
      row: Math.floor(this.windowSize.height / this.textValue.height),
      col: Math.floor(
        Math.ceil(this.windowSize.width / this.textValue.width) * 2
      )
    };
  }

  // timeline
  moveTimeline(tl: TimelineMax) {
    const $Pricing = ".pricing";
  }

  // methods
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // life cycle
  updated() {
    // gsap
    /*
    // we need to restart the timeline,
    // bringing it back to step 0 before invalidating/clearing it,
    // preventing timeline keeps the state before updated.
    */
    this.timeline.restart().invalidate();
    this.timeline.clear();
    this.moveTimeline(this.timeline);
    this.timeline.restart();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/sections/GridSection.scss";

$cell-border-size-v: 8px;
$cell-border-size-h: 6px;

.pricing {
  position: relative;
  width: 100%;
  height: 100%;
}

.group {
  height: calc(100% / 3);
}

.set {
  position: relative;
  height: 100%;
  flex-grow: 1;

  &:after {
    content: "";
    position: absolute;
    left: calc(5%);
    top: $cell-border-size-h;
    width: calc(90% - #{$cell-border-size-v});
    height: calc(100% - #{$cell-border-size-h});
    background: repeating-linear-gradient(
      to right,
      black 0 1%,
      transparent 1% 9%,
      black 9% 10%
    );

    .group:last-child & {
      height: calc(100% - #{$cell-border-size-h} * 2);
    }
  }
}

.set__box {
  height: 100%;
  border-top: $cell-border-size-h solid black;
  border-right: $cell-border-size-v solid black;

  .group:last-child & {
    border-bottom: $cell-border-size-h solid black;
  }
}
.set__box-text {
  font-size: 9vh;
  writing-mode: vertical-rl;
}

.set__sub {
  position: relative;
  z-index: 1;
  font-size: $f-size-sub;
  position: absolute;
  bottom: 6%;
  left: 0;
  height: 25%;
  width: calc(100% - #{$cell-border-size-v});

  .group:last-child & {
    bottom: calc(6% + #{$cell-border-size-h} / 2);
  }
}
.set__sub-container {
  position: relative;
  font-family: $f-grid-condensed;
  color: white;
  padding: 20px 32px;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: black;
  }

  & .set__sub-text {
    position: relative;
    z-index: 1;
  }
}
</style>
