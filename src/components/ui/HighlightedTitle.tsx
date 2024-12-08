import React from 'react';

type TitleProps = {
  title: string;
};

const HighlightedTitle: React.FC<TitleProps> = ({ title }) => (
  <div className="truncate text-gray-800 font-semibold text-sm">
    {title}
  </div>
);

export default HighlightedTitle;