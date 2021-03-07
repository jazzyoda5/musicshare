import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from '@material-ui/core';
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import CSRFToken from "../../csrf_token";
import LeftRoomNav from './left_nav';
import Chat from './chat';
import './room.css';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: '1200px',
    minHeight: '600px',
    margin: 'auto'
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
  const [isRoomSaved, setIsRoomSaved] = useState(false);
  const [roomAccess, setRoomAccess] = useState(null);
  
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

      else if ( type === 'user_left' ) {
        let user = content;
        setParticipants(participants.filter(participant => participant !== user));
        console.log('[SOCKET] User left the room. -> ', user);
      }

      else if ( type === 'access_error' ) {
        // Access to room denied
        history.push('/feed');
      }

      else if ( type === 'get_room_data' ) {
        setRoomName(content.room_name);
        setRoomCreator(content.room_creator);
        setParticipants(content.participants);
        setIsRoomSaved(content.is_room_saved);
        setRoomAccess(content.room_access);
      }
    }

    return () => {
      socket.current.onmessage = null;
    };

  }, [messages, participants])


  const sendMessage = ( message ) => {
    event.preventDefault();

    // Do not send empty messages
    if (message.length < 1) return;
    
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
        <Grid container m={3} justify="center" className={classes.root}>
          <Grid item sm={3} xs={12}>
            <LeftRoomNav roomName={roomName}
            participants={participants}
            roomId={roomId}
            username={username}
            isRoomSaved={isRoomSaved}
            setIsRoomSaved={setIsRoomSaved}
            roomAccess={roomAccess}
          />
          </Grid>
          <Grid item sm={6} xs={12}>
          <Chat sendMessage={sendMessage} messages={messages} />
          </Grid>
        </Grid>
        
    </div>
  );
};


export default Room;