import { useEffect, useRef, useState, useMemo } from 'react';
import { useMap, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { zipSync, strToU8 } from 'fflate';
import { PLAYLISTS } from '../../data/playlistConfig';

const MAP_BOUNDS     = [[0, 0], [3246, 4209]];
const OLD_MAP_BOUNDS = [[0, 0], [3579, 6707]];

// Colour per marker category
const TYPE_COLORS = {
  container:    '#FFD700',
  events:       '#EF4444',
  feats:        '#F97316',
  photoOps:     '#22C55E',
  collectibles: '#3B82F6',
  misc:         '#A855F7',
  rival:        '#06B6D4',
  challenge:    '#EC4899',
};

// ─── flatten all data sources into a uniform point list ──────────────────────

function flattenAllPoints(playlistData, miscData, rivalsData, challengesData) {
  const points = [];

  // Playlists
  PLAYLISTS.forEach(p => {
    const data = playlistData[p.id];
    if (!data) return;

    if (data.container != null) {
      points.push({
        key: `playlist::${p.id}::container`,
        lat: data.container.lat,
        lng: data.container.lng,
        label: `${p.name} · Container`,
        type: 'container',
        color: TYPE_COLORS.container,
      });
    }

    ['events', 'feats', 'photoOps', 'collectibles'].forEach(cat => {
      (data[cat] || []).forEach((item, i) => {
        points.push({
          key: `playlist::${p.id}::${cat}::${i}`,
          lat: item.lat,
          lng: item.lng,
          label: item.name || `${p.name} ${cat} #${i + 1}`,
          type: cat,
          color: TYPE_COLORS[cat] || '#fff',
        });
      });
    });
  });

  // Misc (grand_race, demo_royale, etc.)
  if (miscData) {
    Object.entries(miscData).forEach(([cat, arr]) => {
      (arr || []).forEach((item, i) => {
        points.push({
          key: `misc::${cat}::${i}`,
          lat: item.lat,
          lng: item.lng,
          label: item.name || item.location || cat,
          type: 'misc',
          color: TYPE_COLORS.misc,
        });
      });
    });
  }

  // Rivals
  if (rivalsData) {
    Object.entries(rivalsData).forEach(([gang, arr]) => {
      (arr || []).forEach((item, i) => {
        points.push({
          key: `rivals::${gang}::${i}`,
          lat: item.lat,
          lng: item.lng,
          label: item.name ? `${item.name} (${gang})` : gang,
          type: 'rival',
          color: TYPE_COLORS.rival,
        });
      });
    });
  }

  // Challenges
  if (challengesData) {
    Object.entries(challengesData).forEach(([challengeName, arr]) => {
      (arr || []).forEach((item, i) => {
        points.push({
          key: `challenges::${challengeName}::${i}`,
          lat: item.lat,
          lng: item.lng,
          label: item.name ? `${item.name} (${challengeName})` : challengeName,
          type: 'challenge',
          color: TYPE_COLORS.challenge,
        });
      });
    });
  }

  return points;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function makeIcon(color, changed = false) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:10px;height:10px;border-radius:50%;
      background:${color};
      border:${changed ? '2px solid #fff' : '1.5px solid rgba(0,0,0,0.7)'};
      box-sizing:border-box;cursor:grab;
    "></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });
}

function downloadZIP(filename, files) {
  // files: { 'path/name.json': stringContent }
  const entries = {};
  Object.entries(files).forEach(([name, content]) => {
    entries[name] = strToU8(content);
  });
  const zipped = zipSync(entries);
  const blob = new Blob([zipped], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── component ───────────────────────────────────────────────────────────────

export default function DevCalibrationLayer({ playlistData, miscData, rivalsData, challengesData }) {
  const map = useMap();
  const panelRef    = useRef(null);
  const markersRef  = useRef({});   // key → L.marker
  const changesRef  = useRef({});   // key → {lat, lng}  (only moved points)
  const originalRef = useRef({});   // key → {lat, lng}  (immutable originals)

  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [changedCount, setChangedCount]     = useState(0);
  const [minimized, setMinimized]           = useState(false);
  const [offsetLat, setOffsetLat]           = useState('0');
  const [offsetLng, setOffsetLng]           = useState('0');
  const [visibleTypes, setVisibleTypes]     = useState(() => new Set(Object.keys(TYPE_COLORS)));
  const markerTypesRef = useRef({});  // key → type string

  const allPoints = useMemo(
    () => flattenAllPoints(playlistData, miscData, rivalsData, challengesData),
    [playlistData, miscData, rivalsData, challengesData],
  );

  // Disable map interaction on the panel
  useEffect(() => {
    if (panelRef.current) {
      L.DomEvent.disableClickPropagation(panelRef.current);
      L.DomEvent.disableScrollPropagation(panelRef.current);
    }
  }, []);

  // Create draggable markers
  useEffect(() => {
    const created = {};

    allPoints.forEach(pt => {
      originalRef.current[pt.key]  = { lat: pt.lat, lng: pt.lng };
      markerTypesRef.current[pt.key] = pt.type;

      const marker = L.marker([pt.lat, pt.lng], {
        icon: makeIcon(pt.color),
        draggable: true,
        zIndexOffset: 1000,
      });

      marker.bindTooltip(pt.label, {
        direction: 'top',
        offset: [0, -8],
        className: 'map-tooltip',
      });

      marker.on('dragend', e => {
        const { lat, lng } = e.target.getLatLng();
        changesRef.current[pt.key] = {
          lat: parseFloat(lat.toFixed(6)),
          lng: parseFloat(lng.toFixed(6)),
        };
        marker.setIcon(makeIcon(pt.color, true));
        setChangedCount(Object.keys(changesRef.current).length);
      });

      marker.addTo(map);
      created[pt.key] = marker;
    });

    markersRef.current = created;
    return () => {
      Object.values(created).forEach(m => m.remove());
      markersRef.current = {};
    };
  }, [allPoints, map]);

  // ── Show/hide markers when visibleTypes changes ───────────────────────────
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([key, marker]) => {
      const type = markerTypesRef.current[key];
      if (visibleTypes.has(type)) {
        if (!marker._map) marker.addTo(map);
      } else {
        if (marker._map) marker.remove();
      }
    });
  }, [visibleTypes, map]);

  // ── Apply a global lat/lng offset to visible points only ─────────────────
  function applyGlobalOffset() {
    const dLat = parseFloat(offsetLat) || 0;
    const dLng = parseFloat(offsetLng) || 0;
    if (dLat === 0 && dLng === 0) return;

    allPoints.forEach(pt => {
      if (!visibleTypes.has(pt.type)) return;   // skip hidden types
      const marker  = markersRef.current[pt.key];
      if (!marker) return;
      const current = changesRef.current[pt.key] || { lat: pt.lat, lng: pt.lng };
      const newLat  = parseFloat((current.lat + dLat).toFixed(6));
      const newLng  = parseFloat((current.lng + dLng).toFixed(6));
      changesRef.current[pt.key] = { lat: newLat, lng: newLng };
      marker.setLatLng([newLat, newLng]);
      marker.setIcon(makeIcon(pt.color, true));
    });

    setChangedCount(Object.keys(changesRef.current).length);
    setOffsetLat('0');
    setOffsetLng('0');
  }

  // ── Toggle a single type ──────────────────────────────────────────────────
  function toggleType(type) {
    setVisibleTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type); else next.add(type);
      return next;
    });
  }

  // ── Reset all markers to original positions ───────────────────────────────
  function resetAll() {
    allPoints.forEach(pt => {
      const marker = markersRef.current[pt.key];
      if (!marker) return;
      const orig = originalRef.current[pt.key];
      marker.setLatLng([orig.lat, orig.lng]);
      marker.setIcon(makeIcon(pt.color, false));
    });
    changesRef.current = {};
    setChangedCount(0);
  }

  // ── Download corrected JSON files as a single ZIP ─────────────────────────
  function handleExport() {
    const changes = changesRef.current;
    if (Object.keys(changes).length === 0) {
      alert('No changes to export.');
      return;
    }

    const zipFiles = {};

    // Playlist files
    PLAYLISTS.forEach(p => {
      const data = playlistData[p.id];
      if (!data) return;

      const prefix      = `playlist::${p.id}::`;
      const fileChanges = Object.entries(changes).filter(([k]) => k.startsWith(prefix));
      if (fileChanges.length === 0) return;

      const updated = JSON.parse(JSON.stringify(data));
      fileChanges.forEach(([key, pos]) => {
        const parts = key.split('::');
        if (parts[2] === 'container') {
          updated.container.lat = pos.lat;
          updated.container.lng = pos.lng;
        } else {
          const cat = parts[2];
          const idx = parseInt(parts[3], 10);
          if (updated[cat]?.[idx]) {
            updated[cat][idx].lat = pos.lat;
            updated[cat][idx].lng = pos.lng;
          }
        }
      });
      zipFiles[`playlists/${p.id}.json`] = JSON.stringify(updated, null, 2);
    });

    // misc.json
    if (miscData) {
      const fileChanges = Object.entries(changes).filter(([k]) => k.startsWith('misc::'));
      if (fileChanges.length > 0) {
        const updated = JSON.parse(JSON.stringify(miscData));
        fileChanges.forEach(([key, pos]) => {
          const parts = key.split('::');
          const cat   = parts[1];
          const idx   = parseInt(parts[2], 10);
          if (updated[cat]?.[idx]) {
            updated[cat][idx].lat = pos.lat;
            updated[cat][idx].lng = pos.lng;
          }
        });
        zipFiles['misc.json'] = JSON.stringify(updated, null, 2);
      }
    }

    // rivals.json
    if (rivalsData) {
      const fileChanges = Object.entries(changes).filter(([k]) => k.startsWith('rivals::'));
      if (fileChanges.length > 0) {
        const updated = JSON.parse(JSON.stringify(rivalsData));
        fileChanges.forEach(([key, pos]) => {
          const parts = key.split('::');
          const gang  = parts[1];
          const idx   = parseInt(parts[2], 10);
          if (updated[gang]?.[idx]) {
            updated[gang][idx].lat = pos.lat;
            updated[gang][idx].lng = pos.lng;
          }
        });
        zipFiles['rivals.json'] = JSON.stringify(updated, null, 2);
      }
    }

    // challenges.json
    if (challengesData) {
      const fileChanges = Object.entries(changes).filter(([k]) => k.startsWith('challenges::'));
      if (fileChanges.length > 0) {
        const updated = JSON.parse(JSON.stringify(challengesData));
        fileChanges.forEach(([key, pos]) => {
          const parts         = key.split('::');
          const challengeName = parts[1];
          const idx           = parseInt(parts[2], 10);
          if (updated[challengeName]?.[idx]) {
            updated[challengeName][idx].lat = pos.lat;
            updated[challengeName][idx].lng = pos.lng;
          }
        });
        zipFiles['challenges.json'] = JSON.stringify(updated, null, 2);
      }
    }

    const count = Object.keys(zipFiles).length;
    downloadZIP(`calibration-export.zip`, zipFiles);
    // Show count in alert so user knows what's inside
    alert(`Downloaded calibration-export.zip with ${count} file(s).`);
  }

  // ── Styles helpers ────────────────────────────────────────────────────────
  const panel = {
    position: 'fixed',
    top: '10px',
    right: '60px',
    background: 'rgba(15,15,15,0.95)',
    color: '#fff',
    borderRadius: '8px',
    padding: minimized ? '8px 12px' : '14px',
    zIndex: 2000,
    minWidth: '250px',
    fontSize: '13px',
    fontFamily: 'sans-serif',
    border: '1px solid #555',
    boxShadow: '0 4px 16px rgba(0,0,0,0.7)',
    userSelect: 'none',
  };

  const btn = (bg) => ({
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 0',
    cursor: 'pointer',
    fontSize: '12px',
    flex: 1,
  });

  const numInput = {
    width: '100%',
    background: '#2a2a2a',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '3px',
    padding: '3px 6px',
    fontSize: '12px',
    boxSizing: 'border-box',
  };

  return (
    <>
      {/* Old map as semi-transparent overlay — uses OLD bounds to preserve its original aspect ratio */}
      <ImageOverlay
        url="/img/oahu_maui.webp"
        bounds={OLD_MAP_BOUNDS}
        opacity={overlayOpacity}
        zIndex={300}
      />

      {/* Control panel */}
      <div ref={panelRef} style={panel}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: minimized ? 0 : '12px' }}>
          <span style={{ fontWeight: 'bold', color: '#F97316', fontSize: '14px' }}>🗺 Calibration Mode</span>
          <button
            onClick={() => setMinimized(m => !m)}
            style={{ background: '#444', color: '#fff', border: 'none', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer', fontSize: '12px' }}
          >
            {minimized ? '▼' : '▲'}
          </button>
        </div>

        {!minimized && (
          <>
            {/* Old map overlay opacity */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', color: '#aaa', fontSize: '12px' }}>
                Old map overlay: {Math.round(overlayOpacity * 100)}%
              </label>
              <input
                type="range" min={0} max={1} step={0.05}
                value={overlayOpacity}
                onChange={e => setOverlayOpacity(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            {/* Global offset */}
            <div style={{ marginBottom: '12px', borderTop: '1px solid #333', paddingTop: '10px' }}>
              <div style={{ color: '#aaa', fontSize: '12px', marginBottom: '6px' }}>Offset (moves visible types only):</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '2px' }}>↕ Lat</label>
                  <input type="number" step="any" value={offsetLat} onChange={e => setOffsetLat(e.target.value)} style={numInput} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '2px' }}>↔ Lng</label>
                  <input type="number" step="any" value={offsetLng} onChange={e => setOffsetLng(e.target.value)} style={numInput} />
                </div>
              </div>
              <button
                onClick={applyGlobalOffset}
                style={{ ...btn('#7C3AED'), width: '100%', flex: 'unset' }}
              >
                Apply offset to visible types
              </button>
            </div>

            {/* Actions */}
            <div style={{ borderTop: '1px solid #333', paddingTop: '10px' }}>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: changedCount > 0 ? '#22C55E' : '#888' }}>
                {changedCount} / {allPoints.length} points moved
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={resetAll} style={btn('#6B7280')}>Reset all</button>
                <button onClick={handleExport} style={btn('#22C55E')}>Export JSONs</button>
              </div>
            </div>

            {/* Type visibility checkboxes */}
            <div style={{ marginTop: '10px', borderTop: '1px solid #333', paddingTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: '#aaa' }}>Visible types:</span>
                <span style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setVisibleTypes(new Set(Object.keys(TYPE_COLORS)))}
                    style={{ background: '#444', color: '#ccc', border: 'none', borderRadius: '3px', padding: '1px 7px', cursor: 'pointer', fontSize: '11px' }}
                  >All</button>
                  <button
                    onClick={() => setVisibleTypes(new Set())}
                    style={{ background: '#444', color: '#ccc', border: 'none', borderRadius: '3px', padding: '1px 7px', cursor: 'pointer', fontSize: '11px' }}
                  >None</button>
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {Object.entries(TYPE_COLORS).map(([type, color]) => {
                  const checked = visibleTypes.has(type);
                  const count   = allPoints.filter(p => p.type === type).length;
                  return (
                    <label
                      key={type}
                      style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer',
                               opacity: checked ? 1 : 0.4, fontSize: '12px', userSelect: 'none' }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleType(type)}
                        style={{ accentColor: color, cursor: 'pointer', width: '13px', height: '13px', flexShrink: 0 }}
                      />
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: color, flexShrink: 0, display: 'inline-block' }} />
                      <span style={{ flex: 1 }}>{type}</span>
                      <span style={{ color: '#666', fontSize: '11px' }}>{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
