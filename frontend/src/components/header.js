import React from "react";
import './header.css';
import {
    Typography,
    Button,
    IconButton
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from '@material-ui/icons/Person';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import CSRFToken from '../csrf_token';

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


const Header = ({ logout }) => {
  const classes = useStyles();

  function handleLogout() {
      logout();
  }

  return (
    <div className="nav">
        <Typography variant='h2' 
        style={{ color: 'rgb(225, 226, 230)',
        display: 'inline-block' }}>hang</Typography>
        <div className="header-options">
            <CSRFToken />
            <Button
            style={{ 
              display: 'inline-block',
              color: 'rgb(225, 226, 230)',
              marginRight: '1rem'
            }}
            size='large'
            component={Link}
            to='/feed'>Home</Button>
            <Button
            className={classes.button}
            style={{ display: 'inline-block',
              marginRight: '1rem'
            }}
            size='large'
            variant="contained"
            color="primary"
            onClick={() => handleLogout()}
            component={Link}
            to='/'>Logout</Button>
            <IconButton
            size="large"
            style={{ 
              display: 'inline-flex',
              fontSize: '30px', 
              color: 'rgb(225, 226, 230)' ,
              backgroundColor: 'rgb(70, 70, 80)'
            }}
          ><PersonIcon style={{ fontSize: 'inherit' }} /></IconButton>
        </div>
    </div>
  );
}


export default connect(null, { logout })(Header);