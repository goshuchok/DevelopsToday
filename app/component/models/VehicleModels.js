"use client"

import { Suspense } from 'react';
import { useVehicleModels } from './useVehicleModels';

function VehicleModelsList({ makeId, year }) {
    const { vehicleModels, error } = useVehicleModels(makeId, year);
  
    if (error) return <div className="text-red-600">{error}</div>;
  
    return (
      <div>
        {vehicleModels.length === 0 ? (
          <p>No models found for the selected vehicle type and year.</p>
        ) : (
          <ul className="space-y-4">
            {vehicleModels.map((model) => (
              <li key={model.Model_ID} className="p-4 border border-gray-300 rounded-md text-black">
                <p><strong>Make ID:</strong> {model.Make_ID}</p>
                <p><strong>Make Name:</strong> {model.Make_Name}</p>
                <p><strong>Model ID:</strong> {model.Model_ID}</p>
                <p><strong>Model Name:</strong> {model.Model_Name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}

  export default function VehicleModels({ makeId, year }) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <VehicleModelsList makeId={makeId} year={year} />
      </Suspense>
    );
  }