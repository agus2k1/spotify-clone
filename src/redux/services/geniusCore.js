import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const geniusCoreApi = createApi({
  reducerPath: "geniusCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://genius-song-lyrics1.p.rapidapi.com", // might need to be changed
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "c38a14167fmshd9ed68d9c71a01fp139d53jsn0bfc59735542"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/songs/chart?chart_genre=all&per_page=50&page=1",
    }),
    getSongDetails: builder.query({
      query: (songid) => `/songs/${songid}/lyrics`,
    }),
  }),
});

export const { useGetTopChartsQuery, useGetSongDetailsQuery } = geniusCoreApi;
