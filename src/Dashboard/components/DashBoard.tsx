import { SideNav } from "./SideNav";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function DashBoard() {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <div className="h-[80px] w-full bg-navbgprimary text-primary-color">
          <TopBar />
        </div>
        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-bgprimary">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
