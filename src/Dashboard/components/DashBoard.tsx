import { SideNav } from "./SideNav";
import { Outlet } from "react-router-dom";

export default function DashBoard() {
  return (
    <div className="flex h-screen">
      <SideNav />
      {/* Main Content Area */}
      <div className="flex-1 bg-green-800 p-6">
        <Outlet />
      </div>
    </div>
  );
}
