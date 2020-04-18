<template>
  <div class="growth -f-grid-main">
    <div class="cage">
      <div class="cage__cell -flex-column">
        <div v-for="cage in 3" :key="cage.id" class="cage__cell-unit">
          <p
            v-for="text in textCount.col"
            :key="text.id"
            class="cage__cell-text"
          >
            parrot
          </p>
        </div>
      </div>
      <div class="cage__btm"></div>
    </div>
    <p class="text -hidden" ref="textHidden">parrot</p>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from "vue-property-decorator";
import { WindowSize as WindowSizeState } from "@/store/types/browser";
import { TimelineMax, Power4, gsap } from "gsap";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component
export default class Growth extends Vue {
  // data
  textValue = {
    width: this.windowSize.width,
    height: this.windowSize.height
  };
  timeline: TimelineMax = new TimelineMax({
    repeat: -1,
    yoyo: true,
    ease: Power4.easeInOut,
    onRepeat: this.updateRandomValues
  });

  // computed
  get windowSize(): WindowSizeState {
    return this.$store.getters["browser/windowSize"];
  }
  get textCount() {
    return {
      row: Math.floor(this.windowSize.height / 2 / this.textValue.height),
      col: Math.floor(
        Math.ceil(this.windowSize.width / this.textValue.width) * 1.5
      )
    };
  }

  // timeline
  updateRandomValues() {
    this.randomValue = gsap.utils.random(-5, 5, true);
  }
  moveTimeline(tl: TimelineMax) {
    const $growth = ".growth";
    const $cage = ".cage";
    const $cageCellText = `${$cage}__cell-text`;

    tl.to(
      $cageCellText,
      0.08,
      {
        y: "random(-8, 8)",
        x: "random(-5, 5)"
      },
      0
    );
  }

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
    this.timeline.restart().invalidate();
    this.timeline.clear();
    this.moveTimeline(this.timeline);
    this.timeline.restart();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/sections/GridSection.scss";

.growth {
  position: relative;
  height: 100%;
  font-size: 9vh;
}

.text.-hidden {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  writing-mode: vertical-rl;
}

// cage
$cage-btm-height: 15%;
$cage-top-height: calc(100% - #{$cage-btm-height});

.cage {
  width: 100vw;
  height: 100vh;
}
.cage__cell {
  width: 100%;
  max-height: $cage-top-height;
}
.cage__cell-unit {
  &:first-child {
    border-top: 8px solid black;
  }
  border-bottom: 8px solid black;
  width: 100%;
  flex-grow: 1;
  writing-mode: vertical-rl;
  padding: 0.5vh 0;
}
.cage__cell-text {
  text-align: right;
  line-height: 6vh;
}
.cage__btm {
  height: $cage-btm-height;
}
</style>
