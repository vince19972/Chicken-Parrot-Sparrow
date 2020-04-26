<template>
  <div class="stack -f-grid-main">
    <div class="text-group">
      <div class="text-row" v-for="r in textCount.row" :key="r + 'row'">
        <div class="text-col" v-for="c in textCount.col" :key="c + 'col'">
          <p class="text-col__text">chicken</p>
          <div class="text-col__bar"></div>
        </div>
        <div class="text-row__bar"></div>
      </div>
    </div>
    <p class="text -hidden" ref="textHidden">chicken</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WindowSize as WindowSizeState } from "@/store/types/browser";
import { TimelineMax, Power4 } from "gsap";

@Component({
  name: "Stack",
})
export default class Stack extends Vue {
  // computed setters
  get windowSize(): WindowSizeState {
    return this.$store.getters["browser/windowSize"];
  }
  get textCount() {
    return {
      row: Math.ceil(this.windowSize.height / this.textValue.height),
      col: Math.ceil(this.windowSize.width / this.textValue.width) * 3,
    };
  }

  moveTimeline(tl: TimelineMax | any) {
    const parent = ".stack";
    const textCol = ".text-col";
    const textRow = ".text-row";
    const text = `${parent} ${textCol}__text`;
    const $text = text;
    const $textRow = `${parent} ${textRow}`;
    const $textRowBar = `${parent} ${textRow}__bar`;
    const $textCol = `${parent} ${textCol}`;
    const $textColBar = `${parent} ${textCol}__bar`;

    tl.staggerFromTo(
      $textRow,
      0.8,
      { x: "-100%" },
      { x: 0 },
      {
        amount: 0.5,
        from: "random",
        ease: Power4.easeIn,
      }
    )
      .staggerFromTo(
        $textRowBar,
        0.5,
        { width: 0 },
        { width: "100%" },
        0.01,
        "+=0.1"
      )
      .staggerTo($textColBar, 0, { height: "100%" }, 0.0025, "+=0.001")
      .staggerTo(
        $textCol,
        0.001,
        { css: { className: "+=text-col -is-active" } },
        0.0025,
        "-=0.6"
      )
      .addLabel("caged")
      .staggerTo(
        $text,
        0.1,
        {
          fontFamily: "HelveticaNeue-CondensedBlack",
          textTransform: "uppercase",
          fontSize: "200%",
        },
        0.015,
        "caged+=0.5"
      )
      .addLabel("grown")
      .staggerTo(
        $text,
        1,
        { letterSpacing: "-0.8rem", paddingRight: "0.8rem" },
        0,
        "grown+=0.01"
      )
      .staggerTo(
        $textRow,
        2,
        {
          x: "100%",
        },
        {
          amount: 0.5,
          from: "random",
        },
        "grown+=1"
      );
  }

  // data
  textValue = {
    width: this.windowSize.width,
    height: this.windowSize.height,
  };
  timeline: TimelineMax = new TimelineMax({ repeat: -1 });

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

.stack {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-row {
  display: flex;
  position: relative;

  &__bar {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: black;
  }
}

.text-col {
  position: relative;

  &__bar {
    content: "";
    position: absolute;
    top: 0;
    right: calc(#{$v-gutter} / -3);
    width: 6px;
    height: 0;
    background-color: black;
  }

  &.-is-active {
    margin-right: calc(#{$v-gutter} / 2);
  }
}

.text-col__text {
  font-weight: lighter;
}
</style>
