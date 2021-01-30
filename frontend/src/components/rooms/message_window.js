import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const useStyles = makeStyles({
  list: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  messageContainer: {
    backgroundColor: "rgb(74, 74, 219)",
    maxWidth: "60%",
    marginRight: 0,
    padding: "1rem",
    borderRadius: "7px",
    width: "fit-content",
  },
  sender: {
      color: 'rgb(220, 220, 240)',
  }
});

const MessageWindow = (props) => {
  const classes = useStyles();

  return (
    <div
      className="MessageWindow"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <List component="ul" className={classes.list}>
        <ListItem className={classes.message}>
          <Container className={classes.messageContainer}>
            <ListItemText>
                <Typography variant='body2' style={{ color: 'rgb(215, 215, 230)', marginBottom: '0.3rem' }}>jakobverlic</Typography>
                <Typography variant='body1'>Kak si??</Typography>
            </ListItemText>
          </Container>
        </ListItem>
    </List>
    </div>
  );
};

export default MessageWindow;
