
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PriceCalculatorModal } from './PriceCalculatorModal';

interface CarOverviewSectionProps {
  car: {
    model: string;
    year: number;
    mileage: string;
    price: string;
    fuelType: string;
    transmission: string;
  };
}

export const CarOverviewSection: React.FC<CarOverviewSectionProps> = ({ car }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {car.model}
        </h1>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Price</span>
            <span className="text-xl font-bold text-orange-600">{car.price}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Year</span>
              <span className="font-medium">{car.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mileage</span>
              <span className="font-medium">{car.mileage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Type</span>
              <span className="font-medium">{car.fuelType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transmission</span>
              <span className="font-medium">{car.transmission}</span>
            </div>
          </div>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
          >
            Calculate Event Price
          </Button>
        </div>
      </div>

      <PriceCalculatorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
