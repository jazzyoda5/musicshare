import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "./create_room.css";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CSRFToken from "../../csrf_token";
import Cookies from "js-cookie";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    justifySelf: "center",
    alignSelf: "center",
    padding: "1rem",
    marginBlock: "1rem",
    marginInline: "0.5rem",
    minHeight: "fit-content",
    maxWidth: 345,
    backgroundColor: "rgb(69, 69, 82)",
  },
  text: {
    color: "rgb(225, 226, 230)",
    backgroundColor: "rgb(49, 49, 59)",
  },
  textInput: {
    width: "100%",
    marginTop: "1rem",
    color: "white",
    backgroundColor: "rgb(68, 68, 86)",
  },
  input: {
    color: "rgb(225, 226, 230)",
  },
  button: {
    marginTop: "15%",
  },
  button: {
    color: "white",
    backgroundColor: "rgb(89, 89, 99)",
    "&:hover": {
      backgroundColor: "rgb(99, 99, 109)",
    },
  },
  container: {
    backgroundColor: "rgb(80, 80, 95)",
    color: "white",
  },
  pbHangs: {
    padding: "1rem",
    textAlign: "center",
    color: "white",
  },
});

const PublicRooms = (props) => {
  const [publicRooms, setPublicRooms] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    getPublicRooms();
  }, []);

  const getPublicRooms = async () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `${process.env.API_URL}/api/rooms/getpublicrooms/`,
      config
    );
    if (res.data.success) {
      setPublicRooms(res.data.rooms);
    } else {
      console.log("[ERROR] Could not get neccessary data.");
    }
  };

  return (
    <Box>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.container}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title" className={classes.container}>
          Public Hangs
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "rgb(80, 80, 95)" }}>
          <Box className={classes.pbHangs}>
            {publicRooms.length < 1 ? (
              <Typography
                style={{
                  color: "rgb(225, 226, 230)",
                  backgroundColor: "rgb(50, 50, 65)",
                  width: "100%",
                  height: "100%",
                  paddingBlock: '1rem'
                }}
              >
                There are currently no public hangs.
              </Typography>
            ) : (
              <Typography variant="body1" style={{ marginBottom: "0.5rem" }}>
                Just click on the hang you wish to join.
              </Typography>
            )}

            {publicRooms.map((room) => (
              <Button
                style={{
                  color: "rgb(225, 226, 230)",
                  backgroundColor: "rgb(50, 50, 65)",
                  width: "100%",
                  height: "100%",
                  marginBlock: "0.5rem",
                }}
                component={Link}
                to={`/room/${room.room_id}`}
              >
                {room.name}
              </Button>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default withRouter(PublicRooms);
