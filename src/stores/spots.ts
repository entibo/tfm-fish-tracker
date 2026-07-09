import { computed, reactive, ref, watch } from 'vue'
import { fishingSpotCoordinates } from '@/data'
import spots from '@/spots.json'

const LOCALSTORAGE_KEY = 'fishing-spots'

export const editMode = ref(false)
{
  const searchParams = new URLSearchParams(location.search)
  if (searchParams.has('edit')) {
    editMode.value = true
  }
}

export const userRelicsInFishingSpot = reactive(
  Object.fromEntries(Object.keys(fishingSpotCoordinates).map((k) => [k, []])),
)

function mergeUserRelicsData() {
  // Parse localStorage data
  const storedData = localStorage.getItem(LOCALSTORAGE_KEY)
  const localStorageRelics = storedData ? JSON.parse(storedData) : {}

  // Merge data from both sources
  Object.keys(fishingSpotCoordinates).forEach((spot) => {
    const relicsFromSpots = spots[spot] ?? []
    const relicsFromStorage = localStorageRelics[spot] ?? []

    // Combine and deduplicate using Set
    const combined = [...new Set([...relicsFromSpots, ...relicsFromStorage])]

    userRelicsInFishingSpot[spot] = combined
  })
}
mergeUserRelicsData()

watch(userRelicsInFishingSpot, (newVal) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newVal))
})

export const relicsInFishingSpot = computed(() => ({
  ...userRelicsInFishingSpot,
  // ...knownRelicsInFishingSpot,
}))

export function submitUserRelicPosition(spot: string, relic: string) {
  console.log(spot, relic)
  if (!userRelicsInFishingSpot[spot].includes(relic)) {
    userRelicsInFishingSpot[spot].push(relic)
  }
}
