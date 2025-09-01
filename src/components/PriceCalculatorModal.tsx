
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PriceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceCalculatorModal: React.FC<PriceCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [invites, setInvites] = useState(50);
  const [duration, setDuration] = useState(12);

  // Calculate total based on invites and duration
  const calculateTotal = () => {
    const baseRate = 150; // Base rate per invite per month
    return Math.round(invites * duration * baseRate);
  };

  const totalAmount = calculateTotal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Event Calculator</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-2">
          {/* Number of Invites */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Number of Invites</label>
              <span className="text-lg font-semibold text-purple-600">{invites}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="10"
                max="500"
                value={invites}
                onChange={(e) => setInvites(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((invites - 10) / (500 - 10)) * 100}%, #e5d4ff ${((invites - 10) / (500 - 10)) * 100}%, #e5d4ff 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10</span>
                <span>500</span>
              </div>
            </div>
          </div>

          {/* Duration of Event */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Duration of Event</label>
              <span className="text-lg font-semibold text-purple-600">{duration} Months</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="24"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((duration - 1) / (24 - 1)) * 100}%, #e5d4ff ${((duration - 1) / (24 - 1)) * 100}%, #e5d4ff 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Month</span>
                <span>24 Months</span>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-teal-600">₹ {totalAmount.toLocaleString()}</span>
              <span className="text-sm text-gray-600">total cost</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
