# Transformice Fishing Event 2026

# What to do if relics change locations

## Option 1: just update src/spots.json

Put ?edit in the URL to see and copy locally added relics as JSON

## Option 2: collaborative database

- Reset the database: DELETE FROM submissions;
- Bump date in the information footer
- Bump VERSION date in spots.ts to overwrite locally saved locations
- Pull from database: ./scripts/generate-spots.json.sh

# Notes

60 relics

| Year | Maps | Spots | Spot/Relic pairs |
| ---- | ---- | ----- | ---------------- |
| 2026 | 8    | 36    | ?                |
| 2025 | 8    | 36    | 64               |
| 2023 | 4    | 13    | 60               |
| 2021 | 4    | 13    | 60               |
