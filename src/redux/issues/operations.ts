import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.github.com/repos",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN as string}`,
  },
});

export const fetchIssues = createAsyncThunk(
  "issues/fetchAll",
  async (searchValue: string) => {
    try {
      const result = await axiosInstance.get(`/${searchValue}/issues?state=all`);
      
      return result.data;
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  });