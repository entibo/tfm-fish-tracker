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

<style scoped></style>
