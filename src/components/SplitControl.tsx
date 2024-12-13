import React from "react";

interface PaneControlsProps {
  onSplitHorizontal: () => void;
  onSplitVertical: () => void;
  onRemove?: () => void;
}

const SplitControl = ({
  onSplitHorizontal,
  onSplitVertical,
  onRemove,
}: PaneControlsProps) => {
  return (
    <div className="flex ">
      <button
        className="border border-gray-500 text-black bg-white rounded px-2"
        onClick={onSplitHorizontal}
      >
        h
      </button>
      <button
        className="border border-gray-500 text-black bg-white rounded px-2"
        onClick={onSplitVertical}
      >
        v
      </button>

      {onRemove && (
        <button
          className="border border-gray-500 text-black bg-white rounded px-2"
          onClick={onRemove}
        >
          -
        </button>
      )}
    </div>
  );
};

export default SplitControl;
