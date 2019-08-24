import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/logo.png';

const useStyles = makeStyles((theme) => ({
	root: {},
	logo: {
		marginTop: theme.spacing(1),
		height: '60px',
		width: '130px'
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
	appbar: {
		boxShadow: 'none',
		borderBottom: '2px solid #8B4513'
	},
	toolbar: {
		padding: '5px',
		right: '0',
		left: '0',
		marginRight: 'auto',
		marginLeft: 'auto',
		width: '95%'
	},

	title: {
		color: '#8B4513',
		fontWeight: 'bold',
		fontSize: '32px',
		paddingLeft: '10px'
	},

	admin: {
		color: '#8B4513',
		fontSize: '25px',
		position: 'relative',
		top: '18px'
	}
}));

function NavBarLogin(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar color="primary" position="static" className={classes.appbar}>
				<Toolbar variant="regular" className={classes.toolbar}>
					<div style={{ flex: '1' }}>
						<img src={logo} className={classes.logo} alt="logo" />
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default NavBarLogin;
