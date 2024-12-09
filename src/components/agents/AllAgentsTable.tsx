'use client';

import React, { useState, useEffect } from 'react';
import DynamicTable from '@/components/tables/DynamicTable';
import Heading from '@/components/ui/Heading';
import SearchInput from '../ui/SearchInput';
import TableText from '../ui/TableText';
import Chip from '../ui/Chip';
import EmailCell from '../ui/cells/EmailCell';
import NameCell from '../ui/cells/NameCell';
import useAgents from 'src/hooks/useAgents';
import ProfilePictureCell from '../ui/cells/ProfilePictureCell';

const AllAgentsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const { agents, loading, hasMore, loadMore, resetPagination } = useAgents(
    debouncedSearchTerm
  );

  useEffect(() => {
    resetPagination();
  }, [searchTerm]);

   useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const columns = [
    {
      header: 'Name',
      key: 'name',
      renderHeader: () => (
        <TableText primary="Name" secondary="Agent's Full Name" />
      ),
      render: (value: string) => <NameCell value={value} />,
    },
    {
      header: 'Email',
      key: 'email',
      renderHeader: () => (
        <TableText primary="Email" secondary="Contact Email" />
      ),
      render: (value: string) =>
        value !== 'N/A' ? (
          <EmailCell value={value} />
        ) : (
          <EmailCell value={'No Email'} />
        ),
    },
    {
      header: 'Phone',
      key: 'phone',
      renderHeader: () => (
        <TableText primary="Phone" secondary="Contact Number" />
      ),
      render: (value: string) => (
        <Chip
          label={value !== 'N/A' ? value : 'No Phone'}
          variant={value !== 'N/A' ? 'neutral' : 'error'}
        />
      ),
    },
    {
        header: 'Profile Picture',
        key: 'profilePicture',
        renderHeader: () => (
          <TableText primary="Profile Picture" secondary="Agent's Photo" />
        ),
        render: (value: string) => <ProfilePictureCell value={value} />
      },
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
        data={agents}
        columns={columns}
        loading={!agents.length}
        title="All Agents"
        tableConfig={{
          enableScroll: true,
          minWidth: 'min-w-[800px]',
        }}
      />
      {hasMore && (
        <div className="flex justify-center mt-4">
            <button
            onClick={loadMore}
            className={`px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
            >
            {loading ? (
                <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
                </span>
            ) : (
                'Load More'
            )}
            </button>
        </div>
        )}
    </div>
  );
};

export default AllAgentsTable;