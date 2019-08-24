import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {},

	appName: {
		fontWeight: 'bold'
	},

	appbar: {
		boxShadow: 'none'
	},
	toolbar: {
		width: '100%',
		height: '1px'
	},
	logo: {
		height: '27px',
		width: '27px',
		backgroundColor: 'white',
		position: 'relative',
		left: '25px',
		top: '5px'
	},
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
	link: {
		textDecoration: 'none'
	},
	notice: {
		display: 'inline-block',
		fontWeight: 'bold',
		marginRight: theme.spacing(1)
	},

	companyName: {
		color: '#8B4513',
		fontWeight: 'bold',
		fontSize: '32px',
		paddingLeft: '10px',
		float: 'right',
		marginTop: '15px'
	},

	admin: {
		color: '#8B4513',
		fontSize: '25px',
		position: 'relative',
		top: '18px'
	},
	icon: {
		fontSize: '30px',
		color: '#8B4513',
		marginRight: '10px'
	},

	homeIcon: {
		fontSize: '30px',
		color: '#ffffff',
		float: 'left',
		marginTop: '25px'
	},

	username: {
		fontWeight: 'light',
		fontSize: '25px',
		float: 'left',
		marginLeft: '15px',
		marginTop: '30px'
	},

	findFriends: {
		position: 'relative',
		left: '600px',
		backgroundColor: '#3b5998',
		color: 'white',
		fontSize: '14px',
		borderStyle: 'none',
		fontWeight: 'bold'
	},

	buttonHome: {
		position: 'relative',
		left: '580px',
		backgroundColor: '#3b5998',
		color: 'white',
		fontSize: '14px',
		borderStyle: 'none',
		fontWeight: 'bold'
	},

	firstName: {
		position: 'relative',
		left: '560px',
		fontSize: '15px',
		fontWeight: 'bold'
	},

	avatar: {
		position: 'relative',
		left: '540px'
	},

	searchField: {
		width: '360px',
		height: '26px',
		backgroundColor: 'white',
		position: 'relative',
		left: '90px'
	}
}));

function NavBarProfile(props) {
	const classes = useStyles();

	const firstName = window.localStorage.getItem('firstName');

	const [ keyword, setKeyWord ] = useState('');

	return (
		<div className={classes.root}>
			<AppBar color="primary" position="static" className={classes.appbar}>
				<Toolbar variant="regular" className={classes.toolbar}>
					<Grid container direction="row" alignItems="center">
						<Grid item>
							<img src={logo} className={classes.logo} alt="logo" />
						</Grid>

						<Grid item className={classes.search}>
							<TextField
								id="search"
								name="search"
								InputProps={{
									className: classes.searchField
								}}
								value={keyword}
								onChange={(e) => setKeyWord(e.target.value)}
								type="search"
								margin="normal"
								variant="outlined"
							/>
						</Grid>
						<Grid item>
							<Avatar className={classes.avatar} />
						</Grid>
						<Grid item>
							<span className={classes.firstName}> {firstName}</span>
						</Grid>
						<Grid item>
							<Link>
								<button className={classes.buttonHome}>Home</button>
							</Link>
						</Grid>

						<Grid item>
							<Link>
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
