
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Eye, EyeOff } from 'lucide-react';
import { HotspotToggle } from './HotspotToggle';
import { Hotspot } from './Hotspot';

interface HotspotData {
  id: string;
  x: number; // percentage
  y: number; // percentage
  frameIndex: number; // which frame this hotspot appears on
  title: string;
  description?: string;
}

interface ThreeSixtyViewerProps {
  images: string[];
  hotspots?: HotspotData[];
  className?: string;
}

export const ThreeSixtyViewer: React.FC<ThreeSixtyViewerProps> = ({
  images,
  hotspots = [],
  className = ""
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const rotationRef = useRef(0);
  const imagesLoadedRef = useRef(0);

  // Preload images
  useEffect(() => {
    if (images.length > 0) {
      setIsLoading(true);
      imagesLoadedRef.current = 0;
      
      const loadPromises = images.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            imagesLoadedRef.current++;
            console.log(`Loaded image ${index + 1}/${images.length}`);
            if (imagesLoadedRef.current === images.length) {
              setIsLoading(false);
              console.log('All images loaded');
            }
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            imagesLoadedRef.current++;
            if (imagesLoadedRef.current === images.length) {
              setIsLoading(false);
            }
            resolve();
          };
          img.src = src;
        });
      });
    }
  }, [images]);

  const calculateFrameFromRotation = (rotation: number) => {
    // Normalize rotation to 0-360 range
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    // Calculate frame based on rotation (360 degrees / number of images)
    const frameFloat = (normalizedRotation / 360) * images.length;
    return Math.floor(frameFloat) % images.length;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!is360Mode || isLoading) return;
    
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !is360Mode || isLoading) return;

    const deltaX = e.clientX - startXRef.current;
    
    // Improved sensitivity - each pixel of drag equals degrees of rotation
    const sensitivity = 1; // 1 pixel = 1 degree
    const rotationDelta = deltaX * sensitivity;
    
    rotationRef.current += rotationDelta;
    
    const newFrame = calculateFrameFromRotation(rotationRef.current);
    setCurrentFrame(newFrame);
    
    // Update start position for next move
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!is360Mode || isLoading) return;
    
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !is360Mode || isLoading) return;
    e.preventDefault();

    const deltaX = e.touches[0].clientX - startXRef.current;
    
    const sensitivity = 1;
    const rotationDelta = deltaX * sensitivity;
    
    rotationRef.current += rotationDelta;
    
    const newFrame = calculateFrameFromRotation(rotationRef.current);
    setCurrentFrame(newFrame);
    
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const activate360Mode = () => {
    if (isLoading) return;
    setIs360Mode(true);
    rotationRef.current = (currentFrame / images.length) * 360;
    console.log('360 mode activated');
  };

  const resetView = () => {
    setCurrentFrame(0);
    setIs360Mode(false);
    setIsDragging(false);
    rotationRef.current = 0;
    console.log('View reset');
  };

  const getVisibleHotspots = () => {
    return hotspots.filter(hotspot => {
      if (!is360Mode && hotspot.frameIndex === 0) return true;
      
      // Show hotspots for current frame and adjacent frames
      const tolerance = 2;
      const distance = Math.abs(hotspot.frameIndex - currentFrame);
      const wrappedDistance = Math.min(distance, images.length - distance);
      
      return wrappedDistance <= tolerance;
    });
  };

  const getCursorClass = () => {
    if (!is360Mode || isLoading) return '';
    if (isDragging) return 'cursor-grabbing';
    return 'cursor-grab';
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-600">Loading 360° view...</p>
          </div>
        </div>
      )}

      {/* Image Display */}
      <div 
        ref={containerRef}
        className={`relative w-full h-full select-none ${getCursorClass()}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`360 view frame ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${
              index === currentFrame ? 'opacity-100' : 'opacity-0'
            }`}
            draggable={false}
            style={{ pointerEvents: 'none' }}
          />
        ))}

        {/* Hotspots */}
        {showHotspots && getVisibleHotspots().map((hotspot) => (
          <Hotspot
            key={hotspot.id}
            x={hotspot.x}
            y={hotspot.y}
            title={hotspot.title}
            description={hotspot.description}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10">
        <HotspotToggle
          enabled={showHotspots}
          onChange={setShowHotspots}
        />
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        {is360Mode && (
          <Button
            onClick={resetView}
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white border border-gray-200"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
        
        {!is360Mode && !isLoading && (
          <Button
            onClick={activate360Mode}
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
          >
            <Eye className="w-4 h-4 mr-2" />
            Click to view 360°
          </Button>
        )}
      </div>

      {/* Frame Indicator */}
      {is360Mode && (
        <div className="absolute bottom-4 left-4 z-10">
          <div className="bg-white/90 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
            {currentFrame + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Debug Info */}
      {is360Mode && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
            Frame: {currentFrame} | Rotation: {Math.round(rotationRef.current)}°
          </div>
        </div>
      )}
    </div>
  );
};
