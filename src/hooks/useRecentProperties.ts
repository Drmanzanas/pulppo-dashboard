import { useEffect, useState } from 'react';

export default function useRecentProperties() {
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecentProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/properties/recent');
        const data = await response.json();
        setRecentProperties(data);
      } catch (error) {
        console.error('Error fetching recent properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProperties();
  }, []);

  return { recentProperties, loading };
}