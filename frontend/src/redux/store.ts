import { configureStore } from "@reduxjs/toolkit";
import { jobReducer } from "./jobSlice";
import { filteredJobsReducer } from "./filteredJobsSlice";

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    filteredJobs: filteredJobsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
