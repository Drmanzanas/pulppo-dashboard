import { useState, useEffect } from 'react';
import { Agent } from 'src/types/types';



const useAgents = (
  searchTerm: string = '',
  initialPage: number = 1,
  limit: number = 10
) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/agents/getAll?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();

        setAgents((prevAgents) =>
          page === 1 ? data : [...prevAgents, ...data]
        );
        setHasMore(data.length === limit);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [searchTerm, page, limit]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const resetPagination = () => {
    setPage(1);
    setAgents([]);
  };

  return { agents, loading, hasMore, loadMore, resetPagination };
};

export default useAgents;