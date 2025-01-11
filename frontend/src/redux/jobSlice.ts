import { Job } from "@/types/job";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the state type
interface JobState {
  data: Job[];
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch jobs
export const fetchJobs = createAsyncThunk<Job[]>("jobs/fetchJobs", async () => {
  const response = await fetch("https://jobs-hofi.onrender.com/api/jobs");
  const data = await response.json();
  return data; // Return the job data
});

// Define the initial state
const initialState: JobState = {
  data: [],
  loading: false,
  error: null,
};

// Create the slice
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const jobReducer = jobSlice.reducer;
