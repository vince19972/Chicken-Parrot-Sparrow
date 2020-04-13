<template>
  <div class="section">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
export default class GridSection extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/sections/GridSection.scss";

.section {
  font-family: $f-grid;
  width: 100%;
  overflow-x: hidden;
}
</style>
