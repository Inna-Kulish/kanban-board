import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { token } from "./token";

export const axiosInstance = axios.create({
  baseURL: "https://api.github.com/repos",
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
});

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