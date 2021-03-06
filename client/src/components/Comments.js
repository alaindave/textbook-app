import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "450px",
    position: "relative",
    top: "25px",
    left: "150px",
    marginBottom: "8px"
  },
  avatar: {
    width: "42px",
    height: "42px",
    objectFit: "cover",
    borderRadius: "50%",
    borderStyle: "solid",
    borderColor: "white",
    position: "relative",
    right: "120px",
    bottom: "10px"
  },
  name: {
    position: "relative",
    bottom: "23px",
    fontSize: "18px",
    color: "#3b5998	",
    right: "120px"
  },
  comment: {
    fontSize: "18px",
    marginLeft: "10px",
    position: "relative",
    left: "30px",
    bottom: "20px"
  }
}));

const Comments = props => {
  const classes = useStyles();
  const { avatar, firstName, lastName, authorID, comment } = props;
  return (
    <div className={classes.container}>
      <Link
        to={{
          pathname: `/profile/${authorID}`
        }}
        style={{ textDecoration: "none" }}
      >
        <img src={avatar} className={classes.avatar} alt="Cover pic" />
        <span className={classes.name}>
          {" "}
          {firstName} {lastName}{" "}
        </span>
      </Link>
      <br />
      <br />
      <span className={classes.comment}>{comment}</span>
      <br />
      <br />
    </div>
  );
};

export default Comments;
