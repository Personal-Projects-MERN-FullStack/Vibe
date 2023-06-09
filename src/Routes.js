import { Outlet, useRoutes } from "react-router";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Checkout from "./pages/Chekout";
import Navbar from "./components/UI/Navbar";
import Cart from "./pages/Cart";
import Footer from "./components/UI/Footer";
import Notfound from "./components/UI/Notfound";
import Sidecart from "./components/UI/Sidecart";
import { useSelector } from "react-redux";

function AppRoutes() {
  const cartstate = useSelector(state => state.ui.showcart)

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
         {cartstate &&  <Sidecart/>}
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
    { path: '*', element: <Notfound /> }
  ]);
  return routes;
}

export default AppRoutes;
