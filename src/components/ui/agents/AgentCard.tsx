'use client';

import React from 'react';

const AgentCard: React.FC<{
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
}> = ({ name, email, phone, profilePicture }) => {
  return (
    <div className="p-4 border rounded-lg bg-white flex flex-col items-center">
      <div className="w-20 h-20 mb-4">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={name}
            className="rounded-full object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="text-center">
        <h4 className="font-semibold text-lg">{name}</h4>
        <p className="text-sm text-gray-500">{email}</p>
        <p className="text-sm text-gray-500">{phone}</p>
      </div>
    </div>
  );
};

export default AgentCard;