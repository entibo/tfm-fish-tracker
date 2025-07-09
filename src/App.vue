<script setup lang="ts">
import MapBrowser from './components/MapViewer.vue'
import MapThumbnail from './components/MapThumbnail.vue'
import RelicGrid from './components/RelicGrid.vue'
import TextInputs from './components/TextInput.vue'
import { maps } from '@/data.ts'
import OpenLinkIcon from './OpenLinkIcon.vue'
</script>

<template>
  <TextInputs></TextInputs>
  <div class="flex">
    <RelicGrid></RelicGrid>
    <div class="thumbnails">
      <MapThumbnail v-for="map in maps" :map="map" :key="map"></MapThumbnail>
      <a target="_blank" href="https://transformice.fandom.com/wiki/Fishing_2025" class="wiki-link">
        <OpenLinkIcon />Wiki</a
      >
    </div>
  </div>
  <MapBrowser></MapBrowser>
  <div class="credits text-block">
    <div>
      Thanks to everyone who contributed information on Discord &
      <a
        href="https://docs.google.com/spreadsheets/d/193P_yJbU66j8pkPUudUnoXi1M708POSIbds2UuXUiIo/"
        target="_blank"
        >Google Sheet</a
      >
      & <a href="https://breezewiki.com/transformice/wiki/Fishing_2025" target="_blank">Wiki</a>
    </div>
    <div class="source-code">
      <a href="https://github.com/entibo/tfm-fish-tracker" target="_blank">Source code</a>
    </div>
  </div>
</template>

<style>
.flex {
  display: flex;
}
.thumbnails {
  display: flex;
  width: 360px;
  flex-wrap: wrap-reverse;
}
.thumbnail {
  display: contents;
}
.thumbnail img {
  outline: 4px solid var(--color-background);
  outline-offset: -2px;
}
.thumbnail img,
.wiki-link {
  width: 120px;
}
.wiki-link {
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 0.5em;
  }
  font-size: 20px;
}
.text-block {
  color: black;
  background-color: rgb(241, 234, 231);
}
.credits {
  padding-inline: 0.5em;
  padding-block: 0.2em;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;

  a {
    color: rgb(0, 85, 170);
  }
}
</style>
