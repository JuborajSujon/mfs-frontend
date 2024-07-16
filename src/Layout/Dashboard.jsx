import { useState } from "react";
import { Outlet } from "react-router-dom";
import ThemeController from "./../components/ThemeController/ThemeController";
import Sidebar from "../pages/Dashboard/components/Sidebar";
import DashboardNav from "../pages/Dashboard/components/DashboardNav";

const Dashboard = () => {
  const [isActive, setActive] = useState(false);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div className="h-screen flex max-w-[1540px] mx-auto">
      {/* Sidebar */}
      <div className="relative">
        <Sidebar handleToggle={handleToggle} isActive={isActive} />
      </div>

      {/* Dashboard dynamic content */}
      <div className="flex flex-col flex-grow overflow-hidden ">
        {/* navbar */}
        <DashboardNav handleToggle={handleToggle} isActive={isActive} />
        <div className="flex-grow p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
      <ThemeController />
    </div>
  );
};

export default Dashboard;
