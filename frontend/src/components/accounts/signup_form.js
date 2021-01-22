import React from "react";
import { useState } from "react";
import {
  FormControl,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./signup_form.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    padding: "7vh",
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

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export default function LoginForm(props) {
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);


  const handleLogin = () => {
    console.log(username, email, password, password2)
  }

  return (
    <div className="signup-form">
      <FormControl>
        <form className={classes.root} noValidate autoComplete="off">
          <div className="header">
            <Typography className={classes.header} variant="h3">
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
          <TextField
            type="confirm-password"
            className={classes.textInput}
            id="filled-basic"
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
          />
          <Button
            variant="contained"
            className="login-but"
            size="large"
            color="primary"
            onClick={() => {
              handleLogin();
            }}
          >
            Create Account
          </Button>
        </form>
      </FormControl>
    </div>
  );
}