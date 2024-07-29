export interface IBooks {
  _id: string;
  title: string;
  isbn: string;
  publishedDate: string;
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  categories: string[];
  authors: string[];
  pageCount: number;
  isFavorite: boolean;
}

export interface IBooksQueryParams {
  pageNumber: number;
  pageSize: number;
  search: string;
  status?: string;
  authors?: string[];
  categories?: string[];
  isFavorite?: boolean;
}
