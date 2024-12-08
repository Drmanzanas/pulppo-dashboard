import { useEffect, useState } from 'react';

export default function useAgentProperties() {
  const [agentProperties, setAgentProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAgentProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/properties/agents');
        const data = await response.json();
        setAgentProperties(data);
      } catch (error) {
        console.error('Error fetching agent properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentProperties();
  }, []);

  return { agentProperties, loading };
}