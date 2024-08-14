"use client"
import VehicleModels from '../../../component/models/VehicleModels';

export default function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Vehicle Models for {year}</h1>
        <p>Make ID: {makeId}</p>
        <p>Year: {year}</p>
        <VehicleModels makeId={makeId} year={year} />
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}