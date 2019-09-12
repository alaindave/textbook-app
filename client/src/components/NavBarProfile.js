import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {},

  appName: {
    fontWeight: "bold"
  },

  appbar: {
    boxShadow: "none"
  },
  toolbar: {
    width: "100%",
    height: "1px"
  },
  logo: {
    color: "white",
    position: "relative",
    left: "40px",
    top: "1px",
    fontSize: "42px"
  },
  button: {
    margin: theme.spacing(1),
    fontWeight: "bold",
    textTransform: "none"
  },
  styledbutton: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  link: {
    textDecoration: "none"
  },
  notice: {
    display: "inline-block",
    fontWeight: "bold",
    marginRight: theme.spacing(1)
  },

  companyName: {
    color: "#8B4513",
    fontWeight: "bold",
    fontSize: "32px",
    paddingLeft: "10px",
    float: "right",
    marginTop: "15px"
  },

  admin: {
    color: "#8B4513",
    fontSize: "25px",
    position: "relative",
    top: "18px"
  },
  icon: {
    fontSize: "30px",
    color: "#8B4513",
    marginRight: "10px"
  },

  homeIcon: {
    fontSize: "30px",
    color: "#ffffff",
    float: "left",
    marginTop: "25px"
  },

  username: {
    fontWeight: "light",
    fontSize: "25px",
    float: "left",
    marginLeft: "15px",
    marginTop: "30px"
  },

  findFriends: {
    position: "relative",
    left: "900px",
    backgroundColor: "#3b5998",
    color: "white",
    fontSize: "14px",
    borderStyle: "none",
    fontWeight: "bold"
  },

  buttonHome: {
    position: "relative",
    left: "880px",
    backgroundColor: "#3b5998",
    color: "white",
    fontSize: "14px",
    borderStyle: "none",
    fontWeight: "bold"
  },

  userName: {
    position: "relative",
    left: "850px",
    fontSize: "15px",
    fontWeight: "bold"
  },

  avatar: {
    width: "40px",
    height: "40px",
    maxWidth: "100px",
    maxHeight: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    position: "relative",
    left: "810px",
    borderStyle: "solid"
  },

  searchField: {
    width: "360px",
    height: "26px",
    backgroundColor: "white",
    position: "relative",
    left: "90px"
  }
}));

function NavBarProfile(props) {
  const classes = useStyles();
  const avatar = window.localStorage.getItem("userAvatar");
  const userName = window.localStorage.getItem("userName");
  const profileID = window.localStorage.getItem("userID");
  const { friends } = props;

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static" className={classes.appbar}>
        <Toolbar variant="regular" className={classes.toolbar}>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <span className={classes.logo}>textbook</span>
            </Grid>
            <Grid item>
              {avatar && (
                <img src={avatar} className={classes.avatar} alt="avatar" />
              )}
            </Grid>
            <Grid item>
              <span className={classes.userName}> {userName}</span>
            </Grid>
            <Grid item>
              <Link
                to={{
                  pathname: `/profile/${profileID}`,
                  state: { friends }
                }}
              >
                <button className={classes.buttonHome}>Home</button>
              </Link>
            </Grid>

            <Grid item>
              <Link
                to={{
                  pathname: `/profile/${profileID}/friends`,
                  state: { friends }
                }}
              >
                <button className={classes.findFriends}>Find Friends</button>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBarProfile;
