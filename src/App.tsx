import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./Auth/components/AuthPage";

import DashBoard from "./Dashboard/components/DashBoard";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashBoard/>}></Route>
      </Routes>
    </Router>
  );
}
