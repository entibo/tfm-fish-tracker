import { computed, reactive, ref, watch } from 'vue'
import { fishingSpotCoordinates } from '@/data'
import spots from '@/spots.json'

const KEY_SPOT_RELICS = 'fishing-spots'
const KEY_VERSION = 'fishing-spots-version'
const VERSION = '2026-07-09' // Change this to wipe previous local data

export const editMode = ref(false)
{
  const searchParams = new URLSearchParams(location.search)
  if (searchParams.has('edit')) {
    editMode.value = true
  }
}

export const localSpotRelics = reactive(
  Object.fromEntries(Object.keys(fishingSpotCoordinates).map((k) => [k, [] as string[]])),
)

{
  // Parse localStorage data
  if (localStorage.getItem(KEY_VERSION) !== VERSION) {
    localStorage.removeItem(KEY_SPOT_RELICS)
    localStorage.setItem(KEY_VERSION, VERSION)
  }
  const storedData = localStorage.getItem(KEY_SPOT_RELICS)
  if (storedData) {
    const storedSpotRelics = JSON.parse(storedData)
    Object.keys(fishingSpotCoordinates).forEach((spot) => {
      localSpotRelics[spot] = storedSpotRelics[spot]
    })
  }
}

watch(localSpotRelics, (newVal) => {
  localStorage.setItem(KEY_SPOT_RELICS, JSON.stringify(newVal))
})

export const allSpotRelics = computed(() => {
  const r: Record<string, string[]> = {}
  // Merge data from both sources
  Object.keys(fishingSpotCoordinates).forEach((spot) => {
    const relicsFromRepo = spots[spot] ?? []
    const relicsFromLocalStorage = localSpotRelics[spot] ?? []

    const combined = [...new Set([...relicsFromRepo, ...relicsFromLocalStorage])]

    r[spot] = combined
  })
  return r
})

export function submitUserRelicPosition(spot: string, relic: string) {
  if (localSpotRelics[spot]?.includes(relic)) return
  if (!localSpotRelics[spot]) localSpotRelics[spot] = []
  localSpotRelics[spot].push(relic)
  submitToDatabase({ spot, relic })
}

export function removeUserRelicPosition(spot: string, relic: string) {
  if (!localSpotRelics[spot]) return
  const index = localSpotRelics[spot]?.indexOf(relic)
  if (index < 0) return
  localSpotRelics[spot].splice(index, 1)
  submitToDatabase({ spot, relic, remove: true })
}

function submitToDatabase(payload: { spot: string; relic: string; remove?: boolean }) {
  fetch('https://entibo.alwaysdata.net/fishing', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((data) => console.log('Success:', data))
    .catch((error) => console.error('Error:', error))
}
