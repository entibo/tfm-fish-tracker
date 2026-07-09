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

export const fishingSpotCoordinates = {
  waterfall1: { x: 680, y: 20 },
  waterfall2: { x: 700, y: 290 },
  waterfall3: { x: 220, y: 150 },
  waterfall4: { x: 80, y: 320 },

  jungle1: { x: 125, y: 70 },
  jungle2: { x: 405, y: 180 },
  jungle3: { x: 710, y: 20 },
  jungle4: { x: 125, y: 280 },

  island1: { x: 705, y: 70 },
  island2: { x: 470, y: 130 },
  island3: { x: 120, y: 320 },
  island4: { x: 740, y: 320 },

  boat1: { x: 520, y: 240 },

  dinosaur1: { x: 700, y: 60 },
  dinosaur2: { x: 690, y: 340 },
  dinosaur3: { x: 235, y: 20 },
  dinosaur4: { x: 420, y: 340 },

  shipwreck1: { x: 540, y: 90 },
  shipwreck2: { x: 760, y: 180 },
  shipwreck3: { x: 60, y: 330 },
  shipwreck4: { x: 710, y: 300 },

  antic1: { x: 240, y: 60 },
  antic2: { x: 380, y: 60 },
  antic3: { x: 630, y: 60 },
  antic4: { x: 770, y: 60 },
  antic5: { x: 70, y: 350 },
  antic6: { x: 760, y: 350 },
  antic7: { x: 280, y: 300 },
  antic8: { x: 550, y: 300 },

  crystal1: { x: 580, y: 120 },
  crystal2: { x: 720, y: 120 },
  crystal3: { x: 210, y: 40 },
  crystal4: { x: 330, y: 240 },
  crystal5: { x: 500, y: 240 },
  crystal6: { x: 320, y: 330 },
  crystal7: { x: 500, y: 330 },
}
