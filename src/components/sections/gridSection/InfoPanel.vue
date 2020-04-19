<template>
  <div class="panel -flex-column-between">
    <button
      :class="['panel__btn -up', btnUpClasses]"
      @click="onMouseClicked('up')"
    >
      <p class="panel__btn-text">
        previous stage
      </p>
    </button>
    <div class="panel__info">
      <p class="panel__info-text -top">
        stage {{ childElementOffsetValue + 1 }}
      </p>
      <h2 class="panel__info-title">
        {{ sectionTitle }}
      </h2>
    </div>
    <button
      :class="['panel__btn -down', btnDownClasses]"
      @click="onMouseClicked('down')"
    >
      <p class="panel__btn-text">
        next stage
      </p>
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
  parrot: [],
  sparrow: []
};

@Component({
  name: "InfoPanel"
})
export default class InfoPanel extends Vue {
  @Prop() readonly contentType!: "chicken" | "sparrow" | "parrot";

  // data
  childElementOffsetValue = 0;

  // computed
  get btnUpClasses() {
    return this.childElementOffsetValue === 0 ? "-is-hidden" : "";
  }
  get btnDownClasses() {
    return this.childElementOffsetValue === 3 ? "-is-hidden" : "";
  }
  get sectionTitle() {
    return sectionTitles[this.contentType][this.childElementOffsetValue];
  }

  // user events
  onMouseClicked(type: "up" | "down") {
    const value = type === "up" ? -1 : 1;
    this.childElementOffsetValue += value;

    if (this.childElementOffsetValue < 0) {
      this.childElementOffsetValue = 0;
    } else if (this.childElementOffsetValue > 3) {
      this.childElementOffsetValue = 3;
    }

    this.$emit("onMouseClick", this.childElementOffsetValue);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";
@import "@/assets/styles/_layouts.scss";
@import "@/assets/styles/sections/GridSection.scss";

$chevron-size: 20px;

.panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  max-width: 50vw;
  max-height: 100vh;
  background-color: black;
  overflow: hidden;
}

.panel__btn {
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
.panel__btn-text {
  @include -f-main-b;
  height: 100%;
  width: 50%;
  margin: 0 auto;
}

.panel__info {
  color: white;
  text-align: center;
}
.panel__info-text {
  @include -f-main;
  font-size: 1vw;
  display: block;
  margin-bottom: 24px;
}
.panel__info-title {
  @include -f-main;
  font-size: 3vw;
}

// user events
.panel__btn {
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

// states
.panel__btn.-is-hidden {
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
}
</style>
