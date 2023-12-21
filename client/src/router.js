import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Room from "./pages/Room";

const router = createBrowserRouter([
  {
    path: "/", // The base path
    element: <App />, // The main App component
    children: [
      {
        path: "/", // The home path
        element: <Home /> // The Home component
      },
      {
        path: "/room/:roomId", // The room path with a dynamic segment for the room ID
        element: <Room /> // The Room component
      }
    ]
  }
]);

export default router;
