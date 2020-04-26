<template>
  <grid-section class="parrot" contentType="parrot"> </grid-section>
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
export default class Parrot extends Vue {
  @Meta
  metaInfo() {
    return {
      titleTemplate: "Parrot | %s",
    };
  }
}
</script>
