<template>
  <div :class="['section', moduleClasses]">
    <div class="section__content">
      <slot />
    </div>
    <div class="nav-btns -flex-column-between">
      <button
        class="nav-btns__btn -up -chevron"
        @mouseenter="onMouseEntered"
        @mouseleave="onMouseLeft"
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
        class="nav-btns__btn -down -chevron"
        @mouseenter="onMouseEntered"
        @mouseleave="onMouseLeft"
      >
        <p class="nav-btns__text">
          next stage
        </p>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "GridSection"
})
export default class GridSection extends Vue {
  // data
  isBtnsHovered = false;

  // computed
  get moduleClasses() {
    return this.isBtnsHovered ? "-is-hovered" : "";
  }

  // user events
  onMouseEntered() {
    this.isBtnsHovered = true;
  }
  onMouseLeft() {
    this.isBtnsHovered = false;
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
  overflow-x: hidden;
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
</style>
