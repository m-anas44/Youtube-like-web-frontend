import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../pages/auth/refreshAccessToken";
import useTheme from "../context/switcher";

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [changeTheme, setChangeTheme] = useState(true);
  const navigate = useNavigate();
  const { lightMode, darkMode } = useTheme();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  const toggleTheme = () => {
    setChangeTheme(!changeTheme);
    changeTheme ? darkMode() : lightMode();
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="relative inline-block">
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
              <div className="font-medium truncate light-text-secondary dark-text-secondary">
                @{currentUser.username}
              </div>
              <div className="capitalize tracking-tight truncate">
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
                to="/feed/library"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#222222] dark:hover:text-white"
              >
                Library
              </Link>
            </li>
            <li>
              <Link
                to="/settings/user"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#222222] dark:hover:text-white"
              >
                Settings
              </Link>
            </li>
          </ul>
          <div className="py-2 block px-4 text-sm light-text-primary dark-text-primary font-normal-bold font-normal">
            Appearance
            <button
              onClick={toggleTheme}
              className="ml-2 text-sm"
            >
              {changeTheme ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
          <div className="py-2">
            <button
              onClick={() => logoutUser()}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#222222] light-text-primary dark-text-primary font-normal-bold font-normal"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
