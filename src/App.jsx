import { useState, useCallback } from 'react';
import { useFilters } from './hooks/useFilters';
import { useMapData } from './hooks/useMapData';
import MapView from './components/Map/MapView';
import Sidebar from './components/Sidebar/Sidebar';
import MarkerToast from './components/Toast/MarkerToast';
import challengesMeta from './data/challengesMeta.json';

export default function App() {
  const { filters, togglePlaylist, toggleActivity, toggleMisc, toggleRival,
          toggleSection, hideAll, showAll } = useFilters();
  const { playlistData, miscData, rivalsData, challengesData } = useMapData();

  const [challengesMode, setChallengesMode] = useState(false);
  const [activeChallenge, setActiveChallenge]  = useState(null);
  const [toastData, setToastData]              = useState(null);

  const handleMarkerClick = useCallback((data) => setToastData(data), []);

  return (
    <>
      <MapView
        playlistData={playlistData}
        miscData={miscData}
        rivalsData={rivalsData}
        challengesData={challengesData}
        filters={filters}
        activeChallenge={activeChallenge}
        onMarkerClick={handleMarkerClick}
      />
      <Sidebar
        filters={filters}
        onTogglePlaylist={togglePlaylist}
        onToggleActivity={toggleActivity}
        onToggleMisc={toggleMisc}
        onToggleRival={toggleRival}
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
      />
      <MarkerToast data={toastData} onClose={() => setToastData(null)} />
    </>
  );
}
