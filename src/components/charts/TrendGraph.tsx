/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const TrendGraph: React.FC = () => {
  const [chartData, setChartData] = useState<{ label: string; count: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const calculateWeekDays = (startDate: Date) => {
    const days = [];
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push({
        date: day.toISOString().split('T')[0], 
        label: `${daysOfWeek[day.getDay()]} (${day.getDate()} ${monthsOfYear[day.getMonth()]})`,
      });
    }
    return days;
  };

  const generateMonthDays = (month: number, year: number) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push({
        date: date.toISOString().split('T')[0],
        label: `${date.getDate()} ${monthsOfYear[month]}`,
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const generateYearMonths = () => {
    return monthsOfYear.map((month, index) => ({
      month: index + 1,
      label: month,
    }));
  };

  const getDateRange = (): { startDate: Date; endDate: Date } => {
    if (filterType === 'week') {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return { startDate: startOfWeek, endDate: endOfWeek };
    } else if (filterType === 'month') {
      const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
      return { startDate, endDate };
    } else if (filterType === 'year') {
      const startDate = new Date(selectedDate.getFullYear(), 0, 1);
      const endDate = new Date(selectedDate.getFullYear(), 11, 31);
      return { startDate, endDate };
    }
  
    const today = new Date();
    return { startDate: today, endDate: today };
  };

  const formatChartData = (data: any[], range: any[], key: 'day' | 'month') => {
    return range.map((item) => {
      const matchingData = data.reduce((sum: number, record: any) => {
        if (key === 'day' && record._id.day === parseInt(item.date.split('-')[2])) {
          return sum + record.count;
        }
        if (key === 'month' && record._id.month === item.month) {
          return sum + record.count;
        }
        return sum;
      }, 0);
      return { ...item, count: matchingData };
    });
  };

  const fetchChartData = async () => {
    setLoading(true);

    const { startDate, endDate } = getDateRange();

    try {
      const response = await fetch('/api/properties/by-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate: startDate.toISOString(), endDate: endDate.toISOString() }),
      });
      const data = await response.json();

      let formattedData = [];
      if (filterType === 'week') {
        const weekDays = calculateWeekDays(startDate);
        formattedData = formatChartData(data, weekDays, 'day');
      } else if (filterType === 'month') {
        const monthDays = generateMonthDays(selectedDate.getMonth(), selectedDate.getFullYear());
        formattedData = formatChartData(data, monthDays, 'day');
      } else if (filterType === 'year') {
        const yearMonths = generateYearMonths();
        formattedData = formatChartData(data, yearMonths, 'month');
      }
      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchChartData();
  }, [filterType, selectedDate]);

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mx-2 rounded text-gray-800 ${
            filterType === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilterType('week')}
        >
          Week
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded text-gray-800 ${
            filterType === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilterType('month')}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded text-gray-800 ${
            filterType === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilterType('year')}
        >
          Year
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border rounded px-4 py-2"
        />
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} properties`} />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendGraph;