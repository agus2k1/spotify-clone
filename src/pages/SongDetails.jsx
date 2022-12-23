import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetTopChartsQuery,
} from "../redux/services/geniusCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const songid = useParams().songid;
  const { data: chart } = useGetTopChartsQuery();
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);

  const chartData = chart?.response.chart_items.find(
    (item) => item.item.id == songid
  );
  const artistId = chartData?.item.primary_artist.id;

  const songGenre = songData?.response?.lyrics?.tracking_data.primary_tag;

  const {
    data: songsRelatedData,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery(songGenre);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching song details" />;
  }

  if (error) return <Error />;

  console.log(songsRelatedData);

  return (
    <div className="flex flex-col">
      {songData && chartData && (
        <DetailsHeader
          artistId={""}
          songData={songData}
          chartData={chartData}
        />
      )}

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics: </h2>
        <div className="mt-5">
          {songData && songData.meta.status !== 404 ? (
            <div
              className="text-gray-400 text-base my-1"
              dangerouslySetInnerHTML={{
                __html: songData.response.lyrics.lyrics.body.html,
              }}
            />
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>

      {/* <RelatedSongs
        data={songsRelatedData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        artistId={artistId}
      /> */}
    </div>
  );
};

export default SongDetails;
