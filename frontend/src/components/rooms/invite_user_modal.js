import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {
  Modal,
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Button,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
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
    backgroundColor: "rgb(56, 56, 73)",
    width: "100%",
    marginBottom: "1rem",
  },
  table: {
    width: "100%",
    backgroundColor: "rgb(46, 46, 63)",
    color: "white",
    borderBottom: "none",
    outlineBottom: "none",
  },
});

const InviteUserModal = (props) => {
  const { inviteUser, openInviteModal, closeInviteModal, roomId } = props;
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [noMatchFound, setNoMatchFound] = useState(false);
  const [modalSearchBar, setModalSearchBar] = useState(null);

  const searchForUsers = async () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        username: modalSearchBar,
      },
    };
    const res = await axios.get(
      `${process.env.API_URL}/accounts/finduser`,
      config
    );

    if (res.data.success) {
      if (res.data.users.length > 0) {
        setUsers(res.data.users);
        setNoMatchFound(false);
      } else {
        setUsers([]);
        setNoMatchFound(true);
      }
    } else if (res.data.error) {
      console.log(res.data.error);
    }
  };

  const sendInvitation = async (username) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    const body = JSON.stringify({ username, roomId });

    const res = await axios.post(
        `${process.env.API_URL}/accounts/invite/`,
        body,
        config
      );
    
      if (res.data.success) {
          closeInviteModal();
      }
      else if (res.data.error) {
          console.log(res.data.error);
      }

  };

  return (
    <Modal
      open={inviteUser}
      onClose={closeInviteModal}
      aria-labelledby="invite-user-modal"
      aria-describedby="invite-user-modal"
    >
      <Box className={classes.inviteUserModal}>
        <Box
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          <TextField
            className={classes.searchBar}
            id="search-bar"
            label="Search Username"
            variant="filled"
            onChange={(e) => setModalSearchBar(e.target.value)}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{
              style: { color: "rgb(225, 226, 230)" },
            }}
          />
          <IconButton
            onClick={() => searchForUsers()}
            variant="contained"
            style={{ color: "white", marginLeft: "1rem" }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        {users.length > 0 ? (
          <TableContainer
            component={Paper}
            style={{ backgroundColor: "rgb(46, 46, 63)" }}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Results</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        color: "rgb(225, 226, 230)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <AccountBoxIcon />
                      <Typography variant="body1">{user}</Typography>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(50, 50, 65)",
                          color: "white",
                        }}
                        onClick={() => sendInvitation(user)}
                      >
                        Invite
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
        {noMatchFound === true ? (
          <Typography
            variant="h6"
            style={{
              color: "white",
              marginTop: "2rem",
            }}
          >
            No match found.
          </Typography>
        ) : null}
      </Box>
    </Modal>
  );
};

export default InviteUserModal;
