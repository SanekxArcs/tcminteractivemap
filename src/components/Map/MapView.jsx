import { useEffect } from 'react';
import { MapContainer, ImageOverlay, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import PlaylistLayer from "./PlaylistLayer";
import MiscLayer from "./MiscLayer";
import ChallengeLayer from "./ChallengeLayer";
import DevCoordinatePicker from "../Dev/DevCoordinatePicker";
import { PLAYLISTS } from "../../data/playlistConfig";

const IS_DEV_MODE = new URLSearchParams(window.location.search).has("dev");

// Map bounds match the image dimensions (see legacy/static/js/map.js)
const BOUNDS = [
  [0, 0],
  [3579, 6707],
];
const EXPANDED_BOUNDS = [
  [-3000, -4000],
  [6579, 10707],
];

function MapSetup() {
  const map = useMap();
  useEffect(() => {
    map.setMaxBounds(EXPANDED_BOUNDS);
    map.createPane("challenges");
    map.getPane("challenges").style.zIndex = 600;
    map.createPane("challenges-popup");
    map.getPane("challenges-popup").style.zIndex = 700;
  }, [map]);
  return null;
}

export default function MapView({
  playlistData,
  miscData,
  rivalsData,
  challengesData,
  filters,
  activeChallenge,
  onMarkerClick,
}) {
  return (
    <MapContainer
      id="map"
      crs={L.CRS.Simple}
      minZoom={-4}
      maxZoom={4}
      zoomSnap={0.25}
      attributionControl={false}
      zoomControl={false}
      bounds={BOUNDS}
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        background: "rgb(70,70,70)",
      }}
    >
      <MapSetup />
      <ZoomControl position="bottomright" />
      <ImageOverlay url="/img/oahu_maui.webp" bounds={BOUNDS} />

      {PLAYLISTS.map((p) => (
        <PlaylistLayer
          key={p.id}
          data={playlistData[p.id] || null}
          filters={filters}
          onMarkerClick={onMarkerClick}
        />
      ))}

      <MiscLayer
        miscData={miscData}
        rivalsData={rivalsData}
        filters={filters}
      />

      <ChallengeLayer
        challengesData={challengesData}
        activeChallenge={activeChallenge}
      />

      {IS_DEV_MODE && <DevCoordinatePicker />}
    </MapContainer>
  );
}
