/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../../../environment/environment";
import { axiosBaseQuery } from "../../../../shared/utility/services/axiosBaseQuery.service";
import { IBooks, IBooksQueryParams } from "../models/books.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const booksApi: any = createApi({
  reducerPath: "booksApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["BooksDirectory"],
  endpoints: (builder) => ({
    // GET all book list
    getBooks: builder.query<IBooks[], IBooksQueryParams>({
      query: ({
        pageNumber,
        pageSize,
        search,
        authors,
        status,
        categories,
        isFavorite,
      }) => {
        // Construct the query string conditionally based on the provided parameters
        let query = `?page=${pageNumber}&limit=${pageSize}&search=${search}`;

        // Add the isFavorite parameter
        if (authors || status || categories)
          query += `&authors=${authors}&status=${status}&categories=${categories}`;

        // Add the isFavorite parameter
        if (isFavorite) query += `&isFavorite=true`;

        return {
          url: query,
          method: "GET",
        };
      },
      providesTags: ["BooksDirectory"],
    }),

    // GET all book data by Id
    getBooksById: builder.query<IBooks, void>({
      query: (bookId) => ({ url: `/${bookId}`, method: "GET" }),
      providesTags: ["BooksDirectory"],
      transformResponse: (res: any) => {
        return res.data.book;
      },
    }),

    // GET all book data by Id
    getStatusAuthorCategoriesData: builder.query<IBooks, void>({
      query: () => ({ url: `/filter`, method: "GET" }),
      providesTags: ["BooksDirectory"],
      transformResponse: (res: any) => {
        return res.data[0];
      },
    }),

    // GET favorite list data
    updateBooksData: builder.mutation<IBooks, IBooks>({
      query: ({ _id, ...data }) => ({
        url: `/${_id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["BooksDirectory"],
      transformResponse: (res: any) => {
        return res.data.book;
      },
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBooksByIdQuery,
  useGetStatusAuthorCategoriesDataQuery,
  useUpdateBooksDataMutation,
} = booksApi;
