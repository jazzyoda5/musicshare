import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import CSRFToken from "../../csrf_token";
import LeftRoomNav from './left_nav';
import Chat from './chat';
import './room.css';

const useStyles = makeStyles({
  box: {
    display: 'grid',
    gridTemplateColumns: '30% 70%',
    height: '100%',
    maxWidth: '1000px',
    margin: 'auto',
  }
});



const Room = (props) => {
  const history = useHistory();
  const classes = useStyles();
  let match = useRouteMatch();
  const username = useSelector(state => state.auth.username)
  const socket = useRef();

  const [roomId, setRoomId] = useState(match.params.room_id);
  const [roomName, setRoomName] = useState('');
  const [roomCreator, setRoomCreator] = useState('');
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  
  
  useEffect(() => {
    socket.current = new WebSocket(`${process.env.SOCKET_URL}/ws/room/${roomId}/`)

    socket.current.onopen = function(e) {
      console.log('[SOCKET] Connected.', socket);

    }

    socket.current.onclose = function(e) {
      console.error('[SOCKET] Disconnected unexpectedly.');
    }

    return(() => {
      socket.current.close();
    })

  }, []);

  /* 
  The way I created custom events is
  data.message contains a param type
  that is the name of the custom event
  and data.content, which is the data that
  is relevant
  */

  useEffect(() => {
    if (!socket.current) return;

    socket.current.onmessage = function(e) {
      let data = JSON.parse(e.data);
      let type = data.message.type;
      let content = data.message.content;

      if ( type === 'message' ) {
        /* 
        format of messages is
        { content: {
          content: message,
          sender: username
        }}
        */
        let message = content;
        setMessages([...messages, message]);
        console.log('[SOCKET] Message recieved. -> ', message);
      }

      else if ( type === 'user_joined' ) {
        let new_user = content;
        setParticipants([...participants, new_user]);
        console.log('[SOCKET] New user joined the room. -> ', new_user);
      }

      else if ( type === 'access_error' ) {
        // Access to room denied
        history.push('/feed');
      }

      else if ( type === 'get_room_data' ) {
        setRoomName(content.room_name);
        setRoomCreator(content.room_creator);
        setParticipants(content.participants);
      }
    }

    return () => {
      socket.current.onmessage = null;
    };

  }, [messages, participants])


  const sendMessage = ( message ) => {
    event.preventDefault();
    if (socket.current) {
      socket.current.send(JSON.stringify({
        'message': {
          'type': 'message',
          'content': {
            'content': message,
            'sender': username
          }
        }
      }));
    }
  }


  return (
    <div className="room">
        <CSRFToken />
        <Box component="div" m={1} className={classes.box}>
          <LeftRoomNav roomName={roomName}
            participants={participants}
          />
          <Chat sendMessage={sendMessage} messages={messages} />
        </Box>
    </div>
  );
};


export default Room;