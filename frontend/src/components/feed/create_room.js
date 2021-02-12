import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import "./create_room.css";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
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
    backgroundColor: "rgb(101, 101, 118)",
    color: "white",
  },
});

const CreateRoomForm = (props) => {
  const [roomName, setRoomName] = useState('');
  const [roomAccess, setRoomAccess] = useState('');
  const [roomPath, setRoomPath] = useState('');

  const classes = useStyles();

  const handleCreateRoom = () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({
      withCredentials: true,
      name: roomName,
      access: roomAccess
    });

    axios.post(`${process.env.API_URL}/api/rooms/create/`, body, config)
      .then(response => {
        console.log(response.data);
        if (response.data.room_id) {
          props.history.push('/room/' + response.data.room_id)
        }
      })
      .catch(err => {console.log(err);});
  };

  return (
    <div className="createroom">
      <Dialog
        open={props.open}
        onClose={props.handleCreateRoomClose}
        aria-labelledby="form-dialog-title"
        className={classes.container}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title" className={classes.container}>
          Create a room
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "rgb(101, 101, 118)" }}>
          <FormControl style={{ width: "100%" }}>
            <form noValidate autoComplete="off">
              <CSRFToken />
              <TextField
                className={classes.textInput}
                id="name"
                label="Name"
                variant="filled"
                required={true}
                inputProps={{ className: classes.input }}
                InputLabelProps={{
                  style: { color: "rgb(225, 226, 230)" },
                }}
                onChange={(event) => {
                  setRoomName(event.target.value);
                }}
              />
              <Select
                className={classes.textInput}
                id="filled-basic"
                label="Access"
                variant="filled"
                required={true}
                inputProps={{ className: classes.input }}
                onChange={(event) => setRoomAccess(event.target.value)}
                InputLabelProps={{
                  style: { color: "rgb(225, 226, 230)" },
                }}
              >
                <MenuItem value="Private">Private</MenuItem>
                <MenuItem value="Public">Public</MenuItem>
              </Select>
              <Button
                onClick={props.handleCreateRoomClose}
                style={{ color: "white", marginTop: "20px", float: "right" }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleCreateRoom()}
                style={{ color: "white", marginTop: "20px", float: "right" }}
              >
                CREATE
              </Button>
            </form>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withRouter(CreateRoomForm);
