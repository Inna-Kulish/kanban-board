import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./axios";

export const fetchIssues = createAsyncThunk(
  "issues/fetchAll",
  async (_, thunkAPI) => {
    try {
      const result = await axiosInstance.get("/facebook/react/issues");
      console.log(result.data);
      return result.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);