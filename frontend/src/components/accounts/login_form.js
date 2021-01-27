import React from "react";
import { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  FormControl,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./login_form.css";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import CSRFToken from '../../csrf_token';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    padding: "7vh",
    paddingTop: '0'
  },
  title: {
    color: "rgb(225, 226, 230)",
  },
  textInput: {
    width: "100%",
    marginTop: "13%",
    color: "white",
    backgroundColor: "rgb(68, 68, 86)",
  },
  input: {
    color: "rgb(225, 226, 230)",
  },
  button: {
    marginTop: "15%",
  },
}));


const LoginForm = ({ login, isAuthenticated }) => {
  const classes = useStyles();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmit = event => {
    event.preventDefault();
    console.log('jakob1');
    console.log('username ', username, 'password ', password);
    login(username, password);
  }

  if (isAuthenticated) {
    console.log('logged in. redirect to feed.');
    return (<Redirect to='/feed' />)
  }
  return (
    <div className="login-form">
      <Button component={Link} to="/" 
      startIcon={<ArrowBackIcon style={{ fontSize: '3rem', 
      color: 'rgba(225, 226, 230, 0.4)', marginRight: '-0.7rem' }}/>}
      style={{ display: 'flex', width: 'fit-content', marginLeft: '1rem' }}></Button>
      <FormControl onSubmit={e => onSubmit(e)}>
        <form className={classes.root} noValidate autoComplete="off">
          <CSRFToken />
          <div className="header">
            <Typography className={classes.title} variant="h2">
              hang
            </Typography>
          </div>
          <TextField
            className={classes.textInput}
            id="password"
            label="Username"
            variant="filled"
            required={true}
            inputProps={{ className: classes.input }}
            InputLabelProps={{
              style: { color: "rgb(225, 226, 230)" },
            }}
            onChange={event => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            type="password"
            className={classes.textInput}
            id="filled-basic"
            label="Password"
            variant="filled"
            required={true}
            inputProps={{ className: classes.input }}
            InputLabelProps={{
              style: { color: "rgb(225, 226, 230)" },
            }}
            onChange={event => {
              setPassword(event.target.value);
            }}
          />
          <Button
            variant="contained"
            className="login-but"
            size="large"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </form>
      </FormControl>
    </div>
  );
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login })(LoginForm);
