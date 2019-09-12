import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NavBarProfile from "../components/NavBarProfile";
import { StyledButton } from "../themes/theme";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: "40px",
    height: "40px",
    maxWidth: "100px",
    maxHeight: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    position: "relative",
    top: "20px",
    left: "550px",
    borderStyle: "solid"
  },

  name: {
    position: "relative",
    left: "560px",
    top: "18px",
    fontSize: "20px"
  },

  messageBox: {
    borderColor: "#8b9dc3",
    borderStyle: "solid",
    height: "350px",
    width: "400px",
    position: "relative",
    left: "500px",
    top: "60px"
  },
  message: {
    position: "relative",
    left: "40px",
    top: "40px",
    fontSize: "18px"
  },

  button: {
    backgroundColor: "green",
    position: "relative",
    fontWeight: "bolder",
    paddingLeft: "60px",
    paddingRight: "60px",
    borderRadius: "5px",
    top: "100px",
    left: "600px"
  },

  from_to: {
    position: "relative",
    top: "15px",
    left: "530px",
    fontSize: "24px",
    color: "#3b5998"
  }
}));

const MessageDetail = props => {
  const classes = useStyles();
  const userID = window.localStorage.getItem("userID");
  const {
    avatar,
    firstName,
    lastName,
    message,
    authorID,
    inSentMessage,
    from,
    friends
  } = props.location.state;

  const handleClick = () => {
    window.history.back();
  };
  return (
    <div>
      <NavBarProfile friends={friends} />
      <Link
        to={{
          pathname: `/profile/${authorID}`,
          state: {
            friends
          }
        }}
        style={{ textDecoration: "none" }}
      >
        {from ? (
          <span className={classes.from_to}>From: </span>
        ) : (
          <span className={classes.from_to}>To: </span>
        )}
        <img src={avatar} alt="avatar" className={classes.avatar} />
        <span className={classes.name}>
          {firstName} {lastName}
        </span>
      </Link>
      <br />
      <br />
      <div className={classes.messageBox}>
        <span className={classes.message}>{message}</span>
      </div>
      {inSentMessage ? (
        <StyledButton className={classes.button} onClick={handleClick}>
          Back to messages
        </StyledButton>
      ) : (
        <Link
          to={{
            pathname: `/profile/${userID}/sendMessage/${authorID}`
          }}
          style={{ textDecoration: "none" }}
        >
          <StyledButton variant="contained" className={classes.button}>
            Reply
          </StyledButton>
        </Link>
      )}
    </div>
  );
};

export default MessageDetail;
