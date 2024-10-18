import { useState, useRef } from "react";
import { IoSearch, IoArrowBack } from "react-icons/io5";
import { RiVideoUploadLine } from "react-icons/ri";
import {
  MdOutlineBrightness6,
  MdMenu,
  MdOutlineDarkMode,
} from "react-icons/md";
import useTheme from "../../context/switcher";
import useSidebarToggle from "../../context/sideBarToggle";
import DropdownMenu from "../DropdownMenu";

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [changeTheme, setChangeTheme] = useState(true);
  const [menuToogle, setMenuToogle] = useState(true);

  const { lightMode, darkMode } = useTheme();
  const toggleTheme = () => {
    setChangeTheme(!changeTheme);
    changeTheme ? darkMode() : lightMode();
  };

  const searchInputRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const { toggleSidebar } = useSidebarToggle();
  const toogleMenu = () => {
    setMenuToogle(!menuToogle);
    toggleSidebar();
  };

  return (
    <header className="px-4 py-2 flex items-center justify-between gap-x-3 sticky w-full top-0 z-10 bg-white dark:bg-[#0f0f0f] backdrop-blur-lg bg-opacity-80 dark:bg-opacity-90">
      {!isSearchActive && (
        <>
          {/* Left: Logo and Menu Button */}
          <div className="flex items-center space-x-4 dark:text-white">
            <button type="button" onClick={() => toogleMenu()}>
              <MdMenu className="text-3xl cursor-pointer" />
            </button>
            <div className="text-xl font-bold">YouTube</div>
          </div>

          {/* Center: Search Bar for Larger Screens */}
          <div className="flex-grow max-w-md mx-auto hidden sm:block">
            <div ref={searchInputRef} className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white dark:bg-[#0f0f0f] dark:text-white text-[#0f0f0f] p-2 pl-4 pr-12 rounded-full focus:outline-none border border-gray-600 dark:border-zinc-700"
              />
              <button className="absolute right-2 top-2 px-1 dark:text-white text-[#0f0f0f]">
                <IoSearch className="text-2xl" />
              </button>
            </div>
          </div>

          {/* Right: Icons and Buttons */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Icon */}
            <button
              className="sm:hidden dark:text-white text-[#0f0f0f] p-2"
              onClick={toggleSearch}
            >
              <IoSearch className="text-2xl" />
            </button>
            <button>
              <RiVideoUploadLine className="text-2xl" title="Upload video"/>
            </button>
            <button
              className="dark:text-white text-[#0f0f0f] p-2 rounded-full"
              onClick={toggleTheme}
            >
              {changeTheme ? (
                <MdOutlineDarkMode className="text-2xl" />
              ) : (
                <MdOutlineBrightness6 className="text-2xl" />
              )}
            </button>

            {/* Header dropdown */}
            <DropdownMenu />
          </div>
        </>
      )}

      {/* Mobile Search Bar Mode */}
      {isSearchActive && (
        <div className="w-full flex items-center justify-between">
          <button
            className="dark:text-white text-[#0f0f0f] p-2"
            onClick={() => setIsSearchActive(false)}
          >
            <IoArrowBack className="text-2xl" />
          </button>
          <div className="flex-grow mx-auto">
            <div ref={searchInputRef} className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent dark:text-white text-[#0f0f0f] p-2 pl-4 pr-12 rounded-full focus:outline-none border border-zinc-700"
              />
              <button className="absolute right-2 top-2 px-1 dark:text-white text-[#0f0f0f]">
                <IoSearch className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
