import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchIssues } from "./operations";
import { GitHubIssue, IssuesState } from "../../shared/types";

const initialState: IssuesState = {
  search: "",
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: IssuesState) => {
  state.isLoading = true;
};

// const handleRejected = (state: IssuesState, action: PayloadAction<{message: string}>) => {
//   state.isLoading = false;
//   state.error = action.payload.message || 'Something went wrong';
// };

const handleFulfilledFetch = (
  state: IssuesState,
  {payload}: PayloadAction<GitHubIssue[]>
) => {
  const dataArr = payload.map(({id, state, title, assignee, number, user, created_at, comments}) => {
        const obj = {
          id: id,
          columnId: state,
          title: title,
          number: number,
          name: user.login,
          createdData: created_at,
          comments: comments,
        };

        if (state === 'open' && assignee) obj.columnId = "assignee";

        return {...obj};
  });
  
 return {...state, items: dataArr, isLoading: false, error: null};
  
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    changeSearch: (state: IssuesState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.fulfilled, handleFulfilledFetch)
      .addCase(fetchIssues.pending, handlePending)
  },
});

export const { changeSearch } = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;
