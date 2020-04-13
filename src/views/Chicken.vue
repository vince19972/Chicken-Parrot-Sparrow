<template>
  <GirdSection class="chicken">
    <ChickenGrid></ChickenGrid>
  </GirdSection>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GridSection from "@/components/sections/GridSection.vue";
import ChickenGrid from "@/components/partials/ChickenGrid.vue";

@Component({
  components: {
    GridSection,
    ChickenGrid
  }
})
export default class Chicken extends Vue {}
</script>
