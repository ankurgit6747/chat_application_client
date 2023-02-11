import React, { useState } from 'react';
import "./join.css";
import { Link } from 'react-router-dom';

let user;

const Join = () => {
  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
  }

  const [name, setName] = useState("");


  return (
    <div className="joinpage">
      <div className='joincontainer'>
        <h1>CHAT APPLICATION</h1>
        <input type="text" id="joinInput" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
        <Link to='/chat' onClick={(e) => !name ? e.preventDefault() : null}>
          <button onClick={sendUser} className="joinbtn">Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join;
export {user};