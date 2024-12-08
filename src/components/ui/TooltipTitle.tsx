import React from 'react';
import Tooltip from './Tooltip';

const TooltipTitle = ({
  title,
  truncateLength = 20,
}: {
  title: string;
  truncateLength?: number;
}) => {
  const isTruncated = title.length > truncateLength;
  const truncatedTitle = isTruncated ? `${title.slice(0, truncateLength)}...` : title;

  return (
    <Tooltip content={title}>
      <span className="text-black">{truncatedTitle}</span>
    </Tooltip>
  );
};

export default TooltipTitle;