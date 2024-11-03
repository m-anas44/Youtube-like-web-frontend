import { RiPlayListAddFill } from "react-icons/ri";

const DropdownMenu = () => (
  <div className="absolute mt-2 left-1/2 transform -translate-x-[85%] w-40 rounded-lg shadow-lg border light-border-secondary dark-border-secondary z-10 py-3 light-bg-secondary dark-bg-secondary font-normal-bold font-normal">
    <button className="flex gap-x-2 items-center w-full text-left px-4 py-2 text-sm dark-btn-hover light-btn-hover">
      <RiPlayListAddFill className="text-base" />
      <span>Add to Playlist</span>
    </button>
  </div>
);

export default DropdownMenu;
