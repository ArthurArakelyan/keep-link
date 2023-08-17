export type SearchResultType = 'link' | 'folder';

export interface ISearchResult {
  id: string;
  type: SearchResultType;
  name: string;
  results?: Omit<ISearchResult, 'results'>[];
}

export interface ISearchItem {
  id: string;
  name: string;
}
