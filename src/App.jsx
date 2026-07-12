import { useState, useCallback, useRef } from 'react';
import { useFilters } from './hooks/useFilters';
import { useMapData } from './hooks/useMapData';
import MapView from './components/Map/MapView';
import Sidebar from './components/Sidebar/Sidebar';
import MarkerToast from './components/Toast/MarkerToast';
import challengesMeta from './data/challengesMeta.json';

export default function App() {
  const { filters, togglePlaylist, toggleActivity, toggleMisc, toggleRival,
          toggleRegions, toggleSection, hideAll, showAll } = useFilters();
  const { playlistData, miscData, rivalsData, challengesData, regionsData } = useMapData();

  const [challengesMode, setChallengesMode] = useState(false);
  const [activeChallenge, setActiveChallenge]  = useState(null);
  const [toastData, setToastData]              = useState(null);

  const mapRef = useRef(null);
  const handleMapReady = useCallback((map) => { mapRef.current = map; }, []);
  const flyTo = useCallback((lat, lng, zoom = 1) => {
    mapRef.current?.flyTo([lat, lng], zoom, { duration: 0.8 });
  }, []);

  const handleMarkerClick = useCallback((data) => setToastData(data), []);

  return (
    <>
      <MapView
        playlistData={playlistData}
        miscData={miscData}
        rivalsData={rivalsData}
        challengesData={challengesData}
        regionsData={regionsData}
        filters={filters}
        activeChallenge={activeChallenge}
        onMarkerClick={handleMarkerClick}
        onMapReady={handleMapReady}
      />
      <Sidebar
        filters={filters}
        onTogglePlaylist={togglePlaylist}
        onToggleActivity={toggleActivity}
        onToggleMisc={toggleMisc}
        onToggleRival={toggleRival}
        onToggleRegions={toggleRegions}
        onToggleSection={toggleSection}
        onHideAll={hideAll}
        onShowAll={showAll}
        challengesMode={challengesMode}
        onToggleChallengesMode={() => {
          setChallengesMode(m => !m);
          if (challengesMode) setActiveChallenge(null);
        }}
        challengesMeta={challengesMeta}
        onChallengeSelect={setActiveChallenge}
        activeChallenge={activeChallenge}
        playlistData={playlistData}
        miscData={miscData}
        rivalsData={rivalsData}
        challengesData={challengesData}
        regionsData={regionsData}
        flyTo={flyTo}
      />
      <MarkerToast data={toastData} onClose={() => setToastData(null)} />
    </>
  );
}
