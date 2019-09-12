import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { StyledButton } from '../themes/theme';
import NavBarHome from '../components/NavBarHome';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	landingContainer: {
		backgroundColor: ' #dfe3ee'
	},

	askRegister: {
		position: 'relative',
		left: '110px',
		bottom: '220px'
	},
	title: {
		fontWeight: 'bolder',
		fontSize: '30px',
		position: 'relative',
		top: '100px',
		left: '80px',
		marginBottom: '25px'
	},

	intro: {
		position: 'relative',
		top: '120px',
		left: '120px',
		marginBottom: '30px',
		fontSize: '17px'
	},
	textField: {
		position: 'relative',
		left: '300px',
		bottom: '190px'
	},
	button: {
		backgroundColor: 'green',
		position: 'relative',
		left: '120px',
		fontWeight: 'bolder',
		paddingLeft: '60px',
		paddingRight: '60px',
		borderRadius: '5px',
		bottom: '160px'
	},
	error: {
		color: 'red',
		position: 'relative',
		bottom: '250px',
		left: '150px'
	},

	firstNameField: {
		width: '260px',
		height: '50px',
		position: 'relative'
	},

	lastNameField: {
		width: '260px',
		height: '50px',
		position: 'relative'
	},

	emailField: {
		width: '560px',
		height: '50px'
	},

	passwordField: {
		width: '560px',
		height: '50px'
	},

	firstName: {
		position: 'relative',
		left: '280px',
		bottom: '200px'
	},

	lastName: {
		position: 'relative',
		left: '320px',
		bottom: '200px'
	},

	birthday: {
		position: 'relative',
		left: '103px',
		top: '10px'
	}
}));

const Landing = (props) => {
	const [ firstName, setFirstName ] = useState(' ');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState(' ');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfPassword ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');

	const classes = useStyles();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userData = {
			firstName,
			lastName,
			email,
			password,
			confirmPassword
		};

		await axios
			.post('/api/users', userData)
			.then((response) => {
				console.log('Data received:', response.data);

				// get jwt token from header
				const token = response.headers['x-auth-token'];

				// add token and name to local storage
				window.localStorage.setItem('token', token);
				window.localStorage.setItem('userID', response.data._id);
				window.localStorage.setItem('userName', response.data.firstName);

				// test if token is stored
				const storageToken = window.localStorage.getItem('token');
				console.log('token from local storage:', storageToken);

				//direct user to admin page
				props.history.push({
					pathname: `/profile/${response.data._id}`
				});
			})
			.catch((error) => {
				setErrorMessage(error.response.data);
				console.log(error);
			});
	};

	const handleLogin = (isAuthenticated, userID,friends) => {
		if (isAuthenticated)
			return props.history.push({
				pathname: `/profile/${userID}`,
				state:{
					friends
				}
			});
	};

	const handleError = (error) => {
		setErrorMessage(error);
	};

	return (
		<div className={classes.landingContainer}>
			<NavBarHome handleLogin={handleLogin} handleError={handleError} />
			<form onSubmit={handleSubmit}>
				<Grid container direction="row" alignItems="center" className="mainGrid">
					<Grid item>
						<Typography className={classes.title}>
							Connect with friends and the <br /> world around you on Textbook.
						</Typography>
						<Typography className={classes.intro}>
							<b>See photos and updates</b> from friends
						</Typography>
						<Typography className={classes.intro}>
							<b>Text your friends</b> and stay in touch!
						</Typography>
						<Typography className={classes.intro}>
							<b>Find what's new </b> in NewsFeed
						</Typography>
					</Grid>
					<Grid container direction="column" alignItems="center">
						<Grid item className={classes.error}>
							{errorMessage}
						</Grid>
						<Grid item>
							<Typography className={classes.askRegister}>
								<span style={{ fontWeight: 'bold', fontSize: '35px' }}>Sign Up.</span>
								<br />
								<span style={{ fontWeight: 'lighter', fontSize: '20px' }}>It's quick and easy.</span>
							</Typography>
						</Grid>

						<Grid item>
							<TextField
								id="firstName"
								name="firstName"
								InputProps={{
									className: classes.firstNameField
								}}
								label="First name"
								className={classes.firstName}
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
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
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
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
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								margin="normal"
								variant="outlined"
								type="email"
							/>
						</Grid>

						<Grid item>
							<TextField
								id="password"
								name="password"
								InputProps={{
									className: classes.passwordField
								}}
								label="Password"
								className={classes.textField}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								margin="normal"
								variant="outlined"
							/>
						</Grid>
						<Grid item>
							<TextField
								id="confirmPassword"
								name="confirmPassword"
								label="Confirm password"
								InputProps={{
									className: classes.passwordField
								}}
								className={classes.textField}
								value={confirmPassword}
								onChange={(e) => setConfPassword(e.target.value)}
								type="password"
								margin="normal"
								variant="outlined"
							/>
						</Grid>

						<Grid item>
							<StyledButton variant="contained" className={classes.button} type="submit">
								Sign Up
							</StyledButton>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default Landing;
