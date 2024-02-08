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

export interface RepoChangesType {
  [key: string]: IssueType[];
}

export interface IssuesState {
    isLoading: boolean;
  search: string;
  repoChanges: RepoChangesType[];
  items: IssueType[];
  stars: number;
  error: string | null;
}

export interface GitHubIssue {
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
  stargazers_count: number;
}

export interface GitHubRepo {
  stargazers_count: number;
}