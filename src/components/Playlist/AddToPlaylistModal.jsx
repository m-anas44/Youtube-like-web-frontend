import { MdClose } from "react-icons/md";

const AddToPlaylistModal = ({
  currentPlaylists,
  selectedPlaylist,
  setSelectedPlaylist,
  openCreatePlaylistModal,
  closeModal,
  handleAddVideoToPlaylist, // Add this prop
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden font-normal-bold"
    tabIndex={-1}
  >
    <div className="relative w-full max-w-lg p-4">
      <div className="relative bg-white dark-bg-secondary rounded-lg shadow-lg border light-border-secondary dark-border-secondary">
        <div className="flex items-center justify-between p-4 border-b rounded-t light-border-primary dark-border-primary">
          <h3 className="text-xl">Add to Playlist</h3>
          <button
            onClick={closeModal}
            className="bg-transparent light-btn-hover dark-btn-hover rounded-lg p-1"
          >
            <MdClose />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-sm tracking-wide font-normal">
            Select a playlist to add this video
          </p>
          <div className="custom-scrollbar space-y-2 max-h-[180px] overflow-y-auto">
            {currentPlaylists.map((playlist) => (
              <label
                key={playlist._id}
                className="rounded-md p-2 w-full text-sm font-normal border light-border-primary dark-border-primary light-btn-hover dark-btn-hover cursor-pointer bg-transparent flex items-center gap-x-3"
              >
                <input
                  type="radio"
                  name="playlist"
                  value={playlist._id}
                  checked={selectedPlaylist === playlist._id}
                  onChange={() => setSelectedPlaylist(playlist._id)}
                  className="form-radio"
                />
                <span className="text-gray-800 dark:text-gray-200">
                  {playlist.name}
                </span>
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={openCreatePlaylistModal}
            className="rounded-md p-2 w-full text-sm font-normal-bold border light-border-primary dark-border-primary light-btn-hover dark-btn-hover cursor-pointer bg-transparent flex items-center justify-center gap-x-1"
          >
            Create Playlist
          </button>
        </div>
        <div className="flex items-center p-4 border-t text-sm font-normal border-gray-200 rounded-b dark:border-gray-600">
          <button
            onClick={handleAddVideoToPlaylist}
            className="light-btn dark-btn rounded-lg px-3 py-1.5"
          >
            Add Video
          </button>
          <button
            onClick={closeModal}
            className="light-btn-hover dark-btn-hover ml-2 light-bg-secondary font-normal text-sm border light-border-secondary dark-border-secondary rounded-lg px-3 py-1.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AddToPlaylistModal;
