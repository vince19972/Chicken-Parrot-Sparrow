<template>
  <div class="growth -f-grid-main">
    <div class="cage">
      <div class="cage__cell -flex-column">
        <div
          v-for="(cage, rIndex) in textCount.row"
          :key="cage.id"
          class="cage__cell-unit"
        >
          <p
            v-for="(text, cIndex) in textCount.col"
            :key="text.id"
            :class="['cage__cell-text', setTextClasses(rIndex, cIndex)]"
            ref="text"
          >
            parrot
          </p>
        </div>
      </div>
    </div>
    <p class="text -hidden" ref="textHidden">parrot</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WindowSize as WindowSizeState } from "@/store/types/browser";
import { TimelineMax, Bounce, Power4, gsap } from "gsap";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array: any) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

@Component
export default class Growth extends Vue {
  // data
  hiddenTextIndices: any = [];
  textValue = {
    width: this.windowSize.width,
    height: this.windowSize.height,
  };
  timeline: TimelineMax = new TimelineMax({
    repeat: -1,
    yoyo: true,
    ease: Power4.easeInOut,
    onRepeat: this.updateRandomValues,
  });
  timelineSub: TimelineMax = new TimelineMax({
    repeat: -1,
    repeatDelay: 3,
    ease: Power4.easeIn,
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
      ),
    };
  }

  // timeline
  updateRandomValues() {
    return gsap.utils.random(-5, 5, true);
  }
  moveTimeline(tl: TimelineMax | any, tl2: TimelineMax | any) {
    const $growth = ".growth";
    const $cage = ".cage";
    const $cageCellText = `${$cage}__cell-text`;
    const $cageCellTextDead = shuffle(
      Array.from(document.querySelectorAll(".cage__cell-text.-is-dead"))
    );
    const deadTextSetLength = $cageCellTextDead.length / 3;
    const $textDeadFirstSet = $cageCellTextDead.slice(0, deadTextSetLength);
    const $textDeadSecondSet = $cageCellTextDead.slice(
      deadTextSetLength + 1,
      deadTextSetLength * 2
    );
    const $textDeadThirdSet = $cageCellTextDead.slice(
      deadTextSetLength * 2 + 1
    );

    tl.to(
      $cageCellText,
      0.1,
      {
        y: "random(-3, 3)",
        x: "random(-3, 3)",
      },
      0
    );

    function die(target: any, time: any) {
      tl2
        .to(
          target,
          3,
          {
            letterSpacing: "-1rem",
            scaleX: 0.8,
          },
          time
        )
        .to(target, 0.5, {
          rotate: 90,
          // fontWeight: "lighter"
          color: "red",
          ease: Bounce.easeOut,
        });
    }

    die($textDeadFirstSet, "+=0.25");
    die($textDeadSecondSet, "-=1");
    die($textDeadThirdSet, "-=1");
  }

  // methods
  setHiddenIndices() {
    const textRowCount = this.textCount.row;
    const textColCount = this.textCount.col;
    const hiddenCount = textColCount;

    for (let r = 0; r < textRowCount; r++) {
      const textIndices: any = [];

      for (let i = 0; i < hiddenCount; i++) {
        let randomNumber = getRandomInt(0, hiddenCount);

        if (textIndices.includes(randomNumber)) {
          randomNumber = getRandomInt(0, hiddenCount);
        }

        textIndices.push(randomNumber);
      }

      this.hiddenTextIndices.push(textIndices);
    }
  }
  setTextClasses(rowIndex: any, colIndex: number) {
    if (this.hiddenTextIndices[rowIndex]) {
      if (this.hiddenTextIndices[rowIndex].includes(colIndex))
        return "-is-dead";
      else return "";
    }
  }

  // life cycle
  mounted() {
    // text values
    const text = this.$refs.textHidden as HTMLElement;
    this.textValue.width = text.offsetWidth;
    this.textValue.height = text.offsetHeight;

    // get hidden text indices
    this.setHiddenIndices();
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
    this.moveTimeline(this.timeline, this.timelineSub);
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
$cage-btm-height: 0%;
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
  border-bottom: 8px solid black;
  width: 100%;
  flex-grow: 1;
  writing-mode: vertical-rl;
  padding: 0.5vh 0;
}
.cage__cell-text {
  text-align: right;
  line-height: 5.5vh;

  &.-is-dead {
    transform-origin: bottom right;
  }
}
</style>
