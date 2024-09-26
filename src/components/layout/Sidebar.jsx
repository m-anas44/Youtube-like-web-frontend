import React from "react";
import useSidebarToggle from "../../context/sideBarToggle";
import { menuItems } from "../../mock/menuItems";

export const Sidebar = () => {
  const { isOpen } = useSidebarToggle();
  
  return (
    <aside
      className={`${
        isOpen ? "w-52" : "w-16"
      } fixed left-0 top-0 h-full bg-transparent`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium mt-14">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="text-2xl flex-shrink-0">
                  {item.icon}
                </span>
                <span
                  className={`ms-3 transition-opacity duration-200 ${isOpen ? "block" : "hidden"}`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
