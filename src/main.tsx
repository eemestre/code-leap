import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignUp from "./pages/SignUp.tsx";
import Feed from "./pages/Feed.tsx";
import Error404 from "./pages/Error404.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <Error404 />,
    children: [
      { path: "signup", Component: SignUp },
      { path: "feed/:user", Component: Feed },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
