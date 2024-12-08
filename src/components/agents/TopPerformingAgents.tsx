'use client';

import React from 'react';
import Heading from '@/components/ui/Heading';
import useTopPerformingAgents from 'src/hooks/useTopPerformingAgents';
import TableText from '../ui/TableText';
import DynamicTable from '../tables/DynamicTable';
import NameCell from '../ui/cells/NameCell';
import EmailCell from '../ui/cells/EmailCell';
import PhoneCell from '../ui/cells/PhoneCell';
import ProfilePictureCell from '../ui/cells/ProfilePictureCell';

const TopPerformingAgents: React.FC = () => {
  const { topAgents, loading } = useTopPerformingAgents();

  
const columns = [
    {
      header: 'Name',
      key: 'name',
      renderHeader: () => <TableText primary="Name" secondary="Agent's Full Name" />,
      render: (value: string) => <NameCell value={value} />,
    },
    {
      header: 'Email',
      key: 'email',
      renderHeader: () => <TableText primary="Email" secondary="Contact Email" />,
      render: (value: string) => <EmailCell value={value} />,
    },
    {
      header: 'Phone',
      key: 'phone',
      renderHeader: () => <TableText primary="Phone" secondary="Contact Number" />,
      render: (value: string) => <PhoneCell value={value} />,
    },
    {
      header: 'Profile Picture',
      key: 'profilePicture',
      renderHeader: () => <TableText primary="Profile Picture" secondary="Agent's Photo" />,
      render: (value: string) => <ProfilePictureCell value={value} />,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg">
      <Heading>Top Performing Agents</Heading>
      <DynamicTable
        data={topAgents || []}
        columns={columns}
        loading={loading}
        title="Top Agents"
        tableConfig={{
          enableScroll: true,
          minWidth: 'min-w-[600px]',
        }}
      />
    </div>
  );
};

export default TopPerformingAgents;