import React from "react";
import useSidebarToggle from "../../context/sideBarToggle";
import { menuItems } from "../../mock/menuItems";

export const NavigationBar = () => {
  const { isOpen } = useSidebarToggle();

  return (
    <>
      {/* Sidebar for screens md and larger */}
      <aside
        className={`${
          isOpen ? "w-52" : "w-16"
        } fixed left-0 top-0 h-full bg-transparent hidden md:block`}
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
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <span
                    className={`ms-3 transition-opacity duration-200 ${
                      isOpen ? "block" : "hidden"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Bottom navigation bar for screens smaller than md */}
      <div className="fixed z-50 h-16 w-full px-4 bg-white border-t border-gray-200 bottom-0 left-1/2 transform -translate-x-1/2 dark:bg-[#0f0f0f] dark:border-zinc-700 md:hidden mx-auto">
        <div className="flex h-full justify-between max-w-lg mx-auto">
          {menuItems.slice(0, 5).map((item, index) => (
            <button
              key={index}
              type="button"
              className="inline-flex flex-col items-center justify-center px-3 group gap-y-1"
            >
              <span className="text-xl sm:text-2xl">{item.icon}</span>
              <span className="text-[10px] sm:text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
