<script setup lang="ts">
import MapWithRelics from './MapWithRelics.vue'
</script>

<template>
  <div class="detailed-maps">
    <MapWithRelics map="waterfall"> </MapWithRelics>
    <MapWithRelics map="jungle"> </MapWithRelics>
    <MapWithRelics map="island"> </MapWithRelics>
    <MapWithRelics map="boat"> </MapWithRelics>
    <MapWithRelics map="dinosaur"> </MapWithRelics>
    <MapWithRelics map="shipwreck"> </MapWithRelics>
    <MapWithRelics map="antic"> </MapWithRelics>
    <MapWithRelics map="crystal"> </MapWithRelics>
  </div>
</template>

<style scoped>
.detailed-maps {
  display: grid;
  overflow: hidden;
  width: 800px;
  height: 400px;
  margin-top: 2px;
}
</style>
