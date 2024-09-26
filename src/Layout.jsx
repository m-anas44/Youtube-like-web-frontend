import React from "react";
import Header from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import useSidebarToggle from "./context/sideBarToggle";

const Layout = () => {
  const { isOpen } = useSidebarToggle(); // Get the sidebar state

  return (
    <div className="dark:bg-[#0f0f0f] dark:text-gray-200 text-[#0f0f0f]">
      <Header />
      <div className="flex">
        <Sidebar />
        {/* Main content area should adjust based on the sidebar's state */}
        <div
          className={`transition-all duration-200 pl-4 ${
            isOpen ? "ml-52" : "ml-14"
          } w-full`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
