import { SideNav } from "./SideNav";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar";

export default function DashBoard() {
  return (
    <div className="flex h-screen">
      <SideNav />

      <div className="flex-1 flex flex-col">
        <div className="h-[80px] w-full bg-navbgprimary text-primary-color">
          <TopBar />
        </div>
        {/* Main Content Area */}
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <div className="flex-1 p-6 bg-bgprimary absolute ml-[20%] mt-[5%] h-[92%] w-[80%]">
            <Outlet />
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
