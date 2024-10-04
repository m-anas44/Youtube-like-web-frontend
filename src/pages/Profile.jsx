import axios from "axios";
import React, { useEffect } from "react";

function Profile() {
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/v1/users/currentUser", {
          withCredentials: true,
        });
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching current user", error);
      }
    };

    fetchCurrentUser();
  }, []);
  return (
    <div className="px-12 mt-4 bg-transparent max-w-4xl">
      {/* Cover Image Section */}
      <div className="relative mb-8 w-full h-52 bg-gray-200 rounded-t-lg cursor-pointer">
        <img
          src={"coverImagePreview"}
          alt="Cover Preview"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
        />
      </div>
      {/* Avatar Section */}
      <div className="relative flex justify-start ml-4">
        <div className="relative w-32 h-32 rounded-full bg-gray-300 cursor-pointer border-4 border-white dark:border-[#0f0f0f] -mt-24">
          <img
            src={"avatarPreview"}
            alt="Avatar Preview"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <div className="mt-2">
        <h2 className="tracking-tight text-2xl">Muhammad Anas</h2>
        <p>@username</p>
      </div>
    </div>
  );
}

export default Profile;
