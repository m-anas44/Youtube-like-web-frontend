import React from "react";
import Header from "./components/layout/Header";
import { NavigationBar } from "./components/layout/NavigationBar";
import { Outlet } from "react-router-dom";
import useSidebarToggle from "./context/sideBarToggle";

const Layout = () => {
  const { isOpen } = useSidebarToggle(); // Get the sidebar state

  return (
    <div className="dark:bg-[#0f0f0f] dark:text-[#f1f1f1] text-[#0f0f0f] min-h-screen">
      <Header />
      <div className="flex h-full">
        <NavigationBar />
        {/* Main content area should adjust based on the sidebar's state */}
        <div
          className={`transition-all duration-200 w-full ml-0 ${
            isOpen ? "md:ml-52" : "md:ml-14"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
