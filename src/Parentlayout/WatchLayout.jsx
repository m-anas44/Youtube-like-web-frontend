import React from "react";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";
// import useSidebarToggle from "../context/sideBarToggle";

const WatchLayout = () => {
//   const { isOpen } = useSidebarToggle(); // Get the sidebar state

  return (
    <div className="dark:bg-[#0f0f0f] dark:text-[#f1f1f1] text-[#0f0f0f] min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default WatchLayout;
