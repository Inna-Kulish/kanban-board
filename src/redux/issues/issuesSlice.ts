import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchIssues } from "./operations";

interface IssueType {
  title: string;
  user: {
    login: string;
    type: string;
  };
}

interface IssuesState {
  items: IssueType[];
}

const initialState: IssuesState = {
  items: [],
};

const handleFulfilledFetch = (
  state: IssuesState,
  action: PayloadAction<IssueType[]>
) => {
  state.items = action.payload;
};

const issuesSlice = createSlice({
  name: "issues",
    initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchIssues.fulfilled, handleFulfilledFetch);
  },
});

export const issuesReducer = issuesSlice.reducer;
