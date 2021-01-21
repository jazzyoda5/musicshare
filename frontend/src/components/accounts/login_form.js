import React from "react";
import { useState } from "react";
import {
  FormControl,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./login_form.css";
import { createMuiTheme } from "@material-ui/core/styles";

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
  const [password, setPassword] = useState(null);

  const handleLoginData = () => {

  }

  const handleLogin = () => {

    console.log('csrf token: ', username);
    console.log('password: ', password);

    const csrftoken = getCookie('csrftoken');
    console.log('csrf token: ', csrftoken);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }

    fetch("/accounts/login/", fetchOptions)
      .then((response) => response.json())
      .then((data) => handleLoginData(data));
  }

  return (
    <div className="login-form">
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
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </Button>
        </form>
      </FormControl>
    </div>
  );
}
