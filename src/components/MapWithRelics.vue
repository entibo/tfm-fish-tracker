<script setup lang="ts">
import MapImage from './MapImage.vue'
import RelicIcon from './RelicIcon.vue'
import NewRelic from './NewRelic.vue'

import { type FishingMap, fishingSpotCoordinates } from '@/data.ts'
import { relicsInFishingSpot } from '@/stores/spots.ts'
import { computed } from 'vue'

const { map } = defineProps<{
  map: FishingMap
}>()

const relicsInFishingSpotsOnThisMap = computed(() => {
  return Object.fromEntries(
    Object.entries(relicsInFishingSpot.value).filter(([spot]) => spot.startsWith(map)),
  )
})

// const relicsInFishingSpotsOnThisMap = [['waterfall2', ['D2', 'B3']]]
// const relicsInFishingSpotsOnThisMap = relicsInFishingSpot
//
console.log(relicsInFishingSpotsOnThisMap)
</script>

<template>
  <div :id="map" class="map">
    <div
      v-for="(relics, spot) in relicsInFishingSpotsOnThisMap"
      :key="spot"
      class="relics"
      :style="{
        left: fishingSpotCoordinates[spot].x + 'px',
        top: fishingSpotCoordinates[spot].y + 'px',
      }"
    >
      <RelicIcon v-for="relic in relics" :key="relic" :relic="relic" :coins="true"></RelicIcon>
      <NewRelic :spot="spot"></NewRelic>
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
}
</style>
