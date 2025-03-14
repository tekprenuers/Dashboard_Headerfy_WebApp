import React from "react";
import Sidebr from "./Sideber";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import TemplateDrawer from "../Components/TemplateDrawer";

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebr />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="flex-1 relative bg-gray-100">
          <TemplateDrawer />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
