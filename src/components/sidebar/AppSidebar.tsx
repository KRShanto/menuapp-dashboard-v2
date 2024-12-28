import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import MenuAdd from "../sidebar-components/MenuAdd";
import SettingsUpdate from "../sidebar-components/SettingsUpdate";
import SettingsLang from "../sidebar-components/SettingsLang";
import ManagerAdd from "../sidebar-components/ManagerAdd";
import MenuEdit from "../sidebar-components/MenuEdit";

export default function AppSidebar() {
  const { sidebarType } = useSidebar();

  console.log("Opened sidebar: ", sidebarType);

  return (
    <Sidebar side="right" className="mt-[58px] sm:h-[90%] md:h-[94%] z-50">
      {sidebarType === "MENU_ADD" && <MenuAdd />}
      {sidebarType === "SETTINGS_UPDATE" && <SettingsUpdate />}
      {sidebarType === "SETTINGS_LANG" && <SettingsLang />}
      {sidebarType === "MANAGER_ADD" && <ManagerAdd />}
      {sidebarType === "MENU_EDIT" && <MenuEdit />}
    </Sidebar>
  );
}
