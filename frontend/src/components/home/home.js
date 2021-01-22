import React from "react";
import { Typography, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import "./home.css";

const useStyles = makeStyles((theme) => ({
  button: {
    borderColor: "rgba(225, 226, 230, 0.3)",
  },
}));

export default function Home(props) {
  const classes = useStyles();

  return (
    <div className="home-div">
      <div className="title">
        <Typography variant="h1" component="h1">
          hang
        </Typography>
      </div>
      <div className="buttons">
        <Button
          size="large"
          variant="outlined"
          className={classes.button}
          component={Link}
          to="login/"
          style={{ color: "rgb(225, 226, 230)" }}
        >
          Login
        </Button>
        <Button
          size="large"
          variant="outlined"
          className={classes.button}
          component={Link}
          to="signup/"
          style={{ color: "rgb(225, 226, 230)" }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
