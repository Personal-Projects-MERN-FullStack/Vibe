import {useSelector} from 'react-redux'
import React  from 'react';


function App() {
const counter = useSelector(state => state.counter)
  return (
  
  <>


  <div>{counter}</div>
  </>
  );
}

export default App;
