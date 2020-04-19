<template>
  <grid-section class="parrot" contentType="parrot"> </grid-section>
  <!-- <parrot-grid></parrot-grid> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GridSection from "@/components/sections/gridSection/GridSection.vue";
import ParrotGrid from "@/components/partials/ParrotGrid.vue";

@Component({
  components: {
    GridSection,
    ParrotGrid
  }
})
export default class Chicken extends Vue {}
</script>
