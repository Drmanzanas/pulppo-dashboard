'use client';

import React, { useState } from 'react';
import DynamicTable from '@/components/tables/DynamicTable';

import Heading from '@/components/ui/Heading';

const AllAgentsTable: React.FC = () => {
  const { agents, loading } = useAgents();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Phone', key: 'phone' },
    { header: 'Listings', key: 'listings' },
  ];

  return (
    <div>
      <Heading>All Agents</Heading>
      <SearchInput
        placeholder="Search agents by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <DynamicTable
        data={filteredAgents}
        columns={columns}
        loading={loading}
        title="All Agents"
        tableConfig={{
          enableScroll: true,
          minWidth: 'min-w-[800px]',
        }}
      />
    </div>
  );
};

export default AllAgentsTable;