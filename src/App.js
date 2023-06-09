import {useSelector} from 'react-redux'

function App() {
const counter = useSelector(state => state.counter)
  return (
  
  <>

  
  <div>{counter}</div>
  </>
  );
}

export default App;
