import { createBrowserRouter, Navigate } from "react-router-dom";
import Browse from "./pages/browse/Browse";
import MoviePage from "./pages/movieDetails/MoviePage";
import Login from "./components/Login";
import App from "./App";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/movie/:movieId",
        element: <MoviePage />,
      },
    ],
  },
]);
