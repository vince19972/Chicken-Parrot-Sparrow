<template>
  <div :class="['panel', panelClasses]">
    <transition name="dissolve" mode="out-in">
      <div v-if="isIntoStages" key="stages" class="-full-height panel__stages">
        <div class="stages -flex-column-between">
          <button
            :class="['stages__btn -up', btnUpClasses]"
            @click="onMouseClicked('up')"
          >
            <p class="stages__btn-text">
              previous stage
            </p>
          </button>
          <div class="stages__info">
            <transition name="fade" mode="out-in">
              <p :key="childElementOffsetValue" class="stages__info-text -top">
                stage {{ childElementOffsetValue + 1 }}
              </p>
            </transition>
            <transition name="fade" mode="out-in">
              <h2 :key="sectionTitle" class="stages__info-title">
                {{ sectionTitle }}
              </h2>
            </transition>
            <transition name="fade" mode="out-in">
              <p :key="sectionDescription" class="stages__info-text -btm -desc">
                {{ sectionDescription }}
              </p>
            </transition>
          </div>
          <button
            :class="['stages__btn -down', btnDownClasses]"
            @click="onMouseClicked('down')"
          >
            <p class="stages__btn-text">
              next stage
            </p>
          </button>
        </div>
        <button
          class="stages__toggle -flex-center-all"
          @click="onToggleClicked"
        >
          <p class="stages__toggle-text -f-main">
            <span v-html="toggleBtnText"></span>
          </p>
        </button>
      </div>
      <div v-else key="entry" class="-full-height -full-width">
        <entry-hero @onMouseClick="onEntryBtnClicked"></entry-hero>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import EntryHero from "./EntryHero.vue";

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

const sectionDescriptions = {
  chicken: [
    "Ornare iaculis orci libero gravida ut conubia eleifend congue suspendisse volutpat felis phasellus, malesuada arcu dolor ante enim morbi interdum commodo lorem at.",
    "Nostra litora conubia nibh sodales ornare gravida sociis auctor urna, primis lacinia fermentum nec lorem vehicula et eleifend nullam leo, taciti enim in ultricies blandit cras purus ultrices. ",
    "Blandit aenean tempor interdum libero arcu, bibendum velit orci phasellus urna consequat, odio ante penatibus eu. Sollicitudin litora tortor cras vulputate est vehicula id porta, himenaeos nullam magna eget rhoncus vel etiam dictum fringilla.",
    "Taciti cum hendrerit conubia a nisi ultrices cras facilisis risus, porta elit gravida habitant lacus massa ligula quam mus, inceptos congue luctus sociis orci leo fusce vulputate."
  ],
  parrot: [
    "Ornare iaculis orci libero gravida ut conubia eleifend congue suspendisse volutpat felis phasellus, malesuada arcu dolor ante enim morbi interdum commodo lorem at.",
    "Nostra litora conubia nibh sodales ornare gravida sociis auctor urna, primis lacinia fermentum nec lorem vehicula et eleifend nullam leo, taciti enim in ultricies blandit cras purus ultrices. ",
    "Blandit aenean tempor interdum libero arcu, bibendum velit orci phasellus urna consequat, odio ante penatibus eu. Sollicitudin litora tortor cras vulputate est vehicula id porta, himenaeos nullam magna eget rhoncus vel etiam dictum fringilla."
  ],
  sparrow: []
};

@Component({
  name: "InfoPanel",
  components: {
    EntryHero
  }
})
export default class InfoPanel extends Vue {
  @Prop() readonly contentType!: "chicken" | "sparrow" | "parrot";

  // data
  childElementOffsetValue = 0;
  isPanelOpened = true;
  maxOffsetValue = 3;
  isIntoStages = false;

  // computed
  get maxSectionsCount() {
    switch (this.contentType) {
      case "chicken":
        return 3;
      case "parrot":
        return 2;
      case "sparrow":
        return 1;
      default:
        return 3;
    }
  }
  get panelClasses() {
    return [
      this.isIntoStages ? "" : "-is-full-screen",
      this.isPanelOpened ? "" : "-is-closed"
    ];
  }
  get btnUpClasses() {
    return this.childElementOffsetValue === 0 ? "-is-hidden" : "";
  }
  get btnDownClasses() {
    return this.childElementOffsetValue === this.maxOffsetValue
      ? "-is-hidden"
      : "";
  }
  get sectionTitle() {
    return sectionTitles[this.contentType][this.childElementOffsetValue];
  }
  get sectionDescription() {
    return sectionDescriptions[this.contentType][this.childElementOffsetValue];
  }
  get toggleBtnText() {
    return this.isPanelOpened ? "☓ &nbsp; close panel &nbsp; ☓" : "open panel";
  }

  // user events
  onMouseClicked(type: "up" | "down") {
    const value = type === "up" ? -1 : 1;
    this.childElementOffsetValue += value;

    if (this.childElementOffsetValue < 0) {
      this.childElementOffsetValue = 0;
    } else if (this.childElementOffsetValue > this.maxOffsetValue) {
      this.childElementOffsetValue = this.maxOffsetValue;
    }

    this.$emit("onMouseClick", this.childElementOffsetValue);
  }
  onToggleClicked() {
    this.isPanelOpened = !this.isPanelOpened;
  }
  onEntryBtnClicked() {
    this.isIntoStages = true;
  }

  // life cycle
  mounted() {
    this.maxOffsetValue = this.maxSectionsCount;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";
@import "@/assets/styles/_layouts.scss";
@import "@/assets/styles/sections/GridSection.scss";

$chevron-size: 20px;
$toggle-height: 30%;
$toggle-width: 48px;

.panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  background-color: black;
  overflow: hidden;

  transition: transform 0.5s ease-in-out;
  will-change: transform;
  transform: translate3d(50vw, 0, 0);
  &.-is-full-screen {
    transition: transform 0.5s ease-in-out;
    will-change: transform;
    transform: translate3d(0, 0, 0);
  }
}

.panel__stages {
  width: 50vw;
  max-width: 50vw;
}

.stages {
  width: 100%;
  height: 100%;
}

.stages__btn {
  @include -flex-center-all;
  position: relative;
  color: white;
  height: 10%;
  width: 100%;

  &:after {
    content: "";
    position: absolute;
    left: calc(50% - #{$chevron-size} / 2);
    width: $chevron-size;
    height: $chevron-size;
    background: url("../../../assets/svgs/chevron-cursor-up.svg");
    background-repeat: no-repeat;
    background-size: contain;
    transition: all 0.3s;
  }
  &.-up:after {
    top: $chevron-size;
  }
  &.-down:after {
    bottom: $chevron-size;
    transform: rotate(180deg);
  }
}
.stages__btn-text {
  @include -f-main-b;
  height: 100%;
  width: 50%;
  margin: 0 auto;
}

.stages__info {
  color: white;
  text-align: center;
  max-width: 80%;
  margin: 0 auto;
}
.stages__info-text {
  @include -f-main;
  font-size: 1vw;
  display: block;
  margin-bottom: 24px;

  &.-desc {
    max-width: 80%;
    margin: 0 auto;
    line-height: 1.1vw;
  }
}
.stages__info-title {
  @include -f-main;
  font-size: 3.25vw;
  margin-bottom: 24px;
}

.stages__toggle {
  position: absolute;
  top: calc(50% - #{$toggle-height} / 2);
  left: 0;
  width: $toggle-width;
  height: $toggle-height;
  color: white;
}
.stages__toggle-text {
  writing-mode: vertical-rl;
  font-size: 18px;
  letter-spacing: 0.5px;
}

// user events
.panel {
  transition: transform 0.5s ease-in-out;
}
.stages__btn {
  transition: all 0.3s;
  @include hover {
    &:after {
      transition: all 0.3s;
    }
    &.-up:after {
      transform: translate3d(0, -6px, 0);
    }
    &.-down:after {
      transform: rotate(180deg) translate3d(0, -6px, 0);
    }
  }
}
.stages__toggle {
  transition: all 0.5s ease-in-out;
  @include hover {
    font-style: italic;
  }
}

// states
.panel.-is-closed {
  transform: translate3d(100vw, 0, 0);
  transition: transform 0.5s ease-in-out;
  will-change: transform;
  overflow: initial;

  & .stages__toggle {
    transform: translate3d(calc(#{$toggle-width} * -1), 0, 0);
    transition: all 0.5s ease-in-out;
  }
  & .stages__toggle-text {
    background-color: black;
    padding: 24px 32px 24px 16px;
  }
}
.stages__btn.-is-hidden {
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
}
</style>
