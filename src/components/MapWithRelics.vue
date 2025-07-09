<script setup lang="ts">
import MapImage from './MapImage.vue'

import { type FishingMap } from '@/data.ts'
const { map } = defineProps<{
  map: FishingMap
}>()
</script>

<template>
  <div :id="map">
    <div class="relics"><slot></slot></div>
    <MapImage :map="map"></MapImage>
  </div>
</template>

<style>
.relics {
  position: relative;
}
.relics img {
  position: absolute;
}
</style>
