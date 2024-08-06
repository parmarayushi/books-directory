/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { FileRoutes } from "./core/utility/enums/core.enums";
import BookDetails from "./pages/books/components/bookDetails/BookDetails";
import BookDirectory from "./pages/books/components/directory/BookDirectory";
import Favorite from "./pages/books/components/favorite/Favorite";

function AppRoutes() {
  const routes: any = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <BookDirectory />,
        },
        {
          path: FileRoutes.BOOK_DETAILS,
          element: <BookDetails />,
        },
        {
          path: FileRoutes.FAVORITE,
          element: <Favorite />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router}></RouterProvider>;
}

export default AppRoutes;
