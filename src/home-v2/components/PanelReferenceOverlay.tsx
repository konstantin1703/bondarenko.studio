import { useEffect, useState } from 'react';

export function PanelReferenceOverlay() {
  const [source, setSource] = useState('');
  const [opacity, setOpacity] = useState(0.42);
  const enabled = import.meta.env.DEV && new URLSearchParams(window.location.search).get('overlay') === '1';

  useEffect(() => {
    return () => {
      if (source) URL.revokeObjectURL(source);
    };
  }, [source]);

  if (!enabled) return null;

  return (
    <div className="reference-overlay">
      <div className="reference-overlay__controls">
        <label>
          <span>REFERENCE</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (!file) return;
              if (source) URL.revokeObjectURL(source);
              setSource(URL.createObjectURL(file));
            }}
          />
        </label>
        <label>
          <span>OPACITY {opacity.toFixed(2)}</span>
          <input
            type="range"
            min="0.25"
            max="0.6"
            step="0.01"
            value={opacity}
            onChange={(event) => setOpacity(Number(event.currentTarget.value))}
          />
        </label>
      </div>
      {source ? <img src={source} alt="" style={{ opacity }} /> : null}
    </div>
  );
}
