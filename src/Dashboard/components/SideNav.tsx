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
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/store/userStore";
import { signOut } from "firebase/auth";
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
  ];
  const setUserName = useUserStore((state) => state.setUserName);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserName(""); // Clear the user's name in Zustand store
      window.location.href = "/"; // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="fixed h-screen w-[20%] bg-navbgprimary text-gray-300 flex flex-col border-r border-[#1F1F20] ">
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
                  : "px-2 py-4  text-primary-color"
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
      <div className="p-4">
        <NavLink
          to="/dashboard/logout"
          className="flex rounded-lg gap-2 px-2 py-4 text-primary-color bg-[#1F1F20]"
        >
          <div className="flex items-center gap-2 " onClick={handleLogout}>
            <span className="mt-0.5">
              <LogOut size={20} />
            </span>
            <span>Log Out</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
