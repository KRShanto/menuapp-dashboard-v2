import React from "react";

interface DividerProps {
  direction: "horizontal" | "vertical";
  size: number;
  isDragging: boolean;
  onMouseDown: () => void;
}

const Divider = ({
  direction,
  size,
  isDragging,
  onMouseDown,
}: DividerProps) => {
  const dividerClasses =
    direction === "horizontal"
      ? "cursor-row-resize h-1 w-full "
      : "cursor-col-resize w-1 h-full ";

  const formatRatio = (percentage: number) => {
    if (Math.abs(percentage - 50) < 0.5) {
      return "1/2";
    }
    // Check if it's close 1/4
    if (Math.abs(percentage - 25) < 0.5) {
      return "1/4";
    }
    // Check if it's close 3/4
    if (Math.abs(percentage - 75) < 0.5) {
      return "3/4";
    }

    return `${Math.round(percentage)}% : ${Math.round(100 - percentage)}%`;
  };

  return (
    <div
      className={`${dividerClasses} bg-gray-800 transition-colors relative group ${
        isDragging ? "bg-gray-400" : "black"
      }`}
      onMouseDown={onMouseDown}
    >
      <div
        className={`
        absolute ${
          direction === "horizontal"
            ? "left-32 top-1/2 -translate-y-1/2"
            : "top-2 left-1/2 -translate-x-1/2 rotate-90"
        }
        bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity
        pointer-events-none whitespace-nowrap z-50
      `}
      >
        {formatRatio(size)}
      </div>
    </div>
  );
};

export default Divider;
