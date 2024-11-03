import { useState, useRef } from "react";
import { IoSearch, IoArrowBack } from "react-icons/io5";
import { RiVideoUploadLine } from "react-icons/ri";
import { MdMenu } from "react-icons/md";
import useSidebarToggle from "../../context/sideBarToggle";
import DropdownMenu from "../DropdownMenu";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [menuToggle, setMenuToggle] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const { toggleSidebar } = useSidebarToggle();
  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
    toggleSidebar();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="px-4 py-2 flex items-center justify-between gap-x-3 sticky w-full top-0 z-10 bg-white dark:bg-[#0f0f0f] backdrop-blur-lg bg-opacity-80 dark:bg-opacity-90">
      {!isSearchActive && (
        <>
          {/* Left: Logo and Menu Button */}
          <div className="flex items-center space-x-4 dark-text-primary">
            <button type="button" onClick={() => toggleMenu()}>
              <MdMenu className="text-3xl cursor-pointer" />
            </button>
            <div className="text-xl font-bold">YouTube</div>
          </div>

          {/* Center: Search Bar for Larger Screens */}
          <div className="flex-grow max-w-md mx-auto hidden sm:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent light-text-primary dark-text-primary p-1.5 pl-4 pr-12 rounded-full focus:outline-none border border-gray-700 placeholder:text-gray-700"
              />
              <button type="submit" className="absolute right-2 top-2 px-1 light-text-primary dark-text-primary">
                <IoSearch className="text-2xl" />
              </button>
            </form>
          </div>

          {/* Right: Icons and Buttons */}
          <div className="flex items-center sm:gap-x-3 bg-transparent">
            {/* Mobile Search Icon */}
            <button className="sm:hidden light-text-primary dark-text-primary p-2" onClick={toggleSearch}>
              <IoSearch className="text-2xl" />
            </button>
            <Link
              to={"/video/publishVideo"}
              className="sm:flex hidden gap-x-1 text-sm font-semibold items-center light-btn dark-btn px-3 py-2 rounded-full"
            >
              <RiVideoUploadLine className="text-xl" title="Upload video" />
              <span>Upload</span>
            </Link>

            {/* Header dropdown */}
            <DropdownMenu />
          </div>
        </>
      )}

      {/* Mobile Search Bar Mode */}
      {isSearchActive && (
        <div className="w-full flex items-center justify-between">
          <button className="light-text-primary dark-text-primary p-2" onClick={() => setIsSearchActive(false)}>
            <IoArrowBack className="text-2xl" />
          </button>
          <div className="flex-grow mx-auto">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent light-text-primary dark-text-primary p-2 pl-4 pr-12 rounded-full focus:outline-none border border-[#424242] placeholder:text-gray-900"
              />
              <button type="submit" className="absolute right-2 top-2 px-1 light-text-primary dark-text-primary">
                <IoSearch className="text-2xl" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
