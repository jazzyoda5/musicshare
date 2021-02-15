import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
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
    height: "fit-content",
  },
  boxTitle: {
    color: "rgb(225, 226, 230)",
    marginBottom: "1.5rem",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(48, 48, 63)",
    marginBottom: "1rem",
  },
  noRooms: {
    justifyContent: "center",
    backgroundColor: "rgb(58, 58, 73)",
    margin: "auto",
  },
});

const getConfig = () => {
  return ({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  });
}
const YourHangs = (props) => {
  const classes = useStyles();

  const [usersRooms, setUsersRooms] = useState([]);
  const [savedRooms, setSavedRooms] = useState([]);
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    getMyData();
  }, []);

  const getMyData = async () => {
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
      setInvitations(res.data.invitations);
    } else {
      console.log("[ERROR] Could not get neccessary data.");
    }
  };

  const deleteUsersRoom = async (room_id) => {
    const config = getConfig();
    const body = JSON.stringify({ room_id });

    const res = await axios.post(
      `${process.env.API_URL}/api/rooms/deleteroom/`,
      body,
      config
    );

    if (res.data.success) {
      setUsersRooms(usersRooms.filter((room) => room.room_id !== room_id));
    } else if (res.data.error) {
      console.log(res.data.error);
    }
  };

  const deleteSavedRoom = async (room_id, sender) => {
    const config = getConfig();
    const body = JSON.stringify({ room_id });

    const res = await axios.post(
      `${process.env.API_URL}/api/rooms/deletesavedroom/`,
      body,
      config
    );

    if (res.data.success) {
      console.log("Success");
      setSavedRooms(savedRooms.filter((room) => room.room_id !== room_id));
    } else if (res.data.error) {
      console.log(res.data.error);
    }
  };

  const acceptInvite = async (invite_id) => {
    const config = getConfig();
    const body = JSON.stringify({ invite_id });

    const res = await axios.post(
      `${process.env.API_URL}/accounts/acceptinvite/`,
      body,
      config
    );

    if (res.data.success) {
      let data = res.data;
      // Add room to saved rooms and remove it from invites
      setSavedRooms([...savedRooms, {'room_id': data.room_id, 'room_name': data.room_name}])
      setInvitations(invitations.filter((invite) => invite.invite_id !== invite_id));
    } else if (res.data.error) {
      console.log(res.data.error);
    }
  }

  const declineInvite = async (invite_id) => {
    const config = getConfig();
    const body = JSON.stringify({ invite_id });

    const res = await axios.post(
      `${process.env.API_URL}/accounts/declineinvite/`,
      body,
      config
    );

    if (res.data.success) {
      setInvitations(invitations.filter((invite) => invite.invite_id !== invite_id));
    } else if (res.data.error) {
      console.log(res.data.error);
    }
  }

  return (
    <div className="yourhangs">
      <div className="yourhangs-grid">
        <Box className={classes.yourhangsbox}>
          <Typography variant="h5" className={classes.boxTitle}>
            Pending Invitations
          </Typography>
          <List>
            {invitations.length < 1 ? (
              <ListItem className={classes.noRooms}>
                <Typography
                  style={{
                    color: "rgb(225, 226, 230)",
                    textAlign: "center",
                  }}
                >
                  You don't have any pending invitations.
                </Typography>
              </ListItem>
            ) : (
              invitations.map((invite) => (
                <ListItem className={classes.listItem}>
                  <Typography
                    variant="body1"
                    style={{
                      color: "rgb(225, 226, 230)",
                      textAlign: "center",
                    }}
                  >
                    <strong>{invite.room_name}</strong> from{" "}
                    <strong>{invite.sender}</strong>
                  </Typography>
                  <IconButton
                    style={{ color: "green" }}
                    onClick={() => acceptInvite(invite.invite_id)}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    style={{ color: "gray" }}
                    onClick={() => declineInvite(invite.invite_id)}
                  >
                    <ClearIcon />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>
        </Box>
        <Box className={classes.yourhangsbox}>
          <Typography variant="h5" className={classes.boxTitle}>
            Hangs You Manage
          </Typography>
          <List>
            {usersRooms.length < 1 ? (
              <ListItem className={classes.noRooms}>
                <Typography
                  style={{
                    color: "rgb(225, 226, 230)",
                    textAlign: "center",
                  }}
                >
                  You haven't created any hangs.
                </Typography>
              </ListItem>
            ) : (
              usersRooms.map((room) => (
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
                  <IconButton
                    style={{ color: "rgb(64, 64, 199)" }}
                    onClick={() => deleteUsersRoom(room.room_id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>
        </Box>
        <Box className={classes.yourhangsbox}>
          <Typography variant="h5" className={classes.boxTitle}>
            Saved Hangs
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
                    component={Link}
                    to={`/room/${room.room_id}`}
                  >
                    {room.room_name}
                  </Button>
                  <IconButton
                    style={{ color: "rgb(64, 64, 199)" }}
                    onClick={() => deleteSavedRoom(room.room_id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
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
