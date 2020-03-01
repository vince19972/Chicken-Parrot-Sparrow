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
.section {
  width: 100%;
  height: 100vh;
  padding: 24px 0;
}
</style>
