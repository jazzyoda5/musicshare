import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, useRouteMatch } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import CSRFToken from "../csrf_token";

const useStyles = makeStyles({

});

const Room = (props) => {
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
        <h1>Room</h1>
        <h3>{roomId}</h3>
        <h3>{roomName}</h3>
        <h3>{roomCreator}</h3>
    </div>
  );
};


export default Room;