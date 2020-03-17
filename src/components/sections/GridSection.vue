<template>
  <div class="section">
    <ChickenGrid></ChickenGrid>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChickenGrid from "@/components/partials/ChickenGrid.vue";

@Component({
  components: {
    ChickenGrid
  }
})
export default class GridSection extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/sections/GridSection.scss";

.section {
  font-family: $f-object;
  width: 100%;
  overflow: hidden;
}
</style>
