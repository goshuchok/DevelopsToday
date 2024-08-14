"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

export default function FilterPage() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedModelYear, setSelectedModelYear] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const router = useRouter();

  // Fetch vehicle types on component mount
  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
        const data = await response.json();
        setVehicleTypes(data.Results);
        console.log(data)
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      }
    };
    fetchVehicleTypes();
  }, []);

  // Enable button if both selections are made
  useEffect(() => {
    setIsButtonEnabled(!!selectedVehicleType && !!selectedModelYear);
  }, [selectedVehicleType, selectedModelYear]);

  // Handle "Next" button click
  const handleNext = () => {
    if (isButtonEnabled) {
      router.push(`/result/${selectedVehicleType}/${selectedModelYear}`);
    }
  };

  // Generate model year options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Vehicle Filter</h1>

        {/* Vehicle Type Selector */}
        <div className="mb-4">
          <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
            Select Vehicle Type
          </label>
          <select
            id="vehicleType"
            className="mt-1 block w-full p-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            value={selectedVehicleType}
            onChange={(e) => setSelectedVehicleType(e.target.value)}
          >
            <option value="">Select a vehicle type...</option>
            {vehicleTypes.map((type) => (
              <option key={type.MakeId} value={type.MakeId}>
                {type.MakeName}
              </option>
            ))}
          </select>
        </div>

        {/* Model Year Selector */}
        <div className="mb-6">
          <label htmlFor="modelYear" className="block text-sm font-medium text-gray-700">
            Select Model Year
          </label>
          <select
            id="modelYear"
            className="mt-1 block w-full p-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            value={selectedModelYear}
            onChange={(e) => setSelectedModelYear(e.target.value)}
          >
            <option value="">Select a model year...</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Next Button */}
        <button
          className={`w-full p-2 rounded-md text-white ${isButtonEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'}`}
          disabled={!isButtonEnabled}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
