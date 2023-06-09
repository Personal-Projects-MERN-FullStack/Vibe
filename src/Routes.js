import { Outlet, useRoutes } from "react-router";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Checkout from './pages/Chekout'
function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <div>
          <Outlet />
        </div>
      ),
      children: [
        {path:"/",element :<Home/>},
        { path: "/Product-search/:search", element: <ProductList /> },
        { path: "/Product/:id", element: <ProductList /> },
        {path:"/checkout",element:<Checkout/>}
    
    ],
    },
  ]);
  return routes;
}

export default AppRoutes;
