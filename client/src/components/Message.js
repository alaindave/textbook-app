import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    left: "400px",
    top: "80px",
    height: "600px",
    width: "700px"
  }
}));

const Message = props => {
  const classes = useStyles();
  const { avatar, firstName, lastName } = props;
  return (
    <div className={classes.container}>
      <img src={avatar} alt="avatar" />
      <span>
        {firstName}
        {lastName}
      </span>
    </div>
  );
};

export default Message;
