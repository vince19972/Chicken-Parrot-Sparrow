<template>
  <grid-section class="chicken" contentType="chicken"> </grid-section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GridSection from "@/components/sections/gridSection/GridSection.vue";

@Component({
  components: {
    GridSection
  }
})
export default class Chicken extends Vue {}
</script>
