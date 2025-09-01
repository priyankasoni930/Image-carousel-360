
import React, { useState } from 'react';
import { ThreeSixtyViewer } from '@/components/ThreeSixtyViewer';
import { ImageCarousel } from '@/components/ImageCarousel';
import { CarOverviewSection } from '@/components/CarOverviewSection';
import { Button } from '@/components/ui/button';

// Real car images from Spinny - 10 different angles for proper 360° view
const carImages = [
  'https://mda.spinny.com/sp-file-system/public/2024-10-27/41a8a8b2a63b414d81c687c80d30ede2/raw/file.JPG?q=85&w=320',
  'https://mda.spinny.com/sp-file-system/public/2024-10-27/41a8a8b2a63b414d81c687c80d30ede2/raw/file.JPG?q=85&w=320',
  'https://mda.spinny.com/sp-file-system/public/2024-10-27/953c9ed5b8e24caea1816de9beb6f53d/raw/file.JPG?q=85&w=320',
  'https://mda.spinny.com/sp-file-system/public/2024-10-27/e7fb987326e3465dbbf6782dccee4d2c/raw/file.JPG?q=85&w=320',
  'https://mda.spinny.com/sp-file-system/public/2024-10-27/e7fb987326e3465dbbf6782dccee4d2c/raw/file.JPG?q=85&w=320',
  'https://mda.spinny.com/sp-file-system/public/2024-10-27/8d7b4bc2fdcf4188a934178e9d8cd167/raw/file.JPG?q=85&w=320',
  'https://mda.spinny.com/sp-file-system/public/2024-10-27/6eee2a4ff0cf411eac08bc7560dc8e08/raw/file.JPG?q=85&w=320',
  'https://mda.spinny.com/sp-file-system/public/2024-10-27/6eee2a4ff0cf411eac08bc7560dc8e08/raw/file.JPG?q=85&w=320',
  'https://mda.spinny.com/sp-file-system/public/2024-10-27/7bda23a875de4550b17b006ba26bc30e/raw/file.JPG?q=85&w=320',
  'https://mda.spinny.com/sp-file-system/public/2024-10-27/3bad01e406f9439684e5672e5c5bfdfd/raw/file.JPG?q=85&w=320'
];

// Sample hotspot data
const hotspots = [
  {
    id: 'front-damage',
    x: 47.1,
    y: 53.1,
    frameIndex: 0,
    title: 'Minor Scratch',
    description: 'Small scratch on front bumper - cosmetic damage only'
  },
  {
    id: 'door-dent',
    x: 79.9,
    y: 48.2,
    frameIndex: 0,
    title: 'Door Dent',
    description: 'Small dent on passenger door'
  },
  {
    id: 'rear-damage',
    x: 94.9,
    y: 59.4,
    frameIndex: 5,
    title: 'Rear Panel',
    description: 'Minor damage to rear panel'
  }
];

// Car data
const carData = {
  model: '2021 Mahindra Thar LX 4WD',
  year: 2021,
  mileage: '25,000 km',
  price: '₹14,50,000',
  fuelType: 'Diesel',
  transmission: 'Manual'
};

const Index = () => {
  const [is360Mode, setIs360Mode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Image Viewer */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <div className="inline-block">
                  <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
                    SOLD OUT
                  </span>
                </div>
                <Button
                  onClick={() => setIs360Mode(!is360Mode)}
                  variant={is360Mode ? "default" : "outline"}
                  className={`${is360Mode ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                >
                  {is360Mode ? '📷 Gallery' : '🔄 360° View'}
                </Button>
              </div>
              
              <div className="aspect-[4/3] relative">
                {is360Mode ? (
                  <ThreeSixtyViewer 
                    images={carImages}
                    hotspots={hotspots}
                    className="w-full h-full"
                  />
                ) : (
                  <ImageCarousel images={carImages} />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Car Details */}
          <div className="space-y-6">
            <CarOverviewSection car={carData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
