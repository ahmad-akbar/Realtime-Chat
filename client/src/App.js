import './App.css';
import Chat from './components/Socket';
import Join from './components/Join';
import { useEffect } from 'react';
import io from 'socket.io-client'
import { useDispatch } from 'react-redux';
import { setSocketConnect } from './store/action';

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(setSocketConnect(io.connect("http://localhost:3001")))
  }, [dispatch])

  return (
    <Router>
      <Route path="/chat/:name/:chatRoomName"> 
        <Chat/>
      </Route>
      <Route exact path="/"> 
        <Join/>
      </Route>
    </Router>
  );
}

export default App;
