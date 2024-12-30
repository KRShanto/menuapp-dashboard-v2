import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import ApprovalEdit from "../sidebar-components/ApprovalEdit";
import DiscountAdd from "../sidebar-components/DiscountAdd";
import DiscountEdit from "../sidebar-components/DiscountEdit";
import ManagerAdd from "../sidebar-components/ManagerAdd";
import ManagerEdit from "../sidebar-components/ManagerEdit";
import MenuAdd from "../sidebar-components/MenuAdd";
import SettingsLang from "../sidebar-components/SettingsLang";
import SettingsUpdate from "../sidebar-components/SettingsUpdate";
import MenuEdit from "../sidebar-components/MenuEdit";

export default function AppSidebar() {
  const { sidebarType } = useSidebar();

  console.log("Opened sidebar: ", sidebarType);

  return (
    <Sidebar side="right" className="mt-[58px] sm:h-[90%] md:h-[94%] z-50">
      {sidebarType === "MENU_ADD" && <MenuAdd />}
      {sidebarType === "MENU_EDIT" && <MenuEdit />}
      {sidebarType === "SETTINGS_UPDATE" && <SettingsUpdate />}
      {sidebarType === "SETTINGS_LANG" && <SettingsLang />}
      {sidebarType === "MANAGER_ADD" && <ManagerAdd />}
      {sidebarType === "MANAGER_EDIT" && <ManagerEdit />}
      {sidebarType === "APPROVAL_EDIT" && <ApprovalEdit />}
      {sidebarType === "DISCOUNT_ADD" && <DiscountAdd />}
      {sidebarType === "DISCOUNT_EDIT" && <DiscountEdit />}
    </Sidebar>
  );
}
