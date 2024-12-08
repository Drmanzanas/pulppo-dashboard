'use client';

import React from 'react';
import AgentInfo from '@/components/ui/agents/AgentInfo';
import Heading from '@/components/ui/Heading';

const TopAgentCard: React.FC = () => {
  const { topAgents, loading } = useTopPerformingAgents();
  const topAgent = topAgents?.[0];

  if (loading || !topAgent) {
    return <div>Loading Top Agent...</div>;
  }

  return (
    <div className="p-4 border rounded-lg bg-white">
      <Heading>Top Agent</Heading>
      <AgentInfo
        name={topAgent.name}
        email={topAgent.email}
        phone={topAgent.phone}
        profilePicture={topAgent.profilePicture}
      />
    </div>
  );
};

export default TopAgentCard;