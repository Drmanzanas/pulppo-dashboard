import React from 'react';

type AgentInfoProps = {
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  loading?: boolean;
};

const AgentInfo = ({ name, email, phone, profilePicture, loading }: AgentInfoProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center p-4 border rounded-md space-y-4">
        <div className="w-20 h-20 bg-gray-200 animate-pulse rounded-full"></div>
        <div className="space-y-2 w-full text-center">
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded mx-auto"></div>
          <div className="w-32 h-3 bg-gray-200 animate-pulse rounded mx-auto"></div>
          <div className="w-28 h-3 bg-gray-200 animate-pulse rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 border rounded-md space-y-4">
      <div className="w-20 h-20">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={name || 'Agent'}
            className="w-full h-full object-cover rounded-full border border-gray-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full text-gray-600">
            <span className="text-sm">N/A</span>
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="font-semibold text-gray-800 text-lg break-words">{name || 'Unknown'}</p>
        <p className="text-sm text-gray-600 break-words">{email || 'No Email'}</p>
        <p className="text-sm text-gray-600 break-words">{phone || 'No Phone'}</p>
      </div>
    </div>
  );
};

export default AgentInfo;