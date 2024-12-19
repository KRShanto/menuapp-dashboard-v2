import MainContent from "./MainContent";
import { SideNav } from "./SideNav";
export default function DashBoard() {
  return (
    <div className="flex h-screen">
      <SideNav />
      <MainContent />
    </div>
  );
}
