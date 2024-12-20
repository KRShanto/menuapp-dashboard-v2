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

import { NavLink } from "react-router-dom";
import AlBaharat from "../../assets/icons/albaharat.svg?react";
export function SideNav() {
  const menuItems = [
    { icon: <Menu size={20} />, text: "Menu List", path: "/dashboard" },
    {
      icon: <Percent size={20} />,
      text: "Discount",
      path: "/dashboard/discount",
    },
    {
      icon: <ThumbsUp size={20} />,
      text: "Menu Approval",
      path: "/dashboard/menu-approval",
    },
    {
      icon: <Users2 size={20} />,
      text: "Manager Management",
      path: "/dashboard/manager-management",
    },
    {
      icon: <MessageSquare size={20} />,
      text: "Feedback",
      path: "/dashboard/feedback",
    },
    {
      icon: <Settings size={20} />,
      text: "Settings",
      path: "/dashboard/settings",
    },
    {
      icon: <LogOut size={20} />,
      text: "Log Out",
      path: "/dashboard/logout",
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-300 flex flex-col">
      <div className="flex items-center justify-center py-4">
        <AlBaharat className="w-10 h-10" />
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <div key={item.text}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "flex rounded-lg gap-2 bg-primary-color text-black px-2 py-4 "
                  : " px-2 py-4  text-primary-color"
              }
              end={item.path === "/dashboard"}
            >
              <div className="flex items-center gap-2">
                <span className="mt-0.5">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            </NavLink>
          </div>
        ))}
      </nav>
    </div>
  );
}
