import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "@/types/job";

interface FilteredJobsState {
  filteredData: Job[];
}

const initialState: FilteredJobsState = {
  filteredData: [],
};

const filteredJobsSlice = createSlice({
  name: "filteredJobs",
  initialState,
  reducers: {
    setFilteredData: (state, action: PayloadAction<Job[]>) => {
      state.filteredData = action.payload;
    },
    resetFilteredData(state) {
      state.filteredData = [];
    },
  },
});

export const { setFilteredData, resetFilteredData } = filteredJobsSlice.actions;
export const filteredJobsReducer = filteredJobsSlice.reducer;
