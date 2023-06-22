import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import useLoading from "./hooks/useLoading";
import { useEffect } from "react";
import { useGetproducts } from "./hooks/useGetproducts";
function App() {
 useLoading()
 useGetproducts()
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
