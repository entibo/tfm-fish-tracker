<script setup lang="ts">
import MapBrowser from './components/MapViewer.vue'
import MapThumbnail from './components/MapThumbnail.vue'
import RelicGrid from './components/RelicGrid.vue'
import TextInput from './components/TextInput.vue'
import { maps } from '@/data.ts'
import OpenLinkIcon from './components/OpenLinkIcon.vue'
import { editMode, localSpotRelics } from './stores/spots'

const lastUpdateDate = new Date('2026-07-16')
const formatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
})

const updateDateString = formatter.format(lastUpdateDate) // "Thursday, Jul 9"

function copyText(event: MouseEvent) {
  const textarea = event.target
  textarea?.select()
  navigator.clipboard.writeText(textarea.value)
}
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
          <span class="date">{{ updateDateString }}</span>
          Relic locations have changed!
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

  <div class="side" v-if="editMode">
    <button>Exit Edit Mode</button>
    <div class="textarea-container">
      <textarea
        class="text-block"
        readonly
        :value="JSON.stringify(localSpotRelics, null, 2)"
        v-on:click="copyText"
      ></textarea>
    </div>
    <button>
      <a href="https://github.com/entibo/tfm-fish-tracker/edit/main/src/spots.json" target="_blank"
        >Edit on GitHub</a
      >
    </button>
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
.info {
  background-color: rgb(213, 228, 222);
  padding-inline: 0.5em;
  padding-block: 0.2em;
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

  .date {
    font-size: smaller;
    color: darkblue;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    background: rgba(10, 0, 50, 10%);
  }
}
</style>
