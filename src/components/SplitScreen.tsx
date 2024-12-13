import { useState, useEffect } from "react";
import { getRandomColor } from "../utils/randomColor";
import SplitControl from "./SplitControl";
import ResizeableContainer from "./ResizeableContainer";

interface SplitPaneProps {
  parentColor?: string;
  onRemove?: () => void;
}

const SplitScreen = ({ parentColor, onRemove }: SplitPaneProps) => {
  const [split, setSplit] = useState<"none" | "horizontal" | "vertical">(
    "none"
  );
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [childColors, setChildColors] = useState<[string, string]>(["", ""]);

  useEffect(() => {
    setBackgroundColor(parentColor ?? getRandomColor());
  }, [parentColor]);

  const handleSplit = (direction: "horizontal" | "vertical") => {
    setChildColors([backgroundColor, getRandomColor()]);
    setSplit(direction);
  };

  const handleRemove = () => {
    setSplit("none");
  };

  if (split === "none") {
    return (
      <div
        className="w-full h-full flex items-center justify-center gap-4 border-4 border-black relative"
        style={{ backgroundColor }}
      >
        <SplitControl
          onSplitHorizontal={() => handleSplit("horizontal")}
          onSplitVertical={() => handleSplit("vertical")}
          onRemove={onRemove}
        />
      </div>
    );
  }

  //   const splitClass = split === "horizontal" ? "flex-col" : "flex-row";

  return (
    <ResizeableContainer direction={split} className="w-full h-full">
      <div className="w-full h-full">
        <SplitScreen parentColor={childColors[0]} onRemove={handleRemove} />
      </div>
      <div className="w-full h-full">
        <SplitScreen parentColor={childColors[1]} onRemove={handleRemove} />
      </div>
    </ResizeableContainer>
  );
};

export default SplitScreen;
