import React from 'react';
import { createPortal } from 'react-dom';

const Tooltip = ({ content, children }: { content: string; children: React.ReactNode }) => {
  const [hovered, setHovered] = React.useState(false);
  const [position, setPosition] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setPosition({ top: rect.top + window.scrollY - 30, left: rect.left + rect.width / 2 });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      {hovered &&
        createPortal(
          <div
            ref={tooltipRef}
            style={{ top: position.top, left: position.left }}
            className="absolute transform -translate-x-1/2 bg-black text-white text-sm p-2 rounded z-50"
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;