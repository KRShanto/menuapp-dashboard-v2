import React, { useState } from "react";

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
}

export function NavItem({ icon, text }: MenuItemProps) {
  const [isActive, setIsActive] = useState(false);
  const handleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
        isActive ? "bg-gray-800" : "hover:bg-gray-800"
      } mb-1`}
    >
      <button onClick={handleActive}>
        {icon}
        <span>{text}</span>
      </button>
    </div>
  );
}
