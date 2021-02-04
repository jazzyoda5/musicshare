import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import { Link, useRouteMatch } from "react-router-dom";
import CSRFToken from "../../csrf_token";
import LeftRoomNav from './left_nav';
import Chat from './chat';
import './room.css';

const useStyles = makeStyles({
  box: {
    display: 'grid',
    gridTemplateColumns: '30% 70%',
    height: '100%',
    maxWidth: '1300px',
    margin: 'auto',
  }
});

const Room = (props) => {
  const classes = useStyles();
  let match = useRouteMatch();
  const username = useSelector(state => state.auth.username)

  const [roomId, setRoomId] = useState(match.params.room_id);
  const [roomName, setRoomName] = useState('');
  const [roomCreator, setRoomCreator] = useState('');
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);

  const socket = new WebSocket(`${process.env.SOCKET_URL}/ws/room/${roomId}/`)
  
  useEffect(() => {
    getRoomData();

    socket.onopen = function(e) {
      console.log('[SOCKET] Connected.', socket);
    }

    socket.onclose = function(e) {
      console.error('[SOCKET] Disconnected unexpectedly.');
    }

  }, []);

  useEffect(() => {
    socket.onmessage = function(e) {
      let data = JSON.parse(e.data);
      let message = data.message;
      setMessages([...messages, message]);
      console.log('[SOCKET] Message recieved. ');
    }
    return (() => {
      socket.onmessage = null;
    });

  }, [messages])


  const getRoomData = () => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
    };

    const body = JSON.stringify({
        'room_id': roomId
    })

    axios.post(`${process.env.API_URL}/api/rooms/get_data/`, body, config)
      .then(response => {
        console.log(response.data);
        setRoomCreator(response.data.room_creator);
        setRoomName(response.data.room_name);
      })
      .catch(err => {console.log(err);});
  }

  const sendMessage = (message) => {
    event.preventDefault();
    console.log('Messages at send', messages);
    socket.send(JSON.stringify({
      'message': {
        'content': message,
        'sender': username
      }
    }));
  }

  const updateMessages = (message) => {

      let content = message.content;
      let sender = message.sender;
      var updated_messages = JSON.parse(JSON.stringify(messages));
      updated_messages.push({
        content: content,
        sender: sender
      });
    return updated_messages;
  }

  return (
    <div className="room">
        <CSRFToken />
        <Box component="div" m={1} className={classes.box}>
          <LeftRoomNav roomName={roomName}/>
          <Chat sendMessage={sendMessage} messages={messages} />
        </Box>
    </div>
  );
};


export default Room;