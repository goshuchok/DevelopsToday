import { useState, useEffect } from 'react';

export function useVehicleModels(makeId, year) {
  const [vehicleModels, setVehicleModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchVehicleModels() {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        const data = await response.json();
        if (!ignore) {
          setVehicleModels(data.Results);
        }
      } catch (error) {
        if (!ignore) {
          setError('Failed to fetch vehicle models. Please try again later.');
        }
      }
    }

    fetchVehicleModels();

    return () => {
      ignore = true;
    };
  }, [makeId, year]);

  return { vehicleModels, error };
}