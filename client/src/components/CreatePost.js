import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StyledButton } from "../themes/theme";
import TextField from "@material-ui/core/TextField";

import { Grid } from "@material-ui/core";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  grid: {
    display: "flex",
    flexWrap: "wrap",
    width: "70%"
  },

  labelPhoto: {
    color: "#3b5998	",
    position: "relative",
    left: "80px"
  },

  button: {
    color: "#3b5998	",
    borderStyle: "solid",
    fontSize: "14px"
  },

  container: {
    position: "relative",
    left: "575px",
    bottom: "200px",
    borderStyle: "solid",
    borderColor: "#dfe3ee",
    width: "400px",
    backgroundColor: "#ffffff",
    marginBottom: "20px"
  }
}));

const CreatePost = props => {
  const [status, setStatus] = useState("");
  const classes = useStyles();
  const userID = window.localStorage.getItem("userID");

  const handlePost = () => {
    axios
      .post(`/api/users/${userID}/posts`, { post: status })
      .then(response => {
        console.log("Post successfully saved:", response.data);
        setStatus(" ");
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const uploadPhoto = async e => {
    const data = new FormData();
    data.append("image", e.target.files[0], e.target.files[0].name);
    await axios
      .post(`/api/users/${userID}/photos`, data)
      .then(response => {
        console.log("Uploaded picture", response.data.imageUrl);
        // setProfileUrl(response.data.imageUrl);
        // // window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });

    console.log("i be clicked");
  };

  return (
    <div className={classes.container}>
      <Grid container direction="column">
        <Grid item>
          <StyledButton
            variant="contained"
            className={classes.button}
            type="submit"
            onClick={handlePost}
          >
            Create Post
          </StyledButton>

          <input
            accept="image/*"
            style={{ display: "none" }}
            id="photo-upload"
            type="file"
            onChange={uploadPhoto}
          />
          <label htmlFor="photo-upload">
            <span className={classes.labelPhoto}>Photo</span>
          </label>
        </Grid>
        <Grid item>
          <TextField
            placeholder="What's on your mind?"
            multiline={true}
            rows={4}
            rowsMax={10}
            value={status}
            onChange={e => setStatus(e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CreatePost;
