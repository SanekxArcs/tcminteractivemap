import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { challengeIcons } from './icons';

export default function ChallengeLayer({ challengesData, activeChallenge }) {
  const map = useMap();
  const groupRef = useRef(null);

  useEffect(() => {
    if (!groupRef.current) {
      groupRef.current = L.featureGroup({ pane: 'challenges' }).addTo(map);
    }
  }, [map]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    group.clearLayers();

    if (!activeChallenge || !challengesData || !challengesData[activeChallenge]) return;

    const markers = challengesData[activeChallenge];
    markers.forEach(m => {
      const icon = challengeIcons[m.icon] || challengeIcons.challenge;
      L.marker([m.lat, m.lng], { icon, pane: 'challenges' })
        .bindPopup(`<b>${m.name}</b>`, { className: 'hstPopup', pane: 'challenges-popup' })
        .addTo(group);
    });
  }, [activeChallenge, challengesData]);

  return null;
}
