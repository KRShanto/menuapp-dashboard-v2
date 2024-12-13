import React, { useState, useCallback } from "react";
import Divider from "./Divider";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: [React.ReactNode, React.ReactNode];
  className?: string;
}

const ResizeableContainer = ({
  direction,
  children,
  className = "",
}: ResizableProps) => {
  const [size, setSize] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      const container = e.currentTarget as HTMLDivElement;
      const rect = container.getBoundingClientRect();

      let percentage;
      if (direction === "horizontal") {
        percentage = ((e.clientY - rect.top) / rect.height) * 100;
      } else {
        percentage = ((e.clientX - rect.left) / rect.width) * 100;
      }
      percentage = Math.min(Math.max(percentage, 10), 90);
      setSize(percentage);
    },
    [isDragging, direction]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      className={`relative flex ${
        direction === "horizontal" ? "flex-col" : "flex-row"
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          [direction === "horizontal" ? "height" : "width"]: `${size}%`,
        }}
        className="relative"
      >
        {children[0]}
      </div>
      {/* shoing percentage change */}
      <Divider
        direction={direction}
        size={size}
        isDragging={isDragging}
        onMouseDown={handleMouseDown}
      />
      <div
        style={{
          [direction === "horizontal" ? "height" : "width"]: `${100 - size}%`,
        }}
        className="relative"
      >
        {children[1]}
      </div>
    </div>
  );
};

export default ResizeableContainer;
