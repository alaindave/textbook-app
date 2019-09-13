import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Message from "../components/MessageComponent";

import NavBarProfile from "../components/NavBarProfile";

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    top: "80px"
  },

  subjectField: {
    width: "600px"
  },
  message: {
    width: "300px",
    height: "150px",
    borderColor: "#dfe3ee",
    borderStyle: "solid",
    marginBottom: "12px"
  },

  noMessage: {
    fontSize: "23px",
    color: "#3b5998	",
    position: "relative",
    top: "100px"
  }
}));

const ReceivedMessage = props => {
  const classes = useStyles();
  const { receivedMessages, friends } = props.location.state;
  const profileID = window.localStorage.getItem("userID");

  return (
    <div>
      <NavBarProfile friends={friends} />
      <div className={classes.container}>
        <Grid container direction="column" alignItems="center">
          {receivedMessages.length !== 0 ? (
            receivedMessages.map(message => (
              <Grid key={message._id} item className={classes.message}>
                <Link
                  to={{
                    pathname: `/profile/${profileID}/messages/${message._id}`,
                    state: {
                      avatar: message.author.profileUrl,
                      authorID: message.author._id,
                      firstName: message.author.firstName,
                      lastName: message.author.lastName,
                      message: message.message,
                      from: true,
                      friends
                    }
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Message
                    avatar={message.author.profileUrl}
                    firstName={message.author.firstName}
                    lastName={message.author.lastName}
                    subject={message.subject}
                  />
                </Link>
              </Grid>
            ))
          ) : (
            <span className={classes.noMessage}>No messages to display!</span>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default ReceivedMessage;
