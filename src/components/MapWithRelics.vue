<script setup lang="ts">
import MapImage from './MapImage.vue'
import RelicIcon from './RelicIcon.vue'
import NewRelic from './NewRelic.vue'

import { type FishingMap, fishingSpotCoordinates } from '@/data.ts'
import { allSpotRelics, localSpotRelics, removeUserRelicPosition } from '@/stores/spots.ts'
import { computed } from 'vue'

const { map } = defineProps<{
  map: FishingMap
}>()

const spotRelicsOnThisMap = computed(() => {
  return Object.fromEntries(
    Object.entries(allSpotRelics.value).filter(([spot]) => spot.startsWith(map)),
  )
})
</script>

<template>
  <div :id="map" class="map">
    <div
      v-for="(relics, spot) in spotRelicsOnThisMap"
      :key="spot"
      class="relics"
      :style="{
        left: fishingSpotCoordinates[spot].x + 'px',
        top: fishingSpotCoordinates[spot].y + 'px',
      }"
    >
      <div v-for="relic in relics" :key="relic" class="relic-container">
        <RelicIcon :relic="relic" :coins="true"></RelicIcon>
        <button
          v-if="localSpotRelics[spot]?.includes(relic)"
          class="remove"
          v-on:click="removeUserRelicPosition(spot, relic)"
        >
          <img class="x" src="/img/check-non.png" />
        </button>
      </div>
      <NewRelic :spot="spot" :class="{ solo: relics.length === 0 }"></NewRelic>
    </div>

    <MapImage :map="map"></MapImage>
  </div>
</template>

<style>
.map {
  position: relative;
}
.relics {
  position: absolute;
  display: flex;
  translate: -50% -20px;
  height: 40px;
}
.relic-container {
  position: relative;

  button.remove {
    position: absolute;
    top: 0px;
    right: 0px;
    translate: 50% -50%;
    display: flex;

    appearance: none;
    border: none;
    outline: none;
    padding: 0;
    background: none;

    /* Hide the X until the relic is hovered */
    display: none;
    :hover > & {
      display: block;
      z-index: 999;
    }
  }
}
</style>
