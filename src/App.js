import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import useLoading from "./hooks/useLoading";
function App() {
 useLoading()
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
