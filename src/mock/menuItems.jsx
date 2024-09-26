import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePlaylistPlay, MdOutlineHistory } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { BsThreads } from "react-icons/bs";

export const menuItems = [
  {
    icon: <IoHomeOutline />,
    label: "Home",
    path: "/",
  },
  {
    icon: <MdOutlinePlaylistPlay />,
    label: "Playlists",
    path: "/playlists",
  },
  {
    icon: <MdOutlineHistory />,
    label: "History",
    path: "/history",
  },
  {
    icon: <BiLike />,
    label: "Likes",
    path: "/likes",
  },
  {
    icon: <BsThreads />,
    label: "Threads",
    path: "/threads",
  },
];
