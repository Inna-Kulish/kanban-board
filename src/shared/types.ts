export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export interface IssueType {
  id: number;
  columnId: string | number | null;
  title: string;
  number: number;
  name: string;
  createdData: string;
  comments: number;
}

export type IssuesState = {
    isLoading: boolean;
    search: string;
    items: IssueType[];
    error: string | null;
}

export type GitHubIssue = {
  id: number;
  state: string;
  title: string;
  number: number;
  assignee: string;
  user: {
    login: string;
  };
  created_at: string;
  comments: number;
}