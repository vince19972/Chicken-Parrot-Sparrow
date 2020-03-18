<template>
  <div class="dots-connection container -safe-zone">
    <div class="container__top">
      <div class="prompt">
        <p class="prompt__text">Please connect the dots...</p>
      </div>
    </div>
    <div class="container__btm">
      <div class="connects">
        <div class="connects__left nodes">
          <div class="nodes__node">chicken</div>
          <div class="nodes__node">parrot</div>
          <div class="nodes__node">sparrow</div>
        </div>
        <div class="connects__center"></div>
        <div class="connects__right nodes">
          <div class="nodes__node">food</div>
          <div class="nodes__node">product</div>
          <div class="nodes__node">neighbor</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class DotsConnection extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";

$h-gutter: 2vh;
$container-height: calc(100vh - #{$h-gutter} * 2);
$container-row-height: calc((#{$container-height} - (#{$h-gutter} * 5)) / 6);
$container-height-top: calc(#{$container-row-height} * 4);

.dots-connection {
  height: 100vh;
}

.container {
  margin: auto;
  padding: $h-gutter 0;

  &__top {
    height: $container-height-top;
    margin-bottom: $h-gutter;
  }
  &__btm {
    height: calc(#{$container-height} - #{$container-height-top});
  }
}

.prompt {
  width: 60%;
  font-size: 2vw;
}

.connects {
  height: 100%;
  display: flex;

  &__left,
  &__right {
    flex-grow: 1;
  }
  &__center {
    width: 80%;
  }
}
.connects .nodes {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__node {
    font-size: 12vh;
  }
}
</style>
