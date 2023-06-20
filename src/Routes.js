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
import OrderPlaced from "./pages/OrderPlaced";
import Profilepage from "./components/UI/Profilepage";

function AppRoutes() {
  const cartstate = useSelector((state) => state.ui.showcart);
  const loginstate = useSelector((state) => state.ui.showlogin);
  const notification_status = useSelector((state) => state.ui.shownotification);
  const auth = useSelector((state) => state.auth.auth);
  const cartlength = useSelector((state) => state.product.cart.length);
  const orderplaced = useSelector((state) => state.ui.orderplaced);
  const showprofile = useSelector((state) => state.ui.showprofile);
  const routes = useRoutes([
    {
      path: "*",
      element: <Notfound />,
    },
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
          {auth && showprofile && <Profilepage />}
          <Outlet />
          <Footer />
        </div>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/product-search/:search", element: <ProductList /> },
        { path: "/product/:id", element: <ProductDetails /> },
      ],
    },
    {
      path: "/cart",
      element: (
        <div>
          <Navbar />
          {notification_status.active && (
            <Notification ninfo={notification_status} />
          )}
          {auth && <Outlet />}
          {auth && cartstate && <Sidecart />}
          {!auth && <NotLoggedInPage state="login" />}
          <Footer />
        </div>
      ),
      children: [{ path: "/cart", element: <Cart /> }],
    },
    {
      path: "/checkout",
      element: (
        <div>
          <Navbar />
          {notification_status.active && (
            <Notification ninfo={notification_status} />
          )}
          {auth && cartstate && <Sidecart />}
          {auth && cartlength > 0 && <Outlet />}
          {auth && cartlength === 0 && <NotLoggedInPage state="outofcart" />}
          <Footer />
        </div>
      ),
      children: [{ path: "/checkout", element: <Checkout /> }],
    },
    {
      path: "/OrderPlaced",
      element: (
        <div>
          {orderplaced && <Outlet />}
          {!orderplaced && <Notfound />}
        </div>
      ),
      children: [{ path: "/OrderPlaced", element: <OrderPlaced /> }],
    },
  ]);

  return routes;
}

export default AppRoutes;
