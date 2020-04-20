<template>
  <div class="entry -full-height -full-width -f-main">
    <div class="entry__intro -full-height -flex-column">
      <div class="entry__intro-top">
        <p class="entry__intro-text">The journey of :</p>
      </div>
      <div class="entry__intro-main hero -flex-column-between">
        <p class="hero__text -top -flex-between hero__line -horizontal">
          <span class="hero__text-span -front hero__text-keyword "
            >CHICKEN</span
          >
          <span class="hero__text-span -back">being objectified as</span>
        </p>
        <p class="hero__text -btm hero__line -vertical -flex">
          <span class="hero__text-span -btm hero__text-keyword ">FOOD</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

const sectionTitles = {
  chicken: [
    "Artificial Insemination",
    "Selection",
    "Growth and Transportation",
    "Slaughter"
  ],
  parrot: ["Capture", "Stacking", "Pricing"],
  sparrow: []
};

@Component({
  name: "EntryHero"
})
export default class EntryHero extends Vue {
  @Prop() readonly contentType!: "chicken" | "sparrow" | "parrot";
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";
@import "@/assets/styles/_layouts.scss";
@import "@/assets/styles/sections/GridSection.scss";

.entry {
  padding: 64px $offset-v 40px $offset-v;
  color: white;
}

.entry__intro-top {
  margin: 0 0 32px 8px;
}
.entry__intro-text {
  font-size: 1.5vw;
}

.hero {
  flex-grow: 1;
}
.hero__text {
  font-size: 4.5vw;
  line-height: 5.5vw;
}
.hero__text.-top {
  & .hero__text-keyword {
    display: inline-block;
  }
}
.hero__text.-btm {
  text-align: right;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: flex-end;
}

.hero__text-span {
  position: relative;
  z-index: 5;
  background-color: black;

  &.-front {
    padding-right: 1.5vw;
  }
  &.-back {
    padding-left: 1.5vw;
  }
  &.-btm {
    padding-top: 1vw;
  }
}

.hero__line {
  position: relative;

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    background-color: white;
  }
  &.-horizontal:after {
    top: calc(50% - 2px / 2);
    left: 0;
    width: 100%;
    height: 2px;
  }
  &.-vertical:after {
    right: 2vw;
    top: 0;
    height: 100%;
    width: 2px;
  }
}
</style>
