'use client';

import React from 'react';

type ChipProps = {
  label: string;
  variant?: 'success' | 'error' | 'neutral';
};

const Chip = ({ label, variant = 'neutral' }: ChipProps) => {
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    neutral: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
};

export default Chip;