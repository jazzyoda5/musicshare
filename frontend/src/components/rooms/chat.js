import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, TextField } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import Typography from "@material-ui/core/Typography";
import { Link, useRouteMatch } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import CSRFToken from "../../csrf_token";

const useStyles = makeStyles({
  mainInputDiv: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    height: '60%',
    backgroundColor: 'rgb(55, 55, 75)',
    margin: 'auto',
    color: 'white'
  },
  input: {
    flex: 1,
    color: 'rgb(200, 200, 230)'
  },
  iconButton: {
    padding: 10,
    color: 'rgb(200, 200, 230)'
  },
  divider: {
    height: 28,
    margin: 4,
  },
  chat: {
    display: 'grid',
    gridTemplateRows: '85% 15%',
    backgroundColor: 'rgb(140, 140, 160)',
    borderRadius: '4px',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  textInput: {
    width: '80%',
    backgroundColor: 'rgb(200, 200, 230)',
    borderRadius: '3px',
    marginBlock: 'auto',
    marginLeft: 'auto'
  },
  sendButton: {
    backgroundColor: 'rgb(80, 80, 120)',
    height: '60%',
    marginBlock: 'auto',
    marginRight: 'auto',
    '& :hover': {
      color: 'black'
    },
  },
  messageWindow: {
    backgroundColor: 'rgb(166, 166, 184)',
    height: '100%'
  }
});

const CssTextField = withStyles({
  root: {
    height: '60%',
    '& label.Mui-focused': {
      color: 'rgb(170, 170, 190)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(170, 170, 190)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(170, 170, 190)',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(170, 170, 190)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(170, 170, 190)',
      },
    },
  },
})(TextField);

const Chat = (props) => {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.chat}>
      <Box className={classes.messageWindow}><p>MessageWindow</p></Box>
      <Box style={{ display: 'flex', backgroundColor: 'rgb(40, 40, 54)', height: '100%' }}>
      <Paper component="form" className={classes.mainInputDiv}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Send a Message"
        inputProps={{ className: classes.input }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SendIcon />
      </IconButton>
    </Paper>
      </Box>
    </Box>
  );
};


export default Chat;