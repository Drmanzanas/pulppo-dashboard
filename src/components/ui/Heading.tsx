import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, className = '' }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-800 mb-4 ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;