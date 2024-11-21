import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../pages/books/utility/services/books.service";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});
