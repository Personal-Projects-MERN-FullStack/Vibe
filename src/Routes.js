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
import NotLoggedInPage from "./components/common/NotLoggedInPage";
function AppRoutes() {
  const cartstate = useSelector((state) => state.ui.showcart);
  const loginstate = useSelector((state) => state.ui.showlogin);
  const notification_status = useSelector((state) => state.ui.shownotification);
  const auth = useSelector((state) => state.auth.auth);
  const routes = useRoutes([
    { path: "*", element: <Notfound /> }, // Move this route to the top
    {
      path: "/",
      element: (
        <div>
          <Navbar />

          {notification_status.active && (
            <Notification ninfo={notification_status} />
          )}
          {loginstate && <Login />}
          {auth && cartstate && <Sidecart />}
          <Outlet />
          <Footer />
        </div>
      ),
      children: [{ path: "/", element: <Home /> },
      { path: "/product-search/:search", element: <ProductList /> },
      { path: "/product/:id", element: <ProductDetails /> },],
    },
    {
      path: "/cart",
      element: (
        <div>
          {auth && <Outlet />}
          <NotLoggedInPage />
        </div>
      ),

      children: [
        {
          path: "/cart",
          element: <Cart />,
        },
        
      ],
    },
    
    {
      path: "/checkout",
      element: (
        <div>
          {auth && <Outlet />}
          <NotLoggedInPage />
        </div>
      ),

      children: [
        {
          path: "/checkout",
          element: <Checkout />,
        },
      ],
    },
  ]);

  return routes;
}

export default AppRoutes;
