
import React from 'react';

interface HotspotToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const HotspotToggle: React.FC<HotspotToggleProps> = ({
  enabled,
  onChange
}) => {
  return (
    <div className="toggle-container">
      <div className="flex items-center gap-2">
        <div className="toggle-dot" />
        <span className="text-sm font-medium text-gray-700">Hotspots</span>
      </div>
      
      <button
        type="button"
        className="toggle-switch"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
      >
        <span className="toggle-slider" />
      </button>
    </div>
  );
};
