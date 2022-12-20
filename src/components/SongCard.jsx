import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ data, i }) => {
  const activeSong = "Test";
  // console.log(data);

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === data //.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause />
        </div>
        <img src={data.song_art_image_thumbnail_url} alt="song_img" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={data.api_path}>{data.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1 ">
          <Link to={data.primary_artist.api_path}>{data.artist_names}</Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
