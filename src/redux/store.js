import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { geniusCoreApi } from "./services/geniusCore";

export const store = configureStore({
  reducer: {
    [geniusCoreApi.reducerPath]: geniusCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(geniusCoreApi.middleware),
});
