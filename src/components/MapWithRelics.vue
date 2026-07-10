<script setup lang="ts">
import MapImage from './MapImage.vue'
import RelicIcon from './RelicIcon.vue'
import NewRelic from './NewRelic.vue'

import { type FishingMap, fishingSpotCoordinates } from '@/data.ts'
import {
  editMode,
  allSpotRelics,
  localSpotRelics,
  removeUserRelicPosition,
} from '@/stores/spots.ts'
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
          <svg
            class="x"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="100"
            height="100"
          >
            <line
              x1="50"
              y1="20"
              x2="50"
              y2="80"
              stroke="white"
              stroke-width="6"
              stroke-linecap="round"
            />
            <line
              x1="20"
              y1="50"
              x2="80"
              y2="50"
              stroke="white"
              stroke-width="6"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
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
.relic-container {
  position: relative;

  button.remove {
    position: absolute;
    top: 2px;
    right: 2px;
    translate: 50% -50%;

    width: 12px;
    height: 12px;
    border-radius: 100px;
    appearance: none;
    border: none;
    outline: none;
    padding: 0;
    line-height: 0;
    background: var(--color-background);
    color: white;

    display: none;
    :hover > & {
      display: block;
      z-index: 999;
    }

    svg.x {
      width: 100%;
      height: 100%;
      rotate: 45deg;
    }
  }
}
</style>
