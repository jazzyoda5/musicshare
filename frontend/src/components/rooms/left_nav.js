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

const useStyles = makeStyles({
  nav: {
    backgroundColor: 'rgb(40, 40, 54)',
    borderRadius: '4px',
    height: '100%',
    width: '100%'
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
  }
});

const LeftRoomNav = (props) => {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.nav}>
        <Typography variant='h4' className={classes.title}>{props.roomName}</Typography>
    </Box>
  );
};


export default LeftRoomNav;