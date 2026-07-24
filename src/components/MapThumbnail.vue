<script setup lang="ts">
import MapImage from './MapImage.vue'

import { type FishingMap } from '@/data.ts'
const { map } = defineProps<{
  map: FishingMap
}>()
</script>

<template>
  <a class="thumbnail" :href="'#' + map"><MapImage :map="map"></MapImage></a>
</template>

<style>
/*.thumbnail {
  display: contents;
}*/
.thumbnail img {
  width: 120px;
  height: 80px;
  object-fit: fill;
  outline: 4px solid var(--color-background);
  outline-offset: -2px;
  &:hover {
    /*outline-offset: 0px;*/
    /*outline-width: 2px;*/
    scale: 1.06;
    z-index: 13;
  }
}
</style>
