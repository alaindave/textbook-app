import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Message from "../components/Message";

import NavBarProfile from "../components/NavBarProfile";

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    left: "400px",
    top: "80px",
    height: "600px",
    width: "700px"
  },

  subjectField: {
    width: "600px"
  },
  messageField: {
    width: "600px",
    height: "300px",
    borderColor: "#dfe3ee",
    borderStyle: "solid"
  },
  button: {
    backgroundColor: "green",
    position: "relative",
    fontWeight: "bolder",
    paddingLeft: "60px",
    paddingRight: "60px",
    borderRadius: "5px",
    top: "30px"
  }
}));

const MessagePage = props => {
  const classes = useStyles();
  const { receivedMessages } = props.location.state;

  return (
    <div>
      <NavBarProfile />
      <div className={classes.container}>
        <Grid container direction="column" alignItems="center">
          {receivedMessages.map(message => (
            <Grid item>
              <Link>
                <Message
                  avatar={message.author.profileUrl}
                  firstName={message.author.firstName}
                  lastName={message.author.lastName}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default MessagePage;
