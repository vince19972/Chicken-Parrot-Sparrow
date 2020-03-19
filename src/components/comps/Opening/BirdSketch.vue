<template>
  <div class="bird">
    <div class="bird__head"></div>
    <div class="bird__beak"></div>
    <div class="bird__body"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class BirdSketch extends Vue {}
</script>

<style scoped lang="scss">
$body-height: calc(100vh * 0.75);
$body-width: calc(#{$body-height} * 2);

$head-width: calc((100vh - #{$body-height}) * 2);

$beak-width: calc(#{$body-width} * 0.3);
$beak-height: calc(#{$body-height} * 0.3);
$beak-offset-left: calc(#{$beak-width} * 0.3);

$bird-width: calc(#{$body-width} + #{$beak-offset-left});
$bird-color: blue;

.bird {
  position: relative;
  height: 100%;
  width: calc(#{$body-width} + #{$beak-offset-left});
  margin: 0 auto;
}

.bird__head {
  width: $head-width;
  height: $head-width;
  border-radius: 100%;
  background-color: $bird-color;

  position: absolute;
  bottom: calc(#{$body-height} - (#{$head-width} / 2));
  left: $beak-offset-left;
}

.bird__body {
  width: $body-width;
  height: $body-height;
  border-bottom-left-radius: $body-width;
  border-bottom-right-radius: $body-width;
  background-color: $bird-color;

  position: absolute;
  bottom: 0;
  left: $beak-offset-left;
}

.bird__beak {
  width: 0;
  height: 0;
  border-top: $beak-height solid transparent;
  border-bottom: $beak-height solid transparent;
  border-right: $beak-width solid $bird-color;

  position: absolute;
  bottom: calc(#{$body-height} - (#{$beak-height}));
  left: 0;
}
</style>
