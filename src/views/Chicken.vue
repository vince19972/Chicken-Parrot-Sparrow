<template>
  <grid-section class="chicken" contentType="chicken"> </grid-section>
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
export default class Chicken extends Vue {
  @Meta
  metaInfo() {
    return {
      titleTemplate: "Chicken | %s",
    };
  }
}
</script>
