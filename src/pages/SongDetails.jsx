import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/geniusCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const songid = useParams().songid;
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);

  console.log(songData.response.lyrics.lyrics.body);
  console.log(
    songData.response.lyrics.lyrics.body.dom.children[0].children.html
  );

  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId={artistId} songData={songData} /> */}

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics: </h2>
        <div className="mt-5">
          {songData && (
            <div
              dangerouslySetInnerHTML={{
                __html: songData.response.lyrics.lyrics.body.html,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
