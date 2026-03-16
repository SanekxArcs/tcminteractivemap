# Developer Guide — TCM Interactive Map

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
```

---

## Adding a new playlist

**Step 1 — Create the data file**

Create `public/data/playlists/{id}.json`. Copy the schema below and fill it in.
Use the in-map coordinate picker (see bottom of this doc) to get exact coordinates.

```json
{
  "id": "my_playlist",
  "name": "My Playlist",
  "imgFolder": "MyPlaylist",
  "container": { "lat": 1234.5, "lng": 5678.9 },
  "events": [
    {
      "lat": 1234.5,
      "lng": 5678.9,
      "name": "Event Name",
      "number": "1/5",
      "type": "Race",
      "weather": "Sunrise",
      "car": "Some Car",
      "category": "Street Tier 2",
      "xp": "8,400",
      "bucks": "15,750"
    }
  ],
  "feats": [
    {
      "lat": 1234.5,
      "lng": 5678.9,
      "type": "escape",
      "location": "Location Name",
      "featType": "Escape",
      "objective": "690 m",
      "xp": "2,880",
      "bucks": "5,400"
    }
  ],
  "photoOps": [
    {
      "lat": 1234.5,
      "lng": 5678.9,
      "name": "Photo Name",
      "requirements": ["Requirement 1", "Requirement 2"]
    }
  ],
  "collectibles": [
    {
      "lat": 1234.5,
      "lng": 5678.9,
      "challenge": "Challenge Name"
    }
  ]
}
```

**Feat types:** `escape` | `slalom` | `speedtrap` | `drift`

**Step 2 — Add icons**

Put the playlist icon images in `public/img/{imgFolder}/`:
- `{id}_container.png` — 64×75px
- `{id}_event.png` — 35×45px

**Step 3 — Register the playlist**

Add one line to `src/data/playlistConfig.js`:

```js
{ id: 'my_playlist', name: 'My Playlist', filterKey: 'my_playlist' },
```

That's it — the filter checkbox, map layer, and popup rendering are all automatic.

---

## Adding a new challenge

Challenges have two parts: the waypoint markers (coordinates) and the description shown in the sidebar.

**Part A — Waypoint data** (`public/challenges.json`)

Add a new key with an array of waypoints:

```json
"My Challenge Name": [
  { "lat": 1234.5, "lng": 5678.9, "name": "Start Location", "icon": "start" },
  { "lat": 2345.6, "lng": 6789.0, "name": "End Location",   "icon": "finish" }
]
```

**Icon types:** `start` | `finish` | `challenge`

**Part B — Sidebar description** (`src/data/challengesMeta.json`)

Find the matching playlist group (or add a new one) and add:

```json
{
  "key": "My Challenge Name",
  "label": "My Challenge Label",
  "descriptionHtml": "Drive from <b>LOCATION A</b> to <b>LOCATION B</b>",
  "vehicle": "Some Car Model"
}
```

The `key` must exactly match the key in `challenges.json`.
If the playlist doesn't exist yet as a group, add a new entry at the end of the array:

```json
{
  "playlist": "My Playlist",
  "challenges": [ ... ]
}
```

---

## Editing misc markers

**File:** `public/data/misc.json`

Groups: `mf_grounds`, `demo_royale`, `grand_race`, `achievements`, `treasure`

```json
{
  "grand_race": [
    { "lat": 1234.5, "lng": 5678.9, "name": "Grand Race Start" },
    { "lat": 2345.6, "lng": 6789.0, "name": "Grand Race Start 2" }
  ]
}
```

---

## Editing rival markers

**File:** `public/data/rivals.json`

Groups: `clawblades`, `diamond_fangs`, `quickwhiskers`, `nightstalkers`, `chiefs`, `mysterious_driver`

```json
{
  "clawblades": [
    { "lat": 1234.5, "lng": 5678.9, "name": "Clawblades Location" }
  ]
}
```

---

## In-map coordinate picker (Dev Tool)

Open the map with `?dev` in the URL:

```
http://localhost:5173/?dev
```

This enables a **Dev Panel** in the top-right corner:

- **Click anywhere on the map** → coordinate is added to the list
- **Label each point** by selecting a type (event / feat / photoOp / collectible / container / misc / challenge)
- **Copy as JSON** → copies the collected points as a ready-to-paste JSON array
- **Clear** → resets the list

The copied JSON matches exactly the schema used in the data files.

---

## File map

| What to change | File |
|---|---|
| Add/remove a playlist | `src/data/playlistConfig.js` |
| Playlist marker data | `public/data/playlists/{id}.json` |
| Challenge waypoints | `public/challenges.json` |
| Challenge descriptions | `src/data/challengesMeta.json` |
| Misc markers | `public/data/misc.json` |
| Rival markers | `public/data/rivals.json` |
| Marker icons logic | `src/components/Map/icons.js` |
| Popup HTML templates | `src/components/Map/PlaylistLayer.jsx` |
| Sidebar layout | `src/components/Sidebar/Sidebar.jsx` |
| Filter state logic | `src/hooks/useFilters.js` |
| Countdown date | `src/components/Sidebar/CountdownTimer.jsx` |
