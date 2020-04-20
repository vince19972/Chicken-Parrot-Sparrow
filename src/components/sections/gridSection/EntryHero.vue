<template>
  <div
    :class="[
      'entry -full-height -full-width -f-main -flex-column-between',
      getEntryClasses
    ]"
    ref="entry"
  >
    <div class="entry__intro">
      <p class="entry__intro-text">
        the journery of <br /><span class="-keyword">chicken</span> <br />
        being objectified as <br /><span class="-keyword">food</span>.
      </p>
    </div>
    <div class="entry__sub">
      <p class="entry__sub-note">
        * <br />
        following section DOSE NOT contain any bloody or violent content.
      </p>
    </div>
    <!-- <div class="entry__intro -full-height -flex-column">
      <div class="entry__intro-top">
        <p class="entry__intro-text">The journey of :</p>
      </div>
      <div class="entry__intro-main hero -flex-column-between">
        <p class="hero__text -top -flex-between hero__line -horizontal">
          <span class="hero__text-span -front hero__text-keyword -f-main-b"
            >CHICKEN</span
          >
          <span class="hero__text-span -back">being objectified as</span>
        </p>
        <div class="hero__text-btm -flex-between">
          <p class="hero__text -note -flex">
            <span class="hero__text-span -btm -note">
              * following section DOSE NOT contain any bloody or violent
              content.
            </span>
          </p>
          <p class="hero__text -btm hero__line -vertical -flex">
            <span class="hero__text-span -btm hero__text-keyword -f-main-b"
              >FOOD</span
            >
          </p>
        </div>
      </div>
    </div> -->
    <button
      class="entry__cta -f-main"
      @click="onBtnClicked"
      @mouseenter="onBtnEntered"
      @mouseleave="onBtnLeft"
    >
      <span>click to enter</span>
    </button>
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

  // data
  isBtnHovered = false;

  // computed
  get getEntryClasses() {
    return this.isBtnHovered ? "-is-hovered" : "";
  }

  // user events
  onBtnClicked() {
    this.$emit("onMouseClick");
  }
  onBtnEntered() {
    this.isBtnHovered = true;
  }
  onBtnLeft() {
    this.isBtnHovered = false;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";
@import "@/assets/styles/_layouts.scss";
@import "@/assets/styles/sections/GridSection.scss";

$offset-btm: 40px;

.entry {
  position: relative;
  padding: 64px $offset-v $offset-btm $offset-v;
  color: white;
  transition: all 0.3s;
}

.entry__intro-text {
  font-size: 5vw;
  line-height: 5.5vw;
}

.entry__sub-note {
  position: relative;
  font-style: italic;
  font-size: 18px;
  line-height: 22px;
  width: 20%;
}

// .entry__intro-top {
//   margin: 0 0 40px 8px;
// }
// .entry__intro-text {
//   font-size: 1.5vw;
// }

// .hero {
//   flex-grow: 1;
// }
// .hero__text {
//   font-size: 5.5vw;
//   line-height: 6.5vw;

//   & .hero__text-keyword {
//     font-size: 6vw;
//     line-height: 6.5vw;
//   }
// }
// .hero__text.-note {
//   font-style: italic;
//   font-size: 16px;
//   line-height: initial;
//   max-width: 15%;
//   justify-content: flex-end;
//   align-items: flex-end;
//   margin-bottom: 24px;
// }
// .hero__text-btm {
//   flex-grow: 1;
// }
// .hero__text.-top {
//   & .hero__text-keyword {
//     display: inline-block;
//   }
// }
// .hero__text.-btm {
//   text-align: right;
//   justify-content: flex-end;
//   align-items: flex-end;
// }

// .hero__text-span {
//   position: relative;
//   z-index: 5;
//   background-color: black;

//   &.-front {
//     padding-right: 1.5vw;
//   }
//   &.-back {
//     padding-left: 1.5vw;
//   }
//   &.-btm {
//     padding-top: 1vw;
//   }
// }

// .hero__line {
//   position: relative;

//   &:after {
//     content: "";
//     position: absolute;
//     z-index: 1;
//     background-color: white;
//   }
//   &.-horizontal:after {
//     top: calc(50% - 2px / 2);
//     left: 0;
//     width: 100%;
//     height: 2px;
//   }
//   &.-vertical:after {
//     right: 2vw;
//     top: 0;
//     height: 100%;
//     width: 2px;
//   }
// }

.entry__cta {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  color: white;
  font-size: 32px;
  text-align: right;

  width: 80%;
  height: 100%;

  animation: pulseText 2s infinite;
  animation-timing-function: ease-in-out;
  transition: all 0.3s;

  & span {
    margin-right: calc(#{$offset-v} * 2.5);
  }

  &:after {
    content: "";
    position: absolute;
    right: calc(#{$offset-v} * 1.9);
    bottom: calc(50% - 20px / 2);
    width: 20px;
    height: 20px;
    background: url("../../../assets/svgs/chevron-cursor.svg");
    background-repeat: no-repeat;
    background-size: contain;
    transform: rotate(-90deg);
    transition: all 0.3s;
  }

  @include hover {
    animation: none;
    transform: scale(1.1);
    &:after {
      transform: rotate(-90deg) translate3d(0, 4px, 0);
      transition: all 0.3s;
    }
  }
}

@keyframes pulseText {
  0% {
    opacity: 0.5;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

// states
.entry.-is-hovered {
  transform: translate3d(1%, 0, 0);
  transition: all 0.3s;
}
</style>
