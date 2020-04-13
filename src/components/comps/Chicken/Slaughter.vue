<template>
  <div class="slaughter">
    <div v-for="g in 2" :key="'group' + g" :class="['group', carouselSet(g)]">
      <div v-for="n in 13" :key="'set-' + n" class="set">
        <div class="set-hang"></div>
        <p class="set-text -f-grid-condensed" ref="textLead">
          C<span class="text-body">HICKEN</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TimelineMax, Linear, Elastic } from "gsap";

@Component
export default class Slaughter extends Vue {
  // methods
  carouselSet(index: number) {
    if (index === 1) return "-one";
    else if (index === 2) return "-two";
    else return "-three";
  }

  moveTimeline(tl: TimelineMax) {
    const parent = ".slaughter";
    const group = ".group";
    const $group = `${parent} ${group}`;
    const $groupOne = `${$group}.-one`;
    const $groupTwo = `${$group}.-two`;
    const $textBody = `${parent} .text-body`;

    tl.staggerFromTo(
      $groupOne,
      10,
      { x: 0, ease: Linear.easeNone },
      { x: "-100%", ease: Linear.easeNone },
      0
    )
      .staggerFromTo(
        $groupTwo,
        10,
        { x: 0, ease: Linear.easeNone },
        { x: "-100%", ease: Linear.easeNone },
        0,
        "-=10"
      )
      .staggerTo(
        $textBody,
        1,
        { rotation: -15, transformOrigin: "top right", ease: Elastic.easeOut },
        0.38,
        "-=10"
      )
      .staggerTo($textBody, 1, { color: "red" }, 0.4, "-=10");
  }

  // data
  timeline: TimelineMax = new TimelineMax({ repeat: -1 });

  // life cycle
  mounted() {
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
@import "@/assets/styles/components/ChickenGrid.scss";

.slaughter {
  width: 100%;
  height: 100%;
  display: flex;
}

.group {
  display: flex;
}

.set {
  display: flex;
  align-items: center;
  justify-content: space-between;
  writing-mode: vertical-rl;
}

.set-hang {
  position: relative;
  background-color: black;
  height: 100%;
  width: calc(#{$gutter});
}

.set-text {
  font-size: $f-size-lead;
  line-height: $f-size-lead;
  display: flex;

  & .text-body {
    display: inline-block;
  }
}
</style>
