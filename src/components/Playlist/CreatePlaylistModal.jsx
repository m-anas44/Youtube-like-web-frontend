import { MdClose } from "react-icons/md";

const CreatePlaylistModal = ({
  playlistName,
  setPlaylistName,
  playlistDescription,
  setPlaylistDescription,
  handleCreatePlaylist,
  error,
  closeCreatePlaylistModal,
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden font-normal-bold"
    tabIndex={-1}
  >
    <div className="relative w-full max-w-lg p-4">
      <div className="relative bg-white dark-bg-secondary rounded-lg shadow-lg border light-border-secondary dark-border-secondary">
        <div className="flex items-center justify-between p-4 border-b rounded-t light-border-primary dark-border-primary">
          <h3 className="text-xl">Create New Playlist</h3>
          <button
            onClick={closeCreatePlaylistModal}
            className="bg-transparent light-btn-hover dark-btn-hover rounded-lg p-1"
          >
            <MdClose />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="block w-full rounded-md light-bg-secondary dark:bg-[#222222] light-border-primary dark-border-primary border px-2 py-1.5 sm:text-sm sm:leading-6 focus:outline-none font-normal"
          />
          <textarea
            placeholder="Playlist Description"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            className="block w-full rounded-md light-bg-secondary dark:bg-[#222222] light-border-primary dark-border-primary border px-2 py-1.5 sm:text-sm sm:leading-6 focus:outline-none font-normal"
          ></textarea>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex items-center p-4 border-t text-sm font-normal border-gray-200 rounded-b dark:border-gray-600">
          <button
            onClick={handleCreatePlaylist}
            className="light-btn dark-btn rounded-lg px-3 py-1.5"
          >
            Create
          </button>
          <button
            onClick={closeCreatePlaylistModal}
            className="light-btn-hover dark-btn-hover ml-2 light-bg-secondary font-normal text-sm border light-border-secondary dark-border-secondary rounded-lg px-3 py-1.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CreatePlaylistModal;
