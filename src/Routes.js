import { Outlet, useRoutes } from "react-router";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Checkout from "./pages/Chekout";
import Navbar from "./components/UI/Navbar";
import Cart from "./pages/Cart";
import Footer from "./components/UI/Footer";

function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Outlet />
          <Footer/>
        </div>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/product-search/:search", element: <ProductList /> },
        { path: "/product/:id", element: <ProductList /> },
        { path: "/checkout", element: <Checkout /> },
      ],
    },
  ]);
  return routes;
}

export default AppRoutes;
