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
import { connect } from "react-redux";
import { login } from "../../actions/auth";


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


const LoginForm = ({ login }) => {
  const classes = useStyles();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmit = event => {
    event.preventDefault();
    console.log('jakob1');
    console.log('username ', username, 'password ', password);
    login(username, password);
  }

  return (
    <div className="login-form">
      <FormControl onSubmit={e => onSubmit(e)}>
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
            type="submit"
          >
            Login
          </Button>
        </form>
      </FormControl>
    </div>
  );
}

/*
const mapStateToProps = state => ({
  // is authenticated
}); */


export default connect(null, { login })(LoginForm);
