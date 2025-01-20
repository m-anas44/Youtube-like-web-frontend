import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../pages/auth/refreshAccessToken";
import useTheme from "../context/switcher";
import { FiSun, FiMoon } from "react-icons/fi";
import { LuLayoutDashboard, LuLibrary } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { GrChannel } from "react-icons/gr";

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const savedTheme = localStorage.getItem("themeMode");
  const [isChecked, setIsChecked] = useState(savedTheme === "dark");
  const navigate = useNavigate();
  const { lightMode, darkMode } = useTheme();
  const dropdownRef = useRef(null); // Ref for the dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isChecked) {
      darkMode();
      localStorage.setItem("themeMode", "dark");
    } else {
      lightMode();
      localStorage.setItem("themeMode", "light");
    }
  }, [isChecked, lightMode, darkMode]);

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/users/currentUser");
        setCurrentUser(response.data.data);
      } catch (error) {
        console.log("Error in getting user", error);
        navigate("/login");
      }
    };

    getCurrentUser();
  }, [navigate]);

  const logoutUser = async () => {
    try {
      const response = await axiosInstance.post("/users/logout");
      console.log(response);
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      console.log("Error in logging out user", error);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        id="dropdownInformationButton"
        onClick={toggleDropdown}
        className="md:flex items-center rounded-full align-middle hidden"
        type="button"
      >
        <img
          src={currentUser.avatar}
          alt="dropdown-img"
          className="rounded-full w-9 h-9 object-cover"
        />
      </button>
      {isDropdownOpen && (
        <div
          id="dropdownInformation"
          className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-200 rounded-lg shadow-lg w-52 dark:bg-[#1e1e1e] dark:divide-gray-800"
        >
          <div className="px-4 flex gap-x-3 py-3 text-sm light-text-primary dark-text-primary font-normal-bold">
            <img
              src={currentUser.avatar}
              alt="user avatar"
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <div className="font-medium overflow-hidden light-text-secondary dark-text-secondary">
                @{currentUser.username}
              </div>
              <div className="capitalize tracking-tight overflow-hidden">
                {currentUser.fullName}
              </div>
            </div>
          </div>
          <ul
            className="py-2 text-sm light-text-primary dark-text-primary font-normal-bold font-normal"
            aria-labelledby="dropdownInformationButton"
          >
            <li>
              <Link
                to={`/channel/${currentUser.username}`}
                className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover"
                onClick={() => setIsDropdownOpen(false)} // Close dropdown
              >
                <span className="text-lg flex-shrink-0">
                  <GrChannel />
                </span>
                <span className="ms-2 text-sm">View Channel</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover"
                onClick={() => setIsDropdownOpen(false)} // Close dropdown
              >
                <span className="text-lg flex-shrink-0">
                  <LuLayoutDashboard />
                </span>
                <span className="ms-2 text-sm">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/feed/library"
                className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover"
                onClick={() => setIsDropdownOpen(false)} // Close dropdown
              >
                <span className="text-lg flex-shrink-0">
                  <LuLibrary />
                </span>
                <span className="ms-2 text-sm">Library</span>
              </Link>
            </li>
          </ul>
          <div className="py-2 flex justify-between items-center px-4 text-sm light-text-primary dark-text-primary font-normal-bold font-normal">
            Appearance
            <label className="relative inline-flex cursor-pointer select-none items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <div className="shadow-md flex h-[38px] w-[68px] items-center justify-center rounded-md bg-white dark:bg-[#222222]">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded ${
                    !isChecked
                      ? "light-btn dark-btn bg-white dark:bg-[#222222]"
                      : ""
                  }`}
                >
                  <FiSun />
                </span>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded ${
                    isChecked
                      ? "light-btn dark-btn"
                      : "bg-white dark:bg-[#222222]"
                  }`}
                >
                  <FiMoon />
                </span>
              </div>
            </label>
          </div>

          <div className="py-2 font-normal-bold font-normal">
            <Link
              to="/settings/user"
              className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover"
              onClick={() => setIsDropdownOpen(false)} // Close dropdown
            >
              <span className="text-lg flex-shrink-0">
                <IoSettingsOutline />
              </span>
              <span className="ms-2 text-sm">Settings</span>
            </Link>
            <button
              onClick={() => {
                logoutUser();
                setIsDropdownOpen(false); // Close dropdown
              }}
              className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover w-full"
            >
              <span className="text-lg flex-shrink-0">
                <MdOutlinePowerSettingsNew />
              </span>
              <span className="ms-2 text-sm">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
