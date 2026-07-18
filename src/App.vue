<script setup lang="ts">
import MapBrowser from './components/MapViewer.vue'
import MapThumbnail from './components/MapThumbnail.vue'
import RelicGrid from './components/RelicGrid.vue'
import TextInput from './components/TextInput.vue'
import { maps } from '@/data.ts'
import OpenLinkIcon from './components/OpenLinkIcon.vue'
import { lastResetDate } from './stores/spots'
import { computed } from 'vue'

const relativeTime = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto', // Shows "today" instead of "in 0 days"
})

const updateDateString = computed(() => {
  const now = new Date()
  const lastReset = lastResetDate.value
  const diffTime = Math.abs(now.getTime() - lastReset.getTime())
  const HOUR = 1000 * 60 * 60
  const DAY = HOUR * 24
  if (diffTime < DAY) return relativeTime.format(-Math.floor(diffTime / HOUR), 'hour')
  return relativeTime.format(-Math.floor(diffTime / DAY), 'day')
})
</script>

<template>
  <div class="content">
    <TextInput></TextInput>
    <div class="flex">
      <RelicGrid></RelicGrid>
      <div class="thumbnails">
        <MapThumbnail v-for="map in maps" :map="map" :key="map"></MapThumbnail>
        <a
          target="_blank"
          href="https://transformice.fandom.com/wiki/Fishing_2026"
          class="wiki-link"
        >
          <OpenLinkIcon />Wiki</a
        >
      </div>
    </div>
    <MapBrowser></MapBrowser>
    <div class="info text-block">
      <div class="section">
        <div>
          <span class="emoji">🔄</span> Relics moved
          <span class="date">{{ updateDateString }}</span>
        </div>
      </div>
      <div class="section">
        <div>Fishing 2026</div>
        <div>
          <a href="https://transformice.fandom.com/wiki/Fishing_2026" target="_blank"
            >Transformice Wiki</a
          >
        </div>
        <div class="source-code">
          <a href="https://github.com/entibo/tfm-fish-tracker" target="_blank">Source code</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.content {
  display: grid;
}

.side {
  width: 256px;
  margin-inline: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  .textarea-container {
    flex-grow: 1;
    textarea {
      width: 100%;
      height: 100%;
      padding: 4px;
      outline: none;
      font-size: 10px;
      font-family: monospace;
      line-height: 1;
      cursor: pointer;
    }
    position: relative;
    &:hover::after {
      width: 100%;
      height: 100%;
      content: 'Copy';
      pointer-events: none;
      font-size: 24px;
      position: absolute;
      top: 0;
      left: 0;
      display: grid;
      place-items: center;
      background: rgba(0, 0, 0, 50%);
    }
  }
}

.flex {
  display: flex;
}

.thumbnails {
  display: flex;
  width: 360px;
  flex-wrap: wrap-reverse;
}
.wiki-link {
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 0.5em;
  }
  font-size: 20px;
  margin: auto;
}

.text-block {
  color: black;
  background-color: rgb(241, 234, 231);
}
.info {
  background-color: rgb(213, 228, 222);
  padding-inline: 0.5em;
  padding-block: 0.3em;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;

  a {
    color: rgb(0, 85, 170);
  }

  .section {
    display: flex;
    gap: 1em;
  }

  .emoji {
    margin-inline: 0.1em;
  }
  .date {
    /*font-size: smaller;*/
    color: #3c3764dd;
    padding-inline: 0.2em;
    /*border-radius: 3px;*/
    /*background: rgba(10, 0, 100, 10%);*/
  }
}
</style>
