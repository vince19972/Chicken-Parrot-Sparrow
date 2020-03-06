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
import { TimelineMax, SteppedEase } from "gsap";

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
    const textCol = ".text-col";
    const text = `${textCol}__text`;

    const tl = new TimelineMax({ repeat: -1 });
    const $selection = ".selection";
    const $textCover = `${textCol}__cover`;
    const $textColUseless = `${textCol}.-is-useless`;
    const $text = text;
    const $textUseless = `${textCol}.-is-useless ${text}`;

    tl.staggerFromTo(
      $text,
      0.1,
      { opacity: 0, y: "-100%" },
      { opacity: 1, y: "0" },
      0.01,
      "hatched"
    )
      .to($selection, 0.5, { backgroundColor: "black" }, "hatched+=1")
      .addLabel("filtering", "+=0")
      .to($selection, 0.5, { backgroundColor: "white" }, "filtering+=0.5")
      .addLabel("filtered", "+=0")
      .staggerTo($textUseless, 0.1, { color: "red" }, 0.01, "filtered-=0.5")
      .staggerTo(
        $textCover,
        0.1,
        { width: "100%", ease: SteppedEase.config(4) },
        0.025,
        "filtered+=0.25"
      )
      .addLabel("eliminating", "+=0")
      .staggerTo($textUseless, 0.1, { opacity: 0 }, 0, "eliminating+=0")
      .staggerTo($textCover, 0.1, { width: "0" }, 0.01, "eliminating+=1")
      .staggerTo($textUseless, 0.1, { width: "0" }, 0, "eliminating+=1")
      .staggerTo(
        $textColUseless,
        0.1,
        { marginRight: 0 },
        0.01,
        "eliminating+=1"
      );
    // .addLabel("eliminated", "+=0")
    // .staggerTo($text, 0.25, { y: "200%" }, 0.01, "eliminated+=0");

    console.log(tl);
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
</style>
