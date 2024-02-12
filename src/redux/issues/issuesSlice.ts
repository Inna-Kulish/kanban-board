import { AnyAction, createSlice, isAnyOf, PayloadAction,  } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { fetchIssues, fetchStars } from "./operations";
import { GitHubIssue, GitHubRepo, IssuesState, IssueType } from "../../shared/types";

const initialState: IssuesState = {
  search: "",
  items: [],
  repoChanges: [],
  stars: 0,
  isLoading: false,
  error: null,
};

const handlePending = (state: IssuesState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: IssuesState,
  action: PayloadAction<string>
) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilledFetch = (
  state: IssuesState,
  { payload }: PayloadAction<GitHubIssue[]>
) => {
  const dataArr = payload.map(
    ({ id, state, title, assignee, number, user, created_at, comments }) => {
      const obj = {
        id: id,
        columnId: state,
        title: title,
        number: number,
        name: user.login,
        createdData: created_at,
        comments: comments,
      };

      if (state === "open" && assignee) obj.columnId = "assignee";

      return { ...obj };
    }
  );

  state.isLoading = false;
  state.error = null;
  state.items = dataArr;
  state.repoChanges.push({ [state.search]: dataArr });
};

const handleFulfilledFetchStars = (state: IssuesState,
  { payload }: PayloadAction<GitHubRepo>) => {
  state.stars = payload.stargazers_count;
  }

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    changeSearch: (state: IssuesState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    changeIssues: (state: IssuesState, action: PayloadAction<IssueType[]>) => {
      state.error = null;
      state.items = action.payload;
      state.repoChanges.map(item => {
        if (Object.keys(item).includes(state.search)) {
          item[state.search] = action.payload;
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStars.fulfilled, handleFulfilledFetchStars)
      .addCase(fetchIssues.fulfilled, handleFulfilledFetch)
      .addMatcher(isAnyOf(fetchIssues.pending, fetchStars.pending), handlePending)
      .addMatcher(isError, handleRejected)
  },
});

const persistConfig = {
  key: "issues",
  storage,
  whitelist: ['repoChanges', 'search', 'stars'],
};

export const persistedIssuesReducer = persistReducer(
  persistConfig,
  issuesSlice.reducer
);

export const { changeSearch, changeIssues } = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;
