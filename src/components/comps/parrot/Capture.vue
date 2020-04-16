<template>
  <div class="capture -f-grid-main">
    <div class="capture__container">
      <div class="texts -flex-column-between">
        <div
          class="text-row -flex"
          v-for="(r, rIndex) in textCount.row"
          :key="r + 'row'"
          ref="row"
        >
          <div
            :class="['text-col', setTextClasses(rIndex, cIndex)]"
            v-for="(c, cIndex) in textCount.col"
            :key="c + 'col'"
          >
            <p class="texts__text">parrot</p>
          </div>
        </div>
      </div>
      <div class="net">
        <div class="net__grid">
          <div v-for="l in 2" :key="l.id" class="net__grid-lines -flex-between">
            <svg
              v-for="n in 50"
              :key="n.id"
              :class="['net__svg -col']"
              height="100%"
              width="100%"
            >
              <line x1="0" y1="0" x2="0" y2="0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <p class="text -hidden" ref="textHidden">parrot</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WindowSize as WindowSizeState } from "@/store/types/browser";
import { TimelineMax, Power4 } from "gsap";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component
export default class Capture extends Vue {
  // data
  textValue = {
    width: this.windowSize.width,
    height: this.windowSize.height
  };
  hiddenTextIndices = [];
  timeline: TimelineMax = new TimelineMax({ repeat: -1 });

  // computed
  get windowSize(): WindowSizeState {
    return this.$store.getters["browser/windowSize"];
  }
  get textCount() {
    return {
      row: Math.floor(this.windowSize.height / 2 / this.textValue.height),
      col: Math.ceil(this.windowSize.width / this.textValue.width) * 3
    };
  }

  // timeline
  moveTimeline(tl: TimelineMax) {
    const $capture = ".capture";
    const $net = ".net";
    const $texts = ".texts";
    const $textsP = `${$texts}__text`;
    const $textCol = ".text-col";
    const $textColHiddens = `${$textCol}.-is-hidden`;
    const $captureContainer = `${$capture}__container`;
    const $gridLines = `${$net}__grid-lines line`;

    tl.fromTo($texts, 0.5, { opacity: 0 }, { opacity: 1, ease: Power4.easeIn })
      .staggerTo($gridLines, 1, {
        attr: { y2: "100%" },
        ease: Power4.easeInOut
      })
      .to($captureContainer, 1.5, {
        css: {
          overflow: "hidden",
          transform: "scale(0.5, 0.425)",
          border: "1px solid black",
          padding: "24px"
        },
        ease: Power4.easeOut
      })
      .to($texts, 0, { css: { alignItems: "center" } }, "-=1.5")
      .to($textsP, 0, { letterSpacing: "-0.3rem" }, "-=1.5")
      .staggerTo(
        $textColHiddens,
        1,
        { css: { width: 0, padding: 0 }, ease: Power4.easeOut },
        0,
        "-=1.5"
      )
      .to($captureContainer, 0.6, { y: "100vh", ease: Power4.easeIn }, "-=0.5");
  }

  // methods
  setHiddenIndices() {
    const textRowCount = this.textCount.row;
    const textColCount = this.textCount.col;
    const hiddenCount = textColCount;

    for (let r = 0; r < textRowCount; r++) {
      const textIndices = [];

      for (let i = 0; i < hiddenCount / 2; i++) {
        let randomNumber = getRandomInt(0, hiddenCount);

        if (textIndices.includes(randomNumber)) {
          randomNumber = getRandomInt(0, hiddenCount);
        }

        textIndices.push(randomNumber);
      }

      this.hiddenTextIndices.push(textIndices);
    }
  }
  setTextClasses(rowIndex: numer, colIndex: number) {
    if (this.hiddenTextIndices[rowIndex].includes(colIndex))
      return "-is-hidden";
    else return "";
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
    this.moveTimeline(this.timeline);
    this.timeline.restart();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/sections/GridSection.scss";

.capture {
  position: relative;
  height: 100%;
  font-size: 2vw;
}

.texts {
  height: 100vh;
}
.text-col {
  padding: 0 0.5vw;

  &.-is-hidden {
    opacity: 0;
    pointer-events: none;
  }
}

.text.-hidden {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

$net-ball-size: 2vw;

.net {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.net {
  // width: 2px;
  // height: $net-ball-size;
  // background-color: black;
  transform-origin: center;
  margin: 0 auto;
}
.net__grid {
  width: 100%;
  height: 100%;
  position: relative;
}

$line-size: 4px;

.net__grid-lines {
  position: absolute;
  top: 0;
  left: -25%;
  height: 100%;
  width: 150%;

  &:first-child {
    transform: skewX(45deg);
  }
  &:last-child {
    transform: skewX(-45deg);
  }

  // opacity: 0;
}
.net__svg {
  &.-row {
    height: $line-size;
  }
  &.-col {
    width: $line-size;
  }
  line {
    stroke: black;
    stroke-width: $line-size;
  }
}
</style>
