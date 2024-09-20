import { useState, useEffect, useRef } from "react";
import { IoSearch, IoArrowBack } from "react-icons/io5";
import {
  MdOutlineBrightness6,
  MdMenu,
  MdOutlineDarkMode,
} from "react-icons/md";
import avatar from "../../assets/Header/dropdownImage.jpg";
import "../../App.css";
import useTheme from "../../context/switcher";


const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [changeTheme, setChangeTheme] = useState(true);
  const { lightMode, darkMode } = useTheme();
  const toggleTheme = () => {
    setChangeTheme(!changeTheme);
    changeTheme ? darkMode() : lightMode();
  };

  const searchInputRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  // Collapse the search bar when clicking outside (only relevant for desktop view)
  useEffect(() => {
    if (!isSearchActive) return;

    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.closest(".search-button")
      ) {
        setIsSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchActive]);

  return (
    <header className="bg-white dark:bg-[#161616] px-4 py-2 flex items-center justify-between gap-x-3 fixed w-full top-0 z-10">
      {!isSearchActive && (
        <>
          {/* Left: Logo and Menu Button */}
          <div className="flex items-center space-x-4 dark:text-white text-[#161616]">
            <MdMenu className="text-3xl cursor-pointer" />
            <div className="text-xl font-bold">YouTube</div>
          </div>

          {/* Center: Search Bar for Larger Screens */}
          <div className="flex-grow max-w-md mx-auto hidden sm:block">
            <div ref={searchInputRef} className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white dark:bg-[#161616] dark:text-white text-[#161616] p-2 pl-4 pr-12 rounded-full focus:outline-none border border-gray-600 dark:border-gray-400"
              />
              <button className="absolute right-2 top-2 px-1 dark:text-white text-[#161616]">
                <IoSearch className="text-2xl" />
              </button>
            </div>
          </div>

          {/* Right: Icons and Buttons */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Icon (Moved here) */}
            <button
              className="sm:hidden search-button dark:text-white text-[#161616] p-2"
              onClick={toggleSearch}
            >
              <IoSearch className="text-2xl" />
            </button>

            <button
              className="dark:text-white text-[#161616] p-2 rounded-full"
              onClick={toggleTheme}
            >
              {changeTheme ? (
                <MdOutlineDarkMode className="text-2xl" />
              ) : (
                <MdOutlineBrightness6 className="text-2xl" />
              )}
            </button>

            {/* Header dropdown */}
            <div className="relative inline-block">
              <button
                id="dropdownInformationButton"
                onClick={toggleDropdown}
                className="flex items-center rounded-full align-middle"
                type="button"
              >
                <img
                  src={avatar}
                  alt="dropdown-img"
                  className="rounded-full w-9 h-9 object-cover"
                />
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  id="dropdownInformation"
                  className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-[#1e1e1e] dark:divide-gray-600"
                >
                  <div className="px-4 py-3 text-sm text-[#161616] dark:text-white">
                    <div>Bonnie Green</div>
                    <div className="font-medium truncate">
                      name@flowbite.com
                    </div>
                  </div>
                  <ul
                    className="py-2 text-sm text-[#161616] dark:text-gray-200"
                    aria-labelledby="dropdownInformationButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#222222] dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#222222] dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#222222] dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                  </ul>
                  <div className="py-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-[#222222] dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Mobile Search Bar Mode */}
      {isSearchActive && (
        <div className="w-full flex items-center justify-between">
          <button
            className="dark:text-white text-[#161616] p-2"
            onClick={() => setIsSearchActive(false)}
          >
            <IoArrowBack className="text-2xl" />
          </button>
          <div className="flex-grow mx-auto">
            <div ref={searchInputRef} className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white dark:bg-[#161616] dark:text-white text-[#161616] p-2 pl-4 pr-12 rounded-full focus:outline-none border border-gray-600"
              />
              <button className="absolute right-2 top-2 px-1 dark:text-white text-[#161616]">
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
