import React from "react";

const PagesLayout = () => {
  return (
    <div className="dark:bg-[#0f0f0f] dark:text-gray-200 text-[#0f0f0f]">
      <Header />
      <Outlet />
    </div>
  );
};

export default PagesLayout;
