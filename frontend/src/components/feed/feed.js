import React, { useState } from "react";
import axios from 'axios';
import "./feed.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import CreateRoomForm from './create_room.js';

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    justifySelf: "center",
    alignSelf: "center",
    padding: "1rem",
    marginBlock: "1rem",
    marginInline: "0.5rem",
    minHeight: "fit-content",
    width: '100vw',
    maxWidth: 345,
    backgroundColor: "rgb(69, 69, 82)",
  },
  text: {
    color: "rgb(225, 226, 230)",
  },
  button: {
    color: 'white',
    backgroundColor: 'rgb(89, 89, 99)',
    "&:hover": {
      backgroundColor: 'rgb(99, 99, 109)'
    }
  }
});

const Feed = (props) => {
  const classes = useStyles();
  const [openNewRoomForm, setOpenNewRoomForm] = useState(false);
  console.log(openNewRoomForm);

  const openCreateRoomForm = () => {
    setOpenNewRoomForm(true);
  }

  const handleCreateRoom = (name, access) => {
    console.log(name, access);
  }

  const handleCreateRoomClose = () => {
    setOpenNewRoomForm(false)
  }

  return (
    <div className="feed">
      <div className="feed-menu">
        <Card className={classes.root}>
          <CardActionArea onClick={() => openCreateRoomForm()}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.text}
              >
                Create a hang
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
              >
                Create a chat room, invite friends, or make it public and let
                anyone join.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={() => openCreateRoomForm()}
            >
              Create a hang
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardActionArea  component={Link} to='/yourhangs' style={{ textDecoration: 'none' }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.text}
              >
                Your hangs
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
              >
                See the hangs you were invited to, or those you have previously joined.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="contained"
              className={classes.button}
              component={Link}
              to='/yourhangs'
            >
              Your Hangs
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.text}
              >
                Public hangs
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
              >
                Join one of the public hangs going on right now and meet new
                people. FEATURE NOT AVAILABLE!
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Find a hang
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Saved hangs
            </Button>
          </CardActions>
        </Card>        
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.text}
              >
                Find people
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.text}
              >
                Search for people you may know or add friends you just met in a
                hang. FEATURE NOT AVAILABLE!
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Find friends
            </Button>
          </CardActions>
        </Card>
      </div>
      <CreateRoomForm 
          open={openNewRoomForm} 
          handleCreateRoomClose={handleCreateRoomClose}
          />
    </div>
  );
};


export default Feed;
