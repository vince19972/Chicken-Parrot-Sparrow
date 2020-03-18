<template>
  <div class="bird">
    <img src="@/assets/svgs/bird.svg" alt="bird" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class BirdSketch extends Vue {}
</script>

<style scoped lang="scss">
.bird {
  height: 100%;
  width: 100%;
}
</style>
