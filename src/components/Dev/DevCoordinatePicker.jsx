import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { useMapEvents } from 'react-leaflet';

const POINT_TYPES = [
  { value: 'event',       label: 'Event' },
  { value: 'feat',        label: 'Feat' },
  { value: 'photoOp',     label: 'Photo Op' },
  { value: 'collectible', label: 'Collectible' },
  { value: 'container',   label: 'Container' },
  { value: 'misc',        label: 'Misc' },
  { value: 'challenge',   label: 'Challenge' },
];

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function DevCoordinatePicker() {
  const [points, setPoints]         = useState([]);
  const [activeType, setActiveType] = useState('event');
  const [copied, setCopied]         = useState(false);
  const [minimized, setMinimized]   = useState(false);
  const panelRef                    = useRef(null);

  // Prevent Leaflet from receiving native DOM events fired inside the panel
  useEffect(() => {
    if (panelRef.current) {
      L.DomEvent.disableClickPropagation(panelRef.current);
    }
  }, []);

  function handleMapClick(latlng) {
    setPoints(prev => [
      ...prev,
      {
        id: Date.now(),
        lat: parseFloat(latlng.lat.toFixed(6)),
        lng: parseFloat(latlng.lng.toFixed(6)),
        type: activeType,
        name: '',
      },
    ]);
  }

  function updateName(id, name) {
    setPoints(prev => prev.map(p => p.id === id ? { ...p, name } : p));
  }

  function removePoint(id) {
    setPoints(prev => prev.filter(p => p.id !== id));
  }

  function buildJson() {
    return JSON.stringify(
      points.map(({ lat, lng, name, type }) => {
        const base = { lat, lng };
        if (name) base.name = name;
        if (type === 'challenge') base.icon = 'start';
        return base;
      }),
      null,
      2
    );
  }

  function copyJson() {
    navigator.clipboard.writeText(buildJson()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <MapClickHandler onMapClick={handleMapClick} />

      <div ref={panelRef} style={styles.panel} role="dialog">
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.headerTitle}>⚙ Dev — Coordinate Picker</span>
          <button type="button" style={styles.minimizeBtn} onClick={() => setMinimized(m => !m)}>
            {minimized ? '▼' : '▲'}
          </button>
        </div>

        {!minimized && (
          <>
            {/* Type selector */}
            <div style={styles.typeRow}>
              <span style={styles.label}>Click adds:</span>
              <select
                value={activeType}
                onChange={e => setActiveType(e.target.value)}
                style={styles.select}
              >
                {POINT_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Points list */}
            <div style={styles.pointsList}>
              {points.length === 0 && (
                <div style={styles.empty}>Click the map to add points…</div>
              )}
              {points.map((p, i) => (
                <div key={p.id} style={styles.pointRow}>
                  <span style={styles.pointIndex}>{i + 1}</span>
                  <span style={styles.pointCoords}>
                    {p.lat}, {p.lng}
                  </span>
                  <span style={styles.pointType}>[{p.type}]</span>
                  <input
                    style={styles.nameInput}
                    placeholder="name…"
                    value={p.name}
                    onChange={e => updateName(p.id, e.target.value)}
                  />
                  <button type="button" style={styles.removeBtn} onClick={() => removePoint(p.id)}>✕</button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={styles.actions}>
              <button
                type="button"
                style={{ ...styles.btn, ...(copied ? styles.btnSuccess : {}) }}
                onClick={copyJson}
                disabled={points.length === 0}
              >
                {copied ? '✓ Copied!' : 'Copy JSON'}
              </button>
              <button
                type="button"
                style={{ ...styles.btn, ...styles.btnDanger }}
                onClick={() => setPoints([])}
                disabled={points.length === 0}
              >
                Clear ({points.length})
              </button>
            </div>

            {/* Preview */}
            {points.length > 0 && (
              <pre style={styles.preview}>{buildJson()}</pre>
            )}
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  panel: {
    position: 'fixed',
    top: '12px',
    right: '12px',
    zIndex: 9999,
    background: '#111',
    border: '1px solid #cc0000',
    borderRadius: '8px',
    width: '360px',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#ddd',
    boxShadow: '0 4px 20px rgba(0,0,0,0.8)',
    overflow: 'hidden',
  },
  header: {
    background: '#cc0000',
    padding: '6px 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'default',
    flexShrink: 0,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: '13px',
    color: 'white',
    letterSpacing: '0.5px',
  },
  minimizeBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0 4px',
  },
  typeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 10px',
    borderBottom: '1px solid #222',
    flexShrink: 0,
  },
  label: {
    color: '#888',
    whiteSpace: 'nowrap',
  },
  select: {
    background: '#222',
    color: '#ddd',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '3px 6px',
    fontSize: '12px',
    flex: 1,
  },
  pointsList: {
    overflowY: 'auto',
    flex: 1,
    padding: '4px 6px',
    maxHeight: '220px',
  },
  empty: {
    color: '#555',
    textAlign: 'center',
    padding: '16px',
    fontStyle: 'italic',
  },
  pointRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 0',
    borderBottom: '1px solid #1a1a1a',
  },
  pointIndex: {
    color: '#555',
    minWidth: '18px',
    textAlign: 'right',
  },
  pointCoords: {
    color: '#aad4ff',
    flex: '0 0 auto',
    fontSize: '11px',
  },
  pointType: {
    color: '#cc6600',
    flex: '0 0 auto',
    fontSize: '10px',
  },
  nameInput: {
    flex: 1,
    background: '#1a1a1a',
    border: '1px solid #333',
    color: '#ddd',
    borderRadius: '3px',
    padding: '2px 5px',
    fontSize: '11px',
    minWidth: 0,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '11px',
    padding: '0 2px',
    flexShrink: 0,
  },
  actions: {
    display: 'flex',
    gap: '8px',
    padding: '8px 10px',
    borderTop: '1px solid #222',
    flexShrink: 0,
  },
  btn: {
    flex: 1,
    background: '#333',
    border: '1px solid #555',
    color: '#ddd',
    borderRadius: '5px',
    padding: '5px 0',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background 0.15s',
  },
  btnSuccess: {
    background: '#1a4a1a',
    borderColor: '#2a8a2a',
    color: '#6fdd6f',
  },
  btnDanger: {
    background: '#3a1a1a',
    borderColor: '#aa3333',
    color: '#dd6666',
  },
  preview: {
    background: '#0a0a0a',
    borderTop: '1px solid #222',
    margin: 0,
    padding: '8px 10px',
    fontSize: '10px',
    color: '#888',
    overflowX: 'auto',
    maxHeight: '140px',
    overflowY: 'auto',
    flexShrink: 0,
  },
};
