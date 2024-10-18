import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); 
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("/api/v1/users/currentUser", {
          withCredentials: true,
        });
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
      const response = await axios.post("/api/v1/users/logout");
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
          className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-[#1e1e1e] dark:divide-gray-600"
        >
          <div className="px-4 flex gap-x-3 py-3 text-sm text-[#0f0f0f] dark:text-white">
            <img
              src={currentUser.avatar}
              alt="user avatar"
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <div className="font-medium truncate text-gray-400">
                @{currentUser.username}
              </div>
              <div className="capitalize tracking-tight truncate">
                {currentUser.fullName}
              </div>
            </div>
          </div>
          <ul
            className="py-2 text-sm text-[#0f0f0f] dark:text-gray-200"
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
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#222222] dark:hover:text-white"
              >
                Settings
              </Link>
            </li>
          </ul>
          <div className="py-2 block px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-[#222222] dark:text-gray-200 dark:hover:text-white">
            Appearance
          </div>
          <div className="py-2">
            <button
              onClick={() => logoutUser()}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-[#222222] dark:text-gray-200 dark:hover:text-white"
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
