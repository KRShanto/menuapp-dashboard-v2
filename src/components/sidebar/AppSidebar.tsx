import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import MenuAdd from "./MenuAdd";

export default function AppSidebar() {
  const { sidebarType } = useSidebar();

  console.log("Opened sidebar: ", sidebarType);

  return (
    <Sidebar side="right" className="mt-[4.6rem] h-[92%] z-50">
      {sidebarType === "MENU_ADD" && <MenuAdd />}
    </Sidebar>
  );
}
