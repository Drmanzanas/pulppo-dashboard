import React from 'react';

type LocationBadgeProps = {
  city: string;
  state: string;
  neighborhood: string;
};

const LocationBadge: React.FC<LocationBadgeProps> = ({ city, state, neighborhood }) => (
  <div className="inline-flex flex-col items-start bg-gray-100 p-2 rounded-md">
    <span className="text-sm font-bold text-gray-800">{city}</span>
    <span className="text-xs text-gray-600">{neighborhood}, {state}</span>
  </div>
);

export default LocationBadge;