import { RootState } from "../store";

export const selectIssues = (state: RootState) => state.issues.items;
export const selectSeach = (state: RootState) => state.issues.search;