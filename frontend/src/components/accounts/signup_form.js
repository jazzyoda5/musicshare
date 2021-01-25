import React from "react";
import { useState } from "react";
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  FormControl,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./signup_form.css";
import CSRFToken from '../../csrf_token';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    padding: "7vh",
    paddingTop: '0'
  },
  header: {
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


const SignupForm = ({ signup, isAuthenticated }) => {
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const [accountCreated, setAccoutnCreated] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);


  const handleSignup = () => {
    if (password === password2) {
      signup(email, username, password, password2);
      setAccoutnCreated(true);
    } else {
      setPasswordMismatch(true);
    }
  }

  if (isAuthenticated) {
    return (<Redirect to='/feed' />);
  }

  if (accountCreated) {
    return (<Redirect to='/login' />);
  }


  return (
    <div className="signup-form">
      <Button component={Link} to="/" 
      startIcon={<ArrowBackIcon style={{ fontSize: '3rem', 
      color: 'rgba(225, 226, 230, 0.4)', marginRight: '-0.7rem' }}/>}
      style={{ display: 'flex', width: 'fit-content', marginLeft: '1rem' }}></Button>
      <FormControl>
        <form className={classes.root} noValidate autoComplete="off">
          <CSRFToken />
          <div className="header">
            <Typography className={classes.header} variant="h2">
              hang
            </Typography>
          </div>
          <TextField
            className={classes.textInput}
            id="username"
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
            className={classes.textInput}
            id="email"
            label="Email"
            variant="filled"
            required={true}
            inputProps={{ className: classes.input }}
            InputLabelProps={{
              style: { color: "rgb(225, 226, 230)" },
            }}
            onChange={event => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            type="password"
            className={classes.textInput}
            id="password"
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
          {passwordMismatch ?
          <TextField
          error
          helperText='Passwords do not match.'
          type="password"
          className={classes.textInput}
          id="confirm-password"
          label="Confirm Password"
          variant="filled"
          required={true}
          inputProps={{ className: classes.input }}
          InputLabelProps={{
            style: { color: "rgb(225, 226, 230)" },
          }}
          onChange={event => {
            setPassword2(event.target.value);
          }}
        />:
        <TextField
            type="password"
            className={classes.textInput}
            id="confirm-password"
            label="Confirm Password"
            variant="filled"
            required={true}
            inputProps={{ className: classes.input }}
            InputLabelProps={{
              style: { color: "rgb(225, 226, 230)" },
            }}
            onChange={event => {
              setPassword2(event.target.value);
            }}
          />}
          <Button
            variant="contained"
            className="login-but"
            size="large"
            color="primary"
            onClick={() => {
              handleSignup();
            }}
          >
            Create Account
          </Button>
        </form>
      </FormControl>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(null, { signup })(SignupForm);