import { useEffect, useRef } from 'react';
import { MapContainer, ImageOverlay, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import PlaylistLayer from "./PlaylistLayer";
import MiscLayer from "./MiscLayer";
import ChallengeLayer from "./ChallengeLayer";
import RegionLayer from "./RegionLayer";
import DevCoordinatePicker from "../Dev/DevCoordinatePicker";
import DevCalibrationLayer from "../Dev/DevCalibrationLayer";
import { PLAYLISTS } from "../../data/playlistConfig";

const IS_DEV_MODE         = new URLSearchParams(window.location.search).has("dev");
const IS_CALIBRATION_MODE = new URLSearchParams(window.location.search).has("calibration");

const BOUNDS = [
  [0, 0],
  [3246, 4209],
];
const EXPANDED_BOUNDS = [
  [-2000, -2000],
  [5246, 6209],
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

function MapController({ onMapReady }) {
  const map = useMap();
  const cbRef = useRef(onMapReady);
  cbRef.current = onMapReady;
  useEffect(() => { cbRef.current(map); }, [map]);
  return null;
}

export default function MapView({
  playlistData,
  miscData,
  rivalsData,
  challengesData,
  regionsData,
  filters,
  activeChallenge,
  onMarkerClick,
  onMapReady,
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
      <MapController onMapReady={onMapReady} />
      <ZoomControl position="bottomright" />
      <ImageOverlay url="/img/oahu_maui-new.webp" bounds={BOUNDS} />

      {IS_CALIBRATION_MODE ? (
        <DevCalibrationLayer
          playlistData={playlistData}
          miscData={miscData}
          rivalsData={rivalsData}
          challengesData={challengesData}
        />
      ) : (
        <>
          <RegionLayer regions={regionsData} />

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
            onMarkerClick={onMarkerClick}
          />

          <ChallengeLayer
            challengesData={challengesData}
            activeChallenge={activeChallenge}
            onMarkerClick={onMarkerClick}
          />

          {IS_DEV_MODE && <DevCoordinatePicker />}
        </>
      )}
    </MapContainer>
  );
}
