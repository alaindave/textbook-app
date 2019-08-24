import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

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
	}
}));

function NavBarAdmin(props) {
	const classes = useStyles();

	const name = window.localStorage.getItem('adminName');

	return (
		<div className={classes.root}>
			<AppBar color="primary" position="static" className={classes.appbar}>
				<Toolbar variant="regular" className={classes.toolbar}>
					<div style={{ flex: '1' }}>
						<img src={logo} className={classes.logo} alt="logo" />
					</div>
					<div>
						<Link
							to={{
								pathname: `/staff`
							}}
							style={{ textDecoration: 'none' }}
						>
							<FontAwesomeIcon icon={faHome} className={classes.homeIcon} />
						</Link>
						<span className={classes.username}>{name}</span>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default NavBarAdmin;
