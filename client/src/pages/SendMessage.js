import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { StyledButton } from "../themes/theme";

import axios from "axios";
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

const SendMessage = props => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { userID, recipientID } = props.match.params;

  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();
    const userData = {
      subject,
      message
    };

    await axios
      .post(`/api/users/${userID}/messages/${recipientID}`, userData)
      .then(response => {
        console.log("Data received:", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBarProfile />
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            alignItems="center"
            className="mainGrid"
          >
            <Grid item>
              <TextField
                id="subject"
                name="subject"
                InputProps={{
                  className: classes.subjectField
                }}
                label="Subject"
                className={classes.subject}
                value={subject}
                onChange={e => setSubject(e.target.value)}
                margin="normal"
                variant="outlined"
                type="text"
              />
            </Grid>

            <Grid item>
              <TextField
                multiline={true}
                InputProps={{
                  className: classes.messageField
                }}
                rows={40}
                rowsMax={10}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </Grid>

            <Grid item>
              <StyledButton
                variant="contained"
                className={classes.button}
                type="submit"
              >
                Send Message
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
