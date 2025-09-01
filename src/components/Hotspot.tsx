
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface HotspotProps {
  x: number; // percentage
  y: number; // percentage
  title: string;
  description?: string;
}

export const Hotspot: React.FC<HotspotProps> = ({
  x,
  y,
  title,
  description
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="hotspot"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      {/* Animated Pulse Rings */}
      <div className="hotspot-pulse animate-ripple" style={{ animationDelay: '0s' }} />
      <div className="hotspot-pulse animate-ripple" style={{ animationDelay: '0.5s' }} />
      
      {/* Hotspot Indicator */}
      <div className="hotspot-indicator hover:scale-110 transition-transform cursor-pointer">
        <AlertTriangle className="w-5 h-5 text-white" />
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[200px] max-w-[300px]">
            <div className="text-sm font-semibold text-gray-900 mb-1">
              {title}
            </div>
            {description && (
              <div className="text-xs text-gray-600">
                {description}
              </div>
            )}
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
