import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { GitHubIssue, GitHubRepo } from "../../shared/types";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.github.com/repos",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN as string}`,
  },
});

export const fetchStars = createAsyncThunk<GitHubRepo, string, { rejectValue: string }>(
  "issues/fetchStars", async (searchValue, { rejectWithValue })=> {
    try {
    const result = await axiosInstance.get(`/${searchValue}`);

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
});

export const fetchIssues = createAsyncThunk<GitHubIssue[], string, { rejectValue: string }>(
  "issues/fetchAll", async (searchValue, { rejectWithValue })=> {
  try {
    const result = await axiosInstance.get(`/${searchValue}/issues?state=all`);

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
});
