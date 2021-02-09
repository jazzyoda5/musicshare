import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const color1 = "rgb(74, 74, 219)";
const color2 = "rgb(80, 80, 90)";

const useStyles = makeStyles({
  list: {
    width: "100%",
    maxHeight: '100%',
    position: "absolute",
    bottom: 0,
    padding: 0,
    overflow: 'auto'
  },
  messageContainer: {
    display: 'flex',
    minWidth: "12%",
    maxWidth: "60%",
    padding: "1rem",
    borderRadius: "7px",
    width: "min-content",
  },
  sender: {
    color: "rgb(220, 220, 240)",
  },
});

const MessageWindow = (props) => {
  const classes = useStyles();
  const user = useSelector(state => state.auth.username);
  
  return (
    <div
      className="MessageWindow"
      style={{ width: "100%", height: "100%", position: "relative"}}
    >
      <List component="ul" className={classes.list}>
        {props.messages.map(message => (
          
          <ListItem className={classes.message}>
            {(user === message.sender) ?
            <Container className={classes.messageContainer}
              style={{ backgroundColor: color1, marginRight: '1rem' }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  style={{
                    color: "rgb(215, 215, 230)",
                    marginBottom: "0.3rem",
                  }}
                >
                  {message.sender}
                </Typography>
                <Typography variant="body1">{message.content}</Typography>
              </ListItemText>
            </Container>

          :

            <Container className={classes.messageContainer}
              style={{ backgroundColor: color2, marginLeft: '1rem' }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  style={{
                    color: "rgb(215, 215, 230)",
                    marginBottom: "0.3rem",
                  }}
                >
                  {message.sender}
                </Typography>
                <Typography variant="body1">{message.content}</Typography>
              </ListItemText>
            </Container>
            }
          </ListItem>
          
          
        ))};
      </List>
    </div>
  );
};

export default MessageWindow;
