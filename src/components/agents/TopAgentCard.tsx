'use client';

import React from 'react';
import AgentInfo from '@/components/ui/agents/AgentInfo';
import Heading from '@/components/ui/Heading';
import useTopPerformingAgents from 'src/hooks/useTopPerformingAgents';

const TopAgentCard: React.FC = () => {
  const { topAgents, loading } = useTopPerformingAgents();
  const topAgent = topAgents?.[0];

  return (
    <div className="p-4 border rounded-lg bg-white">
      <Heading>Top Agent</Heading>
      <AgentInfo
        loading={loading}
        name={topAgent?.name}
        email={topAgent?.email}
        phone={topAgent?.phone}
        profilePicture={topAgent?.profilePicture}
      />
    </div>
  );
};

export default TopAgentCard;