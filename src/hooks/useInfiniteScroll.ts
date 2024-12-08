import { useState, useEffect } from 'react';

const useInfiniteScroll = (url = '', initialPage = 1, limit = 10) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (loading || !url) return;
    setLoading(true);

    try {
      const response = await fetch(`${url}?page=${page}&limit=${limit}`);
      const result = await response.json();

      if (result?.data) {
        setData((prevData) => [...prevData, ...result.data]);
        setHasMore(result.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, url]);

  const loadMore = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  return { data, loading, hasMore, loadMore };
};

export default useInfiniteScroll;