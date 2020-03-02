<template>
  <div class="produce">
    <div class="lead">
      <div class="lead-input -bar"></div>
      <p class="lead-text -f-condensed" ref="textLead">CHICKEN</p>
    </div>
    <div class="sub">
      <div class="sub-container">
        <div class="sub-output -bar"></div>
        <p class="sub-text">CHIKCEN</p>
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
export default class Produce extends Vue {
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

$bar-duration: 1s;
$input-bar-length: calc(#{$v-gutter-v} / 2);
$output-duration: 1s;
$output-bar-length: calc(#{$v-gutter-v});

.produce {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  writing-mode: vertical-rl;
}

.-bar {
  background-color: black;
}
.lead-input.-bar {
  width: calc(#{$gutter-v} / 3);
  // height: $input-bar-length;
  margin-bottom: calc(#{$v-gutter-v} / 6);
}
.sub-output.-bar {
  width: calc(#{$gutter-v} / 4);
  height: 100%;
  margin-top: calc(#{$v-gutter-v} / 10);
  margin-bottom: calc(#{$v-gutter-v} / 8);
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
  justify-content: center;
  width: calc(#{$row-v} * 2 + #{$gutter-v});
  height: 100%;

  &-container {
    display: flex;
    align-items: center;
  }
  &-container.-btm {
    margin-right: calc(#{$gutter-v} * -0.8);
  }

  &-text {
    font-size: calc(#{$f-size-sub-val} * 1em);
    line-height: calc(
      (#{$horizontal-row-height} + #{$horizontal-gutter-height} * 2) * #{$size-root-v}
    );
  }
}

@keyframes moveInputBar {
  0% {
    height: 0;
  }
  25%,
  100% {
    height: $input-bar-length;
  }
}
@keyframes moveOutputBar {
  0%,
  25% {
    height: 0;
  }
  50%,
  100% {
    height: 100%;
  }
}
@keyframes moveOutputText {
  0%,
  45% {
    // width: 0;
    // height: 0;
    opacity: 0;
  }
  100% {
    // width: 100%;
    // height: 100%;
    opacity: 1;
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
.sub-text {
  animation-name: moveOutputText;
  animation-timing-function: ease-out;
  animation-duration: $bar-duration;
  animation-iteration-count: infinite;
}
</style>
