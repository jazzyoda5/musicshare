import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./home.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    "& > *": {
      margin: "auto",
      backgroundColor: "rgb(70, 70, 83)",
      width: "100%",
      height: "100%",
    },
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
    </div>
  );
}
