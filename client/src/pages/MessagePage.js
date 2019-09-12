import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { StyledButton } from "../themes/theme";

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
  received: {
    backgroundColor: "green",
    position: "relative",
    fontWeight: "bolder",
    paddingLeft: "60px",
    paddingRight: "60px",
    borderRadius: "5px",
    top: "200px",
    left: "280px",
    fontSize: "23px"
  },
  sent: {
    backgroundColor: "green",
    position: "relative",
    fontWeight: "bolder",
    paddingLeft: "60px",
    paddingRight: "60px",
    borderRadius: "5px",
    top: "200px",
    left: "420px",
    fontSize: "23px"
  }
}));

const MessagePage = props => {
  const classes = useStyles();
  const { sentMessages, receivedMessages, friends } = props.location.state;
  const profileID = window.localStorage.getItem("userID");

  return (
    <div>
      <NavBarProfile friends={friends} />
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Link
            to={{
              pathname: `/profile/${profileID}/received`,
              state: {
                receivedMessages
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <StyledButton variant="contained" className={classes.received}>
              Received Messages
            </StyledButton>
          </Link>
        </Grid>
        <Grid item>
          <Link
            to={{
              pathname: `/profile/${profileID}/sent`,
              state: {
                sentMessages
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <StyledButton variant="contained" className={classes.sent}>
              Sent Messages
            </StyledButton>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default MessagePage;
