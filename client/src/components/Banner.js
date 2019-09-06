import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { StyledButton } from "../themes/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import Grid from "@material-ui/core/Grid";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {},

  coverFrame: {
    width: "890px",
    height: "310px",
    borderStyle: "transparent"
  },

  cameraIconCover: {
    position: "relative",
    // left: '5px',
    bottom: "300px",
    color: "#ff6666"
  },
  coverPicture: {
    width: "900px",
    height: "290px",
    objectFit: "cover"
  },

  profilePicture: {
    width: "100%",
    height: "100%",
    maxWidth: "170px",
    maxHeight: "170px",
    objectFit: "cover",
    borderRadius: "50%",
    position: "relative",
    bottom: "150px",
    left: "10px",
    borderStyle: "solid",
    borderColor: "white"
  },

  iconAddProfile: {
    fontSize: "140px",
    position: "relative",
    bottom: "190px"
    // left: '10px',
  },

  cameraIconProfile: {
    position: "relative",
    right: "35px",
    bottom: "180px",
    fontSize: "8px",
    color: "#ff6666"
  },

  name: {
    position: "relative",
    bottom: "210px",
    color: " #ffffff",
    fontSize: "24px",
    fontWeight: "bolder",
    fontFamily: "Times New Roman"
  },

  navButtons: {
    borderStyle: "solid",
    borderColor: "#dfe3ee",
    position: "relative",
    bottom: "210px",
    left: "20px"
  },

  button: {
    color: "#3b5998	",
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "red"
  },

  buttonEditProfile: {
    position: "relative",
    bottom: "230px",
    fontSize: "14px",
    padding: "10px",
    width: "140px",
    height: "40px",
    left: "360px",
    backgroundColor: "#dfe3ee",
    color: "black"
  },

  userEdit: {
    position: "relative",
    bottom: "2px",
    marginRight: "10px"
  }
}));

const Banner = props => {
  const classes = useStyles();
  const userID = window.localStorage.getItem("userID");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [hometown, setHometown] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const { photos, avatar } = props;

  const bannerPic = coverUrl
    ? coverUrl
    : "https://textbook-connect.s3.ca-central-1.amazonaws.com/1567545109450";

  useEffect(() => {
    console.log("id2 from storage", userID);

    axios
      .get(`/api/users/${userID}`)
      .then(response => {
        console.log("Data received:", response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setCity(response.data.city);
        setHometown(response.data.hometown);
        setProfileUrl(response.data.profileUrl);
        setCoverUrl(response.data.coverUrl);
      })
      .catch(error => {
        console.log(error);
      });
  });

  const uploadProfile = async e => {
    const data = new FormData();
    data.append("image", e.target.files[0], e.target.files[0].name);
    await axios
      .put(`/api/users/${userID}/avatar`, data)
      .then(response => {
        console.log("Uploaded picture", response.data.imageUrl);
        setProfileUrl(response.data.imageUrl);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const uploadCover = async e => {
    const data = new FormData();
    data.append("image", e.target.files[0], e.target.files[0].name);
    await axios
      .put(`/api/users/${userID}/cover`, data)
      .then(response => {
        console.log("Uploaded picture", response.data.imageUrl);
        setCoverUrl(response.data.imageUrl);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item id="coverPicture">
        <div className={classes.coverFrame}>
          <img
            src={bannerPic}
            className={classes.coverPicture}
            alt="Cover pic"
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="cover-upload"
            type="file"
            onChange={uploadCover}
          />
          <label htmlFor="cover-upload">
            <IconButton component="span" className={classes.cameraIconCover}>
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        {profileUrl ? (
          <img
            src={profileUrl}
            className={classes.profilePicture}
            alt="Profile pic"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUserCircle}
            className={classes.iconAddProfile}
          />
        )}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="picture-upload"
          type="file"
          onChange={uploadProfile}
        />
        <label htmlFor="picture-upload">
          <IconButton component="span" className={classes.cameraIconProfile}>
            <PhotoCamera />
          </IconButton>
        </label>

        <span className={classes.name}>
          {firstName}
          {"  "}
          {lastName}
        </span>
        <Link
          to={{
            pathname: `/profile/${userID}/edit`,

            state: {
              avatar,
              firstName,
              lastName,
              email,
              city,
              hometown
            }
          }}
          style={{ textDecoration: "none" }}
        >
          <StyledButton
            variant="contained"
            className={classes.buttonEditProfile}
            type="submit"
          >
            <FontAwesomeIcon icon={faUserEdit} className={classes.userEdit} />
            Edit profile
          </StyledButton>
        </Link>
      </Grid>

      <Grid item>
        <div className={classes.navButtons}>
          <StyledButton
            variant="contained"
            className={classes.button}
            type="submit"
          >
            About
          </StyledButton>

          <StyledButton
            variant="contained"
            className={classes.button}
            type="submit"
          >
            Friends{" "}
          </StyledButton>
          <Link
            to={{
              pathname: `/profile/${props.id}/photos`,
              state: {
                photos,
                avatar,
                firstName
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <StyledButton
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Photos{" "}
            </StyledButton>
          </Link>

          <StyledButton
            variant="contained"
            className={classes.button}
            type="submit"
          >
            Messages{" "}
          </StyledButton>
        </div>
      </Grid>
    </Grid>
  );
};

export default Banner;
