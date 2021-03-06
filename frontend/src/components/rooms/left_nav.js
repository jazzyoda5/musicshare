import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import InviteUserModal from "./invite_user_modal";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  ListItem,
  ListItemText,
  IconButton,
  Modal,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import PersonIcon from "@material-ui/icons/Person";
import { Link, useRouteMatch } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const useStyles = makeStyles({
  nav: {
    backgroundColor: "rgb(93, 93, 109)",
    borderRadius: "4px",
    height: "100%",
    width: "100%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgb(89, 89, 102)",
    borderRightColor: "rgba(0, 0, 0, 0)",
    padding: 0,
  },
  topOfNav: {
    padding: '1rem',
    height: '30%'
  },
  title: {
    color: "rgb(225, 226, 230)",
    padding: "1rem",
    borderRadius: "2px",
    backgroundColor: "rgb(46, 46, 63)",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgb(100, 100, 120)",
    marginBottom: '0.5rem',
  },
  participantsBoxParent: {
    height: '70%',
    margin: 0,
    padding: '1rem',
  },
  participantsBoxChild: {
    backgroundColor: "rgb(46, 46, 63)",
    maxHeight: '80%',
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgb(100, 100, 120)",
  },
  participant: {
    display: "flex",
    backgroundColor: "rgb(56, 56, 73)",
    margin: "0.5rem",
    textAlign: "center",
    color: "rgb(225, 226, 230)",
  },
  inviteUserModal: {
    width: "100vw",
    maxWidth: "500px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(69, 69, 82)",
    outline: "none",
    justifyContent: "center",
    textAlign: "center",
    padding: "2rem",
    borderRadius: "2px",
  },
  searchBar: {
    backgroundColor: "rgb(68, 68, 86)",
    width: "100%",
  },
});

const LeftRoomNav = (props) => {
  const {
    participants,
    roomName,
    roomId,
    username,
    isRoomSaved,
    setIsRoomSaved,
    roomAccess,
  } = props;
  const classes = useStyles();
  const [inviteUser, setInviteUser] = useState(false);

  const saveThisHang = async () => {
    console.log("Save this hang. -> ", roomId, username);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const body = JSON.stringify({ roomId, username });

    const res = await axios.post(
      `${process.env.API_URL}/api/rooms/saveroom/`,
      body,
      config
    );

    if (res.data.success) {
      console.log(res.data.success);
      setIsRoomSaved(true);
    } else {
      console.log("Fail");
    }
  };

  const deleteSavedRoom = async (room_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({ room_id });
    const res = await axios.post(
      `${process.env.API_URL}/api/rooms/deletesavedroom/`,
      body,
      config
    );

    if (res.data.success) {
      console.log("Success");
      setIsRoomSaved(false);
    } else if (res.data.error) {
      console.log(res.data.error);
    }
  };

  const openInviteModal = () => {
    setInviteUser(true);
  };

  const closeInviteModal = () => {
    setInviteUser(false);
  };

  return (
    <Box component="div" className={classes.nav}>
      <Box className={classes.topOfNav}>
      {roomAccess === "Private" ? (
        <Typography
          variant="subtitle1"
          style={{ paddingTop: "1rem", color: "rgb(225, 226, 230)" }}
        >
          Private Room
        </Typography>
      ) : null}
      <Typography variant="h4" className={classes.title}>
        {roomName}
      </Typography>
      {isRoomSaved ? (
        <Button
          variant="contained"
          style={{
            color: "rgb(225, 226, 230)",
            backgroundColor: "rgb(56, 56, 73)",
          }}
          onClick={() => {
            deleteSavedRoom(roomId);
          }}
        >
          Hang Saved
          <CheckBoxIcon
            style={{ marginLeft: "1rem", color: "rgb(84, 84, 199)" }}
          />
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{
            color: "rgb(225, 226, 230)",
            backgroundColor: "rgb(56, 56, 73)",
          }}
          onClick={() => {
            saveThisHang();
          }}
        >
          Save This Hang
        </Button>
      )}
      </Box>
      <Box className={classes.participantsBoxParent}>
        <Box className={classes.participantsBoxChild}>
        <List component="ul">
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              style={{ color: "rgb(225, 226, 230)", paddingLeft: "1rem" }}
            >
              Participants
            </Typography>
            <IconButton
              onClick={() => openInviteModal()}
              style={{ color: "rgb(84, 84, 199)", float: "end" }}
            >
              <PersonAddIcon />
            </IconButton>
            {inviteUser ? (
              <InviteUserModal
                inviteUser={inviteUser}
                openInviteModal={openInviteModal}
                closeInviteModal={closeInviteModal}
                roomId={roomId}
              />
            ) : null}
          </Box>
          {participants.map((user) => (
            <Box className={classes.participant}>
              <ListItem>
                <ListItemText style={{ textAlign: "center" }}>
                  <Typography variant="body1">{user}</Typography>
                </ListItemText>
              </ListItem>
            </Box>
          ))}
        </List>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftRoomNav;
