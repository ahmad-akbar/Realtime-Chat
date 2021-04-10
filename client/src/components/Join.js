import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Join } from '../store/action'

export default function SignIn() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [join, setJoin] = useState({
    name: '',
    room: ''
  });

  function handleInputChange(e) {
    const { value, name } = e.target;
    setJoin({ ...join, [name]: value });
  }

  function joinToChat (e) {
    if (!join.name || !join.room){
      e.preventDefault()
    } else {
      let payload = {name: join.name, room: join.room}
      dispatch(Join(payload))
      history.push(`/chat/${join.name}/${join.room}`)
    }
  }

  return (
    <center>
      <div className="container" style={{position: 'relative', marginTop: '100px', backgroundColor: 'blue', width: '600px', border: '3px solid white', borderRadius: '10px'}}>
        <h1 className="heading" style={{marginTop: '15px'}}>Join to Chat</h1>
        <div>
          <input placeholder="Name" name="name" style={{borderRadius: '5px', padding: '15px 20px', width: '40%'}} type="text" onChange={(event) => handleInputChange(event)} />
        </div>
        <div>
          <select style={{borderRadius: '5px', padding: '15px 20px', width: '40%', marginTop: '10px'}} name="room" onChange={(event) => handleInputChange(event)}>
            <option selected disabled > -- Choose Chat Room -- </option>
            <option value="Global">Global</option>
            <option value="Private">Private</option>
          </select>
        </div>
          <button onClick={e => joinToChat(e)} style={{borderRadius: '5px', padding: '10px', color: '#fff !important', backgroundColor: 'lightblue', display: 'inline-block', textTransform: 'uppercase', textDecoration: 'none', width: '40%', marginTop: '20px', marginBottom: '30px'}} type="submit">Sign In</button>
      </div>
    </center>
  );
}