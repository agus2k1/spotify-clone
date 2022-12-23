import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { matchPath } from "react-router-dom";

export const geniusCoreApi = createApi({
  reducerPath: "geniusCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://genius-song-lyrics1.p.rapidapi.com", // might need to be changed
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/songs/chart?chart_genre=all&per_page=50&page=1",
    }),
    getSongRelated: builder.query({
      query: (genre = "all", page = Math.floor(Math.random() * 10)) =>
        `/songs/chart?chart_genre=${genre}&per_page=15&page=${page}`,
    }),
    getSongDetails: builder.query({
      query: (songid) => `/songs/${songid}/lyrics`,
    }),
    // getSongRelated: builder.query({
    //   query: (songid) => `/artists/${songid}/songs`,
    // }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = geniusCoreApi;
