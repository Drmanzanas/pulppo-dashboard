import { useState } from 'react';
import { FilterLocation } from 'src/types/types';

const useFilters = () => {
  const [countries, setCountries] = useState<FilterLocation[]>([]);
  const [states, setStates] = useState<FilterLocation[]>([]); 
  const [cities, setCities] = useState<FilterLocation[]>([]); 
  const [loading, setLoading] = useState(false); 
  const [currencies, setCurrencies] = useState([]);


  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/filters/country');
      const data: FilterLocation[] = await response.json(); 
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async (countryId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/filters/states?countryId=${countryId}`);
      const data: FilterLocation[] = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async (stateId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/filters/cities?stateId=${stateId}`);
      const data: FilterLocation[] = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrencies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/filters/currencies`);
      const data = await response.json();
      setCurrencies(data);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    countries,
    states,
    cities,
    currencies,
    loading,
    fetchCountries,
    fetchStates,
    fetchCities,
    fetchCurrencies
  };
};

export default useFilters;