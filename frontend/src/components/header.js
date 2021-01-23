import React from "react";
import './header.css';
import {
    Typography,
    Button
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    button: {
      color: 'rgb(225, 226, 230)',
      backgroundColor: 'rgb(49, 49, 59)',
      marginTop: 'auto',
      marginBottom: 'auto',
      "&:hover": {
        backgroundColor: 'rgb(69, 69, 79)'
      }
    },
  }));


const Header = (props) => {
    const classes = useStyles();

  return (
    <div className="nav">
        <Typography variant='h2' 
        style={{ color: 'rgb(225, 226, 230)',
        display: 'inline-block' }}>hang</Typography>
        <div className="header-options">
            <Button
            className={classes.button}
            style={{ display: 'inline-block' }}
            size='large'
            variant="contained"
            color="primary">Logout</Button>
        </div>
    </div>
  );
}

export default Header;