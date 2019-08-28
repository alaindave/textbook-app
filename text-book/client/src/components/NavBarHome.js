import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {},

	button: {
		margin: theme.spacing(1),
		fontWeight: 'bold',
		textTransform: 'none'
	},
	styledbutton: {
		margin: theme.spacing(1),
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3)
	},

	appbar: {
		boxShadow: 'none'
	},
	toolbar: {
		padding: '15px',
		right: '0',
		left: '0',
		marginRight: 'auto',
		marginLeft: 'auto',
		width: '100%'
	},

	appName: {
		fontWeight: 'bold',
		fontSize: '43px',
		position: 'relative',
		left: '200px',
		top: '5px'
	},

	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},

	emailLabel: {
		position: 'relative',
		left: '600px',
		bottom: '10px',
		fontSize: '13px',
		fontWeight: 'bolder'
	},
	emailField: {
		backgroundColor: 'white',
		height: '25px',
		width: '170px',
		position: 'relative',
		left: '560px'
	},

	passwordLabel: {
		position: 'relative',
		left: '613px',
		bottom: '10px',
		fontSize: '13px',
		fontWeight: 'bolder'
	},

	passwordField: {
		backgroundColor: 'white',
		height: '25px',
		width: '150px',
		position: 'relative',
		left: '550px'
	},

	loginButton: {
		position: 'relative',
		left: '590px',
		top: '20px',
		fontSize: '14px',
		backgroundColor: '#2e5cb8',
		color: 'white',
		borderStyle: 'none'
	}
}));

const NavBarHome = (props) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ setErrorMessage ] = useState('');

	const classes = useStyles();

	const handleLogin = async (e) => {
		e.preventDefault();
		const userData = {
			email,
			password
		};

		await axios
			.post('/api/auth', userData)
			.then((response) => {
				console.log('Data received:', response.data);

				// get jwt token from header
				const token = response.headers['x-auth-token'];

				// add token and name to local storage
				window.localStorage.setItem('token', token);
				window.localStorage.setItem('userID', response.data._id);
				window.localStorage.setItem('firstName', response.data.firstName);
				window.localStorage.setItem('lastName', response.data.lastName);

				// test if token is stored
				const localStorageToken = window.localStorage.getItem('token');
				console.log('token from local storage:', localStorageToken);

				//direct user to profile page
				console.log('id from navbar ', response.data._id);
				props.handleLogin(true, response.data._id);
			})
			.catch((error) => {
				setErrorMessage(error.response.data);
				console.log(error);
				props.handleError(error.response.data);
			});
	};

	return (
		<div className={classes.root}>
			<AppBar color="primary" position="static" className={classes.appbar}>
				<Toolbar variant="regular" className={classes.toolbar}>
					<Grid container direction="row" alignItems="center">
						<Grid item>
							<span className={classes.appName}>textbook</span>{' '}
						</Grid>

						<Grid item className={classes.credentials}>
							<span className={classes.emailLabel}>Email</span>{' '}
							<TextField
								id="email"
								name="email"
								InputProps={{
									className: classes.emailField
								}}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="text"
								margin="normal"
								variant="outlined"
							/>
							<span className={classes.passwordLabel}>Password</span>
							<TextField
								id="password"
								name="password"
								InputProps={{
									className: classes.passwordField
								}}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								margin="normal"
								variant="outlined"
							/>
							<button className={classes.loginButton} onClick={handleLogin}>
								Log in
							</button>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBarHome;
