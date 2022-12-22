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
  const { data: chart } = useGetTopChartsQuery();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const songid = useParams().songid;
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);

  // const {
  //   artistSongs,
  //   isFetching: isFetchingRelatedSongs,
  //   error,
  // } = useGetSongRelatedQuery(2);

  const chartData = chart?.response.chart_items.find(
    (item) => item.item.id == songid
  );

  // const artistSongsData = artistSongs?.response;

  console.log(chartData);

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

      <RelatedSongs />
    </div>
  );
};

export default SongDetails;
