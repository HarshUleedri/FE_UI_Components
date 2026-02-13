import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home/Home";
import NotFound from "./components/NotFound";
import ShoppingCartContextProvider from "./context/ShoppingCartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <ShoppingCartContextProvider>
      <RouterProvider router={router} />;
    </ShoppingCartContextProvider>
  );
};

export default App;
