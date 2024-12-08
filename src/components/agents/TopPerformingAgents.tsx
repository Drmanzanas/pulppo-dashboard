'use client';

import React from 'react';

import Heading from '@/components/ui/Heading';
import AgentCard from '../ui/agents/AgentCard';
import useTopPerformingAgents from 'src/hooks/useTopPerformingAgents';

const TopPerformingAgents: React.FC = () => {
  const { topAgents, loading } = useTopPerformingAgents();

  console.log(topAgents)
  if (loading) {
    return <div>Loading Top Performing Agents...</div>;
  }

  return (
    <div>
      <Heading>Top Performing Agents</Heading>
      <div className="grid grid-cols-5 gap-4">
        {topAgents?.map((agent) => (
          <AgentCard
            key={agent.id}
            name={agent.name}
            email={agent.email}
            phone={agent.phone}
            profilePicture={agent.profilePicture}
          />
        ))}
      </div>
    </div>
  );
};

export default TopPerformingAgents;