import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import CreateRoomForm from "./create_room.js";
import "./your_hangs.css";

const useStyles = makeStyles({
  yourhangsbox: {
    backgroundColor: "rgb(69, 69, 82)",
    margin: "2rem",
    padding: "1rem",
    borderRadius: "2px",
    height: 'fit-content'
  },
  boxTitle: {
    color: "rgb(225, 226, 230)",
    marginBottom: "1.5rem",
  },
  listItem: {
      display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "rgb(48, 48, 63)",
    marginBottom: "1rem",
  },
  noRooms: {
    justifyContent: "center",
    backgroundColor: "rgb(58, 58, 73)",
    margin: 'auto'
  },
});

const YourHangs = (props) => {
  const classes = useStyles();

  const [usersRooms, setUsersRooms] = useState([]);
  const [savedRooms, setSavedRooms] = useState([]);

  useEffect(() => {
    getMyHangs();
  }, []);

  const getMyHangs = async () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `${process.env.API_URL}/api/rooms/myhangs`,
      config
    );
    if (res.data.success) {
      setSavedRooms(res.data.saved_rooms);
      setUsersRooms(res.data.users_rooms);
    } else {
      console.log("[ERROR] Could not get neccessary data.");
    }
  };
  return (
    <div className="yourhangs">
      <div className="yourhangs-grid">
        <Box className={classes.yourhangsbox}>
          <Typography variant="h4" className={classes.boxTitle}>
            Hangs You Manage
          </Typography>
          <List>
            {usersRooms.map((room) => (
              <ListItem className={classes.listItem}>
                <Button
                  style={{
                    color: "rgb(225, 226, 230)",
                    width: "100%",
                    height: "100%",
                  }}
                  component={Link}
                  to={`/room/${room.room_id}`}
                >
                  {room.room_name}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className={classes.yourhangsbox}>
          <Typography variant="h4" className={classes.boxTitle}>
            Your Hangs
          </Typography>
          <List>
            {savedRooms.length < 1 ? (
              <ListItem className={classes.noRooms}>
                <Typography
                  style={{
                    color: "rgb(225, 226, 230)",
                    textAlign: "center",
                  }}
                >
                  You don't have any saved hangs.
                </Typography>
              </ListItem>
            ) : (
              savedRooms.map((room) => (
                <ListItem className={classes.listItem}>
                  <Button
                    style={{
                      color: "rgb(225, 226, 230)",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {room.room_name}
                  </Button>
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </div>
    </div>
  );
};

export default YourHangs;
