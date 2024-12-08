import React from 'react';

type AgentInfoProps = {
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
};

const AgentInfo = ({ name, email, phone, profilePicture }: AgentInfoProps) => (
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12">
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
    <div>
      <p className="font-semibold text-gray-800">{name || 'Unknown'}</p>
      <p className="text-sm text-gray-600">{email || 'No Email'}</p>
      <p className="text-sm text-gray-600">{phone || 'No Phone'}</p>
    </div>
  </div>
);

export default AgentInfo;