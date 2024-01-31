import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = "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";

const instance = axios.create({
  baseURL: "https://api.github.com/repos",
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${token}`,
  },
});

export const fetchIssues = createAsyncThunk(
  "issues/fetchAll",
  async (_, thunkAPI) => {
    try {
      const result = await instance.get("/facebook/react/issues");
      console.log(result.data);
      return result.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);