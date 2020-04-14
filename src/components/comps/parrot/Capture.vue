<template>
  <div class="capture -f-grid-main">
    <div class="text-row -flex" v-for="r in textCount.row" :key="r + 'row'">
      <div :class="['text-col']" v-for="c in textCount.col" :key="c + 'col'">
        <p class="texts__text">parrot</p>
      </div>
    </div>
    <p class="text -hidden" ref="textHidden">parrot</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WindowSize as WindowSizeState } from "@/store/types/browser";
// import { TimelineMax, SteppedEase, Back } from "gsap";

@Component
export default class Capture extends Vue {
  // data
  textValue = {
    width: this.windowSize.width,
    height: this.windowSize.height
  };
  // timeline: TimelineMax = new TimelineMax({ repeat: -1 });

  // computed
  get windowSize(): WindowSizeState {
    return this.$store.getters["browser/windowSize"];
  }
  get textCount() {
    return {
      row: Math.ceil(this.windowSize.height / this.textValue.height),
      col: Math.ceil(this.windowSize.width / this.textValue.width) * 4
    };
  }

  // methods
  // moveTimeline(tl: TimelineMax) {
  //   const capture = ".capture";
  // }

  // life cycle
  mounted() {
    // text values
    const text = this.$refs.textHidden as HTMLElement;
    this.textValue.width = text.offsetWidth;
    this.textValue.height = text.offsetHeight;
  }
  updated() {
    // gsap
    /*
    // we need to restart the timeline,
    // bringing it back to step 0 before invalidating/clearing it,
    // preventing timeline keeps the state before updated.
    */
    // this.timeline.restart().invalidate();
    // this.timeline.clear();
    // this.moveTimeline(this.timeline);
    // this.timeline.restart();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/sections/GridSection.scss";

.text.-hidden {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>
