import React, { useEffect, useMemo, useRef } from 'react';
import DynamicTable from './DynamicTable';
import Chip from '../ui/Chip';
import PriceTag from '../ui/PriceTag';
import LocationBadge from '../ui/LocationBadge';
import TooltipTitle from '../ui/TooltipTitle';
import TableText from '../ui/TableText';
import AgentInfo from '../ui/agents/AgentInfo';
import useInfiniteScroll from 'src/hooks/useInfiniteScroll';

const RecentProperties = () => {
  const { data, loading, loadMore, hasMore } = useInfiniteScroll('api/properties/recent');

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current || !hasMore || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMore();
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMore, loading]);

  const columns = useMemo(() => [
    {
      header: 'Title',
      key: 'title',
      renderHeader: () => <TableText primary="Title" secondary="Property Title" />,
      render: (value: string) => <TooltipTitle title={value || 'Unknown'} truncateLength={20} />,
    },
    {
      header: 'Price',
      key: 'price',
      renderHeader: () => <TableText primary="Price" secondary="In Currency" />,
      render: (value: number, row: { currency: string }) => <PriceTag price={value} currency={row.currency} />,
    },
    {
      header: 'Location',
      key: 'location',
      renderHeader: () => <TableText primary="Location" secondary="City, State, Neighborhood" />,
      render: (value: { city: string; state: string; neighborhood: string }) => (
        <LocationBadge city={value.city || 'Unknown'} state={value.state || 'Unknown'} neighborhood={value.neighborhood || 'Unknown'} />
      ),
    },
    {
      header: 'Agent',
      key: 'agent',
      renderHeader: () => <TableText primary="Agent" secondary="Name, Email, Phone" />,
      render: (value: { name: string; email: string; phone: string; profilePicture: string }) => (
        <AgentInfo
          name={value.name}
          email={value.email}
          phone={value.phone}
          profilePicture={value.profilePicture}
        />
      ),
    },
    {
      header: 'Status',
      key: 'status',
      renderHeader: () => <TableText primary="Status" secondary="Published/Cancelled" />,
      render: (value: string) => (
        <Chip
          label={value}
          variant={
            value === 'published'
              ? 'success'
              : value === 'cancelled'
              ? 'error'
              : 'neutral'
          }
        />),
    },
  ],[]);

  return (
    <div className="p-2">
      <div
        ref={scrollContainerRef}
        className="relative h-[800px] overflow-y-auto scroll-container"
      >
        <DynamicTable
          data={data}
          columns={columns}
          loading={!data.length}
          title="Recent Properties"
          tableConfig={{
            enableScroll: true,
            minWidth: 'min-w-[800px]'
          }}
        />
        {loading && hasMore && (
          <div className="h-10 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentProperties;