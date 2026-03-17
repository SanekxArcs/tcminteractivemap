import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { challengeIcons } from './icons';

export default function ChallengeLayer({
  challengesData,
  activeChallenge,
  onMarkerClick,
}) {
  const map = useMap();
  const groupRef = useRef(null);

  useEffect(() => {
    if (!groupRef.current) {
      groupRef.current = L.featureGroup({ pane: "challenges" }).addTo(map);
    }
  }, [map]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    group.clearLayers();

    if (!activeChallenge || !challengesData || !challengesData[activeChallenge])
      return;

    const markers = challengesData[activeChallenge];
    markers.forEach((m) => {
      const icon = challengeIcons[m.icon] || challengeIcons.challenge;
      const marker = L.marker([m.lat, m.lng], { icon, pane: "challenges" })
        .bindTooltip(m.name, {
          direction: "top",
          offset: [0, -12],
          className: "map-tooltip",
        })
        .addTo(group);

      marker.on("click", () => {
        onMarkerClick({
          type: "challenge",
          name: m.name,
          subtitle: `Challenge · ${activeChallenge.toUpperCase()}`,
        });
      });
    });
  }, [activeChallenge, challengesData, onMarkerClick]);

  return null;
}
