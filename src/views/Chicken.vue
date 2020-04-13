<template>
  <div class="chicken">
    this is chicken page
    <!-- <OpeningSection /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OpeningSection from "@/components/sections/OpeningSection.vue";

@Component({
  components: {
    OpeningSection
  }
})
export default class Chicken extends Vue {
  components: {
    OpeningSection;
  };
}
</script>
