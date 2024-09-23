import { createBrowserRouter } from "react-router-dom";
import Browse from "./body/Browse";
import Body from "./body/Body";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
]);
