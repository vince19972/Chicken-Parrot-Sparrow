<template>
  <div :class="['section']">
    <div class="section__content">
      <chicken-grid
        v-if="contentType === 'chicken'"
        :transformValue="childElementOffsetValue"
      ></chicken-grid>
      <parrot-grid
        v-else-if="contentType === 'parrot'"
        :transformValue="childElementOffsetValue"
      ></parrot-grid>
    </div>
    <info-panel
      :contentType="contentType"
      @onStageToPan="onStagePan"
    ></info-panel>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import InfoPanel from "./InfoPanel.vue";
import ChickenGrid from "@/components/partials/ChickenGrid.vue";
import ParrotGrid from "@/components/partials/ParrotGrid.vue";

@Component({
  name: "GridSection",
  components: {
    InfoPanel,
    ChickenGrid,
    ParrotGrid
  }
})
export default class GridSection extends Vue {
  @Prop() readonly contentType!: "chicken" | "sparrow" | "parrot";

  // data
  childElementOffsetValue = 0;

  // user events
  onStagePan(offsetValue) {
    this.childElementOffsetValue = offsetValue;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";
@import "@/assets/styles/_layouts.scss";
@import "@/assets/styles/sections/GridSection.scss";

.section {
  font-family: $f-grid;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
}
</style>
