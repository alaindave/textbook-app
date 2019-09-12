import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: "40px",
    height: "40px",
    maxWidth: "100px",
    maxHeight: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    position: "relative",
    top: "10px",
    left: "10px",
    borderStyle: "solid"
  },

  name: {
    position: "relative",
    left: "15px",
    fontSize: "16px"
  },

  subject: {
    position: "relative",
    top: "15px",
    left: "25px",
    fontSize: "16px"
  }
}));

const MessageComponent = props => {
  const classes = useStyles();
  const { avatar, firstName, lastName, subject } = props;
  return (
    <div>
      <img src={avatar} alt="avatar" className={classes.avatar} />
      <span className={classes.name}>
        {firstName} {lastName}
      </span>{" "}
      <br />
      <br />
      <span className={classes.subject}>Subject:{subject}</span>
    </div>
  );
};

export default MessageComponent;
