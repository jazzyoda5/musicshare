import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { makeStyles } from "@material-ui/core/styles";
import { Box, ListItem, ListItemText } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import PersonIcon from '@material-ui/icons/Person';
import { Link, useRouteMatch } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import CSRFToken from "../../csrf_token";

const useStyles = makeStyles({
  nav: {
    backgroundColor: 'rgb(69, 69, 82)',
    borderRadius: '4px',
    height: '100%',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgb(89, 89, 102)',
    borderRightColor: 'rgba(0, 0, 0, 0)'
  },
  title: {
    color: 'rgb(225, 226, 230)',
    margin: '1rem',
    padding: '1rem',
    borderRadius: '2px',
    backgroundColor: 'rgb(46, 46, 63)',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgb(100, 100, 120)',
  },
  participantsBox: {
    backgroundColor: 'rgb(46, 46, 63)',
    margin: '1rem',
  },
  participant: {
    display: 'flex',
    backgroundColor: 'rgb(56, 56, 73)',
    margin: '0.5rem',
    textAlign: 'center'
  }
});

const LeftRoomNav = (props) => {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.nav}>
        <Typography variant='h4' className={classes.title}>{props.roomName}</Typography>
        <Button
        variant='contained'
        style={{
          color: "rgb(225, 226, 230)",
          backgroundColor: 'rgb(56, 56, 73)',
          marginBottom: '2rem'
        }}
        >Save This Hang</Button>
        <Box className={classes.participantsBox}>
          <List component='ul' >
          <Typography variant='h6' style={{ marginBottom: '1rem' }}>Participants</Typography>
          {props.participants.map(user => (
            <Box className={classes.participant}>
              <ListItem>
                <ListItemText style={{ textAlign: 'center' }}>
                  <Typography variant='body1'>{user}</Typography>
                </ListItemText>           
              </ListItem>
            </Box>
          ))}
        </List>
        </Box>
        
    </Box>
  );
};


export default LeftRoomNav;