import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthPage from "./Auth/components/AuthPage";

import DashBoard from "./Dashboard/components/DashBoard";
import Discount from "./Dashboard/pages/Discount";
import Feedback from "./Dashboard/pages/Feedback";
import ManagerManagement from "./Dashboard/pages/ManagerManagement";
import MenuApproval from "./Dashboard/pages/MenuApproval";
import MenuList from "./Dashboard/pages/MenuList";
import Settings from "./Dashboard/pages/Settings";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashBoard />}>
          {/* the default route */}
          <Route index element={<MenuList />}></Route>
          {/* other routes */}
          <Route path="discount" element={<Discount />} />
          <Route path="menu-approval" element={<MenuApproval />} />
          <Route path="manager-management" element={<ManagerManagement />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
