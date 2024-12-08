'use client';

import { useState, useEffect } from 'react';

type Agent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
};

const useTopPerformingAgents = () => {
  const [topAgents, setTopAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopAgents = async () => {
    try {
      const response = await fetch('/api/agents/top');
      const data: Agent[] = await response.json();
      setTopAgents(data);
    } catch (error) {
      console.error('Error fetching top agents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopAgents();
  }, []);

  return { topAgents, loading };
};

export default useTopPerformingAgents;