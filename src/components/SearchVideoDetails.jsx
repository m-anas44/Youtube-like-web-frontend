import { formatDistanceToNow } from "date-fns";

const SearchVideoDetails = ({ video }) => (
  <section>
    <div className="hidden sm:block">
    <div className="flex items-center text-xs md:text-sm font-normal light-text-secondary dark-text-secondary space-x-1 mt-1">
      <span>{video.views} views</span>
      <span>•</span>
      <span>
        {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
      </span>
    </div>
    <div className="flex items-center gap-x-2 mt-2">
      <img
        src={video.owner.avatar}
        alt={video.owner.fullName}
        className="w-7 h-7 rounded-full"
      />
      <p className="text-xs md:text-sm font-normal mt-1 capitalize">
        {video.owner.fullName}
      </p>
    </div>
    </div>
    <div>
    <div className="flex sm:hidden items-end text-xs md:text-sm font-normal light-text-secondary dark-text-secondary gap-x-2 mt-1">
      <span>{video.views} views</span>
      <span className="font-bold">•</span>
      <span>
        {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
      </span>
      <span className="font-bold">•</span>
      <span className="text-xs md:text-sm font-normal capitalize">
        {video.owner.fullName}
      </span>
    </div>
    </div>
  </section>
);

export default SearchVideoDetails;
