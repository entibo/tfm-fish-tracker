export const mapImages = {
  jungle: 'jungle.jpg',
  boat: 'boat.jpg',
  waterfall: 'waterfall.jpg',
  island: 'island.jpg',
  dinosaur: 'dinosaur.jpg',
  crystal: 'crystal.jpg',
  antic: 'antic.png',
  shipwreck: 'shipwreck.png',
}

export type FishingMap = keyof typeof mapImages

export const maps: FishingMap[] = [
  'shipwreck',
  'island',
  'jungle',
  'boat',
  'dinosaur',
  'waterfall',
  'antic',
  'crystal',
]
