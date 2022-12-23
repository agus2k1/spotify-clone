import SongBar from "./SongBar";

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
  artistId,
}) => {
  const songs = data?.response.songs;

  console.log(songs);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
      <div className="mt-6 w-full flex flex-col">
        {songs.map((song, i) => {
          console.log(song);

          return (
            <SongBar
              key={`${song.id}`}
              song={song}
              i={i}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePause}
              handlePlay={handlePlay}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedSongs;
