import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData, chartData }) => {
  const songImage = chartData?.item.song_art_image_url;
  const songTitle = chartData?.item.title;
  const songGenre = songData?.response?.lyrics?.tracking_data.primary_tag;
  const songGenreToUpperCase =
    songGenre.charAt(0).toUpperCase() + songGenre.slice(1);
  const artistName = chartData?.item.artist_names;
  const artistImage = chartData?.item.primary_artist.image_url;
  const idURL = chartData?.item.primary_artist.id;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          src={artistId ? artistImage : songImage}
          alt="art"
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistName : songTitle}
          </p>
          {!artistId && (
            <Link to={`/artists/${idURL}`}>
              <p className="text-base text-gray-400 mt-2">{artistName}</p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">{songGenreToUpperCase}</p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
