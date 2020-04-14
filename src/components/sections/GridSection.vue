<template>
  <div :class="['section', moduleClasses]">
    <div class="section__content">
      <chicken-grid
        v-if="contentType === 'chicken'"
        :transformValue="childElementOffsetValue"
      ></chicken-grid>
    </div>
    <div class="nav-btns -flex-column-between">
      <button
        :class="['nav-btns__btn -up -chevron', btnUpClasses]"
        @mouseenter="onMouseEntered"
        @mouseleave="onMouseLeft"
        @click="onMouseClicked('up')"
      >
        <p class="nav-btns__text">
          previous stage
        </p>
      </button>
      <button
        class="nav-btns__btn -center"
        @mouseenter="onMouseEntered"
        @mouseleave="onMouseLeft"
      >
        <p class="nav-btns__text -large">
          Artificial Insemination
        </p>
      </button>
      <button
        :class="['nav-btns__btn -down -chevron', btnDownClasses]"
        @mouseenter="onMouseEntered"
        @mouseleave="onMouseLeft"
        @click="onMouseClicked('down')"
      >
        <p class="nav-btns__text">
          next stage
        </p>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import ChickenGrid from "@/components/partials/ChickenGrid.vue";

@Component({
  name: "GridSection",
  components: {
    ChickenGrid
  }
})
export default class GridSection extends Vue {
  @Prop() readonly contentType!: "chicken" | "sparrow" | "parrot";

  // data
  isBtnsHovered = false;
  childElementOffsetValue = 0;

  // computed
  get moduleClasses() {
    return this.isBtnsHovered ? "-is-hovered" : "";
  }
  get btnUpClasses() {
    return this.childElementOffsetValue === 0 ? "-is-hidden" : "";
  }
  get btnDownClasses() {
    return this.childElementOffsetValue === 4 ? "-is-hidden" : "";
  }

  // user events
  onMouseEntered() {
    this.isBtnsHovered = true;
  }
  onMouseLeft() {
    this.isBtnsHovered = false;
  }
  onMouseClicked(type: "up" | "down") {
    const value = type === "up" ? -1 : 1;
    this.childElementOffsetValue += value;

    if (this.childElementOffsetValue < 0) {
      this.childElementOffsetValue = 0;
    } else if (this.childElementOffsetValue > 4) {
      this.childElementOffsetValue = 4;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";
@import "@/assets/styles/sections/GridSection.scss";

.section {
  font-family: $f-grid;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  transition: all 0.3s;
}

.nav-btns {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.nav-btns__btn {
  @include -flex-center-all;
  color: white;
  height: 20%;
  width: 100%;

  opacity: 0;
  transition: all 0.3s;
  @include hover {
    opacity: 1;
    transition: all 0.3s;

    &.-up {
      cursor: url("../../assets/svgs/chevron-cursor-up.svg"), auto;
    }
    &.-center {
      cursor: default;
    }
    &.-down {
      cursor: url("../../assets/svgs/chevron-cursor.svg"), auto;
    }
  }
}

.nav-btns__text {
  @include -f-main-b;
  height: 100%;
  width: 50%;
  margin: 0 auto;
}
.nav-btns__text.-large {
  @include -f-main;
  font-size: 3vw;
}

// states
.section.-is-hovered {
  background-color: black;
  transition: all 0.3s;
}
.btns__btn.-is-hidden {
  display: none;
}
</style>
