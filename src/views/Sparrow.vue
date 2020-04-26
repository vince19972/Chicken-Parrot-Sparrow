<template>
  <grid-section class="sparrow" contentType="sparrow"> </grid-section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GridSection from "@/components/sections/gridSection/GridSection.vue";
import { Meta } from "@/decorator.js";

@Component({
  components: {
    GridSection,
  },
})
export default class Sparrow extends Vue {
  @Meta
  metaInfo() {
    return {
      titleTemplate: "Sparrow | %s",
    };
  }
}
</script>
