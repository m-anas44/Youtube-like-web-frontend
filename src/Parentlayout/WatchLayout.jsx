import React from "react";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

const WatchLayout = () => {
  return (
    <div className="dark-bg-primary dark-text-primary light-text-primary min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default WatchLayout;
