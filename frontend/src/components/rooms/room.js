import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, useRouteMatch } from "react-router-dom";
import { connect, useSelector } from "react-redux";
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
  const [roomId, setRoomId] = useState(match.params.room_id);
  const [roomName, setRoomName] = useState('');
  const [roomCreator, setRoomCreator] = useState('');
  
  useEffect(() => {
    
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
  }, [])


  return (
    <div className="room">
        <CSRFToken />
        <Box component="div" m={1} className={classes.box}>
          <LeftRoomNav roomName={roomName}/>
          <Chat />
        </Box>
    </div>
  );
};


export default Room;