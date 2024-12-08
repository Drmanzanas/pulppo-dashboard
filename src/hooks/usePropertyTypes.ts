import { useEffect, useState } from 'react';

export default function usePropertyTypes() {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/properties/types');
        const data = await response.json();
        setPropertyTypes(data);
      } catch (error) {
        console.error('Error fetching property types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyTypes();
  }, []);

  return { propertyTypes, loading };
}