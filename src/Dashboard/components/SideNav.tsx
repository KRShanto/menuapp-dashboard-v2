import React from "react";
import {
  Menu,
  Percent,
  ThumbsUp,
  Users2,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { NavItem } from "../../Dashboard/components/NavItem";

export function SideNav() {
  const menuItems = [
    { icon: <Menu size={20} />, text: "Menu List" },
    { icon: <Percent size={20} />, text: "Discount" },
    { icon: <ThumbsUp size={20} />, text: "Menu Approval" },
    { icon: <Users2 size={20} />, text: "Manager Management" },
    { icon: <MessageSquare size={20} />, text: "Feedback" },
    { icon: <Settings size={20} />, text: "Settings" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-300 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
          <span className="text-lg font-semibold">Restaurant</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            text={item.text}
            // isActive={index === 0}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <NavItem icon={<LogOut size={20} />} text="Logout" />
      </div>
    </div>
  );
}
