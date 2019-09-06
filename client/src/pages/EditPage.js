import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { StyledButton } from "../themes/theme";
import NavBarProfile from "../components/NavBarProfile";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  form: {
    position: "relative",
    top: "130px",
    left: "420px"
  },

  button: {
    backgroundColor: "green",
    position: "relative",
    left: "160px",
    top: "25px",
    fontWeight: "bolder",
    paddingLeft: "60px",
    paddingRight: "60px",
    borderRadius: "5px"
  },

  firstNameField: {
    width: "260px",
    height: "50px",
    position: "relative"
  },

  lastNameField: {
    width: "280px",
    height: "50px",
    position: "relative"
  },

  emailField: {
    width: "560px",
    height: "50px"
  },

  city: {
    width: "560px",
    height: "50px"
  },

  lastName: {
    position: "relative",
    left: "20px"
  }
}));

const EditPage = props => {
  const userID = window.localStorage.getItem("userID");
  const {
    avatar,
    firstName,
    lastName,
    email,
    city,
    hometown
  } = props.location.state;
  const [_firstName, setFirstName] = useState(firstName);
  const [_lastName, setLastName] = useState(lastName);
  const [_email, setEmail] = useState(email);
  const [_city, setCity] = useState(city);
  const [_hometown, setHometown] = useState(hometown);

  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();
    const userData = {
      _firstName,
      _lastName,
      _email,
      _city,
      _hometown
    };

    await axios
      .put(`/api/users/${userID}/edit`, userData)
      .then(response => {
        console.log("Update user:", response.data);
        //direct user to profile page
        props.history.push({
          pathname: `/profile/${userID}`
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBarProfile avatar={avatar} firstName={firstName} />
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" className={classes.form}>
          <Grid item>
            <TextField
              id="firstName"
              name="firstName"
              InputProps={{
                className: classes.firstNameField
              }}
              label="First name"
              className={classes.firstName}
              value={_firstName}
              onChange={e => setFirstName(e.target.value)}
              margin="normal"
              variant="outlined"
              type="text"
            />

            <TextField
              id="lastName"
              name="lastName"
              InputProps={{
                className: classes.lastNameField
              }}
              label="Last name"
              className={classes.lastName}
              value={_lastName}
              onChange={e => setLastName(e.target.value)}
              margin="normal"
              variant="outlined"
              type="text"
            />
          </Grid>

          <Grid item>
            <TextField
              id="email"
              name="email"
              InputProps={{
                className: classes.emailField
              }}
              label="Email"
              className={classes.textField}
              value={_email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              margin="normal"
              variant="outlined"
              type="email"
            />
          </Grid>

          <Grid item>
            <TextField
              id="city"
              name="city"
              InputProps={{
                className: classes.city
              }}
              label="City"
              value={_city}
              onChange={e => setCity(e.target.value)}
              type="text"
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              id="hometown"
              name="hometown"
              label="Hometown"
              InputProps={{
                className: classes.city
              }}
              value={_hometown}
              onChange={e => setHometown(e.target.value)}
              type="text"
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item>
            <StyledButton
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Update
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditPage;
