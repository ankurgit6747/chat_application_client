import React, { useEffect, useState } from 'react';
import { user } from '../Join/Join';
import socketIO from "socket.io-client";
import "./chat.css";
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";

// const ENDPOINT = 'http://localhost:4500/';
const ENDPOINT = 'https://chat-application-server-3ntjw3fb0-ankur02.vercel.app/';
let socket;

const Chat = () => {

 const [input, setInput] = useState("");

 const [id, setId] = useState("");
 const [messages, setMessages] = useState([])

 const send = () => {
  const message = document.getElementById('chatInput').value;
  socket.emit('message', {message, id})
   document.getElementById('chatInput').value = "";
 }

 useEffect(() => {
  socket = socketIO(ENDPOINT, { transports: ['websocket'] });

  socket.on('connect', () => {
    // alert('connected')
    setId(socket.id);
  })
  socket.emit('joined', {user }) // sending datat to backend 

  socket.on('welcome', (data) => {
    setMessages([...messages, data])
    console.log(data.user, data.message)
  })

  socket.on('userJoined', (data) => {
    setMessages([...messages, data])
    console.log(data.user, data.message)
  })

  socket.on('leave', (data) => {
    setMessages([...messages, data])
    console.log(data.user, data.message)
  })
  return () =>  {
    socket.emit('disconnectUser');
    socket.off();
  }
 }, [])

 useEffect(() => {
  socket.on('sendMessage', (data) => {
    setMessages([...messages, data])
    console.log(data.user, data.message, data.id)
  })
  return () => {
    socket.off();
  }
 }, [messages])

  return (
    <div className='chatPage'>
      <div className="chatContainer">
        <div className="header">
          <h2>Chat Application</h2>
        </div>
        <ReactScrollToBottom className='chatBox'>
          {messages.map((item, i) => <>
            <Message message={item.message} user={item.id === id ? '' : item.user} key={i} classs={item.id === id ? 'right' : 'left'} />
          </>)}
        </ReactScrollToBottom>
        <div className='inputBox'>
          <input type="text" id="chatInput" placeholder='enter message' input={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={send} className='sendBtn'>Send</button>
        </div>
      </div>
     
    </div>
  )
}

export default Chat