<template>
  <div class="Stack">
    <div class="lead">
      <div class="lead-input -bar"></div>
      <p class="lead-text -f-condensed" ref="textLead">CHICKEN</p>
    </div>
    <div class="sub">
      <div class="sub-container">
        <div class="sub-output -bar"></div>
        <p class="sub-text">{{ updateWindowWidth }}</p>
      </div>
      <div class="sub-container -btm">
        <div class="sub-output -bar"></div>
        <p class="sub-text" ref="textSub">CHICKEN</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Stack extends Vue {
  setLength = 1;
  windowWidth = 0;

  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const styles = require("../../../assets/styles/components/ChickenGrid.scss");

    const textLead = this.$refs.textLead as HTMLElement;
    const textSub = this.$refs.textSub as HTMLElement;
    this.setLength = textLead.offsetWidth + textSub.offsetWidth;
  }

  get updateWindowWidth () {
    this.windowWidth = this.$store.getters["browser/windowSize"].width;
    return this.windowWidth
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/ChickenGrid.scss";

.stack {
  display: flex;
}

.-bar {
  background-color: black;
  width: 0;
}
.lead-input.-bar {
  height: calc(#{$gutter} / 2);
  margin-right: calc(#{$v-gutter} / 6);
}
.sub-output.-bar {
  height: calc(#{$gutter} / 4);
  margin-left: calc(#{$v-gutter} / 10);
  margin-right: calc(#{$v-gutter} / 8);
}

.lead {
  display: flex;
  align-items: center;

  &-text {
    font-size: $f-size-lead;
    line-height: $f-size-lead;
  }
}

.sub {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(#{$row} * 2 + #{$gutter});

  &-container {
    display: flex;
    align-items: center;
  }
  &-container.-btm {
    margin-top: calc(#{$gutter} * -0.8);
  }

  &-text {
    font-size: calc(#{$f-size-sub-val} * 1em);
    line-height: calc(
      (#{$g-horizontal-row-height} + #{$g-horizontal-gutter-height} * 2) * #{$size-root}
    );
  }
}

$bar-duration: 1s;
$output-bar-length: calc(#{$v-gutter} * 4);
$output-duration: 1s;
$input-bar-length: $v-gutter;

@keyframes moveInputBar {
  0% {
    width: 0;
  }
  25%,
  100% {
    width: $input-bar-length;
  }
}
@keyframes moveOutputBar {
  0%,
  25% {
    width: 0;
  }
  50%,
  100% {
    width: $output-bar-length;
  }
}

.lead-input {
  animation-name: moveInputBar;
  animation-timing-function: ease-in-out;
  animation-duration: $bar-duration;
  animation-iteration-count: infinite;
}
.sub-output {
  animation-name: moveOutputBar;
  animation-timing-function: ease-in-out;
  animation-duration: $bar-duration;
  animation-iteration-count: infinite;
}
</style>
