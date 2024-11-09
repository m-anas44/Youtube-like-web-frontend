import React, { useEffect, useState } from "react";
import axiosInstance from "./auth/refreshAccessToken";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

function UserPlaylists() {
  const [currentPlaylists, setCurrentPlaylists] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/users/currentUser");
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axiosInstance.get(
          `/playlists/user/${currentUser._id}`
        );
        setCurrentPlaylists(response.data.data);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };
    if (currentUser._id) {
      fetchPlaylists();
    }
  }, [currentUser]);

  return (
    <div className="px-2 sm:px-0 mb-20 md:mb-0 mt-2 m-0 md:m-6">
      {currentPlaylists.length === 0 ? (
        // Message when there are no playlists
        <p className="text-center font-normal-bold">No playlists found.</p>
      ) : (
        <div className="custom-scrollbar overflow-x-auto">
          <table className="table-auto w-full font-normal-bold min-w-max">
            {/* Table Header */}
            <thead>
              <tr className="text-left light-bg-secondary dark-bg-secondary border light-border-primary dark-border-primary">
                <th className="py-4 px-6 text-sm md:text-base whitespace-nowrap">
                  Playlist Name
                </th>
                <th className="py-4 px-6 text-sm md:text-base whitespace-nowrap">
                  Description
                </th>
                <th className="py-4 px-6 text-sm md:text-base whitespace-nowrap">
                  Created
                </th>
                <th className="py-4 px-6 text-sm md:text-base whitespace-nowrap text-center">
                  Action
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {currentPlaylists.map((playlist) => (
                <tr
                  key={playlist._id}
                  className="font-normal text-xs md:text-sm border light-border-primary dark-border-primary"
                >
                  <td className="py-4 px-6 whitespace-nowrap">{playlist.name}</td>
                  <td className="py-4 px-6 max-w-xs line-clamp-1">
                    {playlist.description}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {formatDistanceToNow(new Date(playlist.createdAt), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <Link
                      to={`/feed/playlists/${playlist._id}`}
                      className="rounded-md p-2 max-w-28 mx-auto light-btn-hover dark-btn-hover text-sm font-normal-bold font-normal border light-border-primary dark-border-primary light-btn-hover dark-btn-hover cursor-pointer bg-transparent flex items-center justify-center gap-x-1"
                    >
                      View playlist
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserPlaylists;
