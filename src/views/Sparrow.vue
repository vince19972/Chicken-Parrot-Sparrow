<template>
  <!-- <grid-section class="sparrow" contentType="sparrow"> </grid-section> -->
  <div>test</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GridSection from "@/components/sections/gridSection/GridSection.vue";

@Component({
  components: {
    GridSection,
  },
})
export default class Sparrow extends Vue {}
</script>
