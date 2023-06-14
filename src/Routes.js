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
import ProductDetails from "./pages/ProductDetails";
import Notification from "./components/common/Notification";
import Login from "./components/Auth/Login";
function AppRoutes() {
  const cartstate = useSelector((state) => state.ui.showcart);
  const loginstate = useSelector(state=>state.ui.showlogin)
  const notification_status = useSelector(state=>state.ui.shownotification)
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <div>
          <Navbar />

         {notification_status.active &&  <Notification ninfo={notification_status}/>}
        {loginstate && <Login/>}
          {cartstate && <Sidecart />}
          <Outlet />
          <Footer />
        </div>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/product-search/:search", element: <ProductList /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/checkout", element: <Checkout /> },
      ],
    },
    { path: "*", element: <Notfound /> },
  ]);
  return routes;
}

export default AppRoutes;
