import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBarProfile from '../components/NavBarProfile';
import Banner from '../components/Banner';

import { Grid } from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	content: {
		width: '100%'
	},

	grid: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '70%'
	},
	item: {
		marginTop: theme.spacing(5),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},

	image1: {
		width: '100 %',
		height: '80px'
	},
	button1: {
		marginTop: theme.spacing(30),
		marginBottom: theme.spacing(1),
		fontSize: '25px',
		padding: '50px',
		backgroundColor: '#3a7ea1',
		borderRadius: '10px',
		position: 'relative',
		left: '200px'
	},

	button2: {
		marginTop: theme.spacing(30),
		marginBottom: theme.spacing(1),
		fontSize: '25px',
		padding: '50px',
		backgroundColor: '#3a7ea1',
		borderRadius: '10px',
		position: 'relative',
		left: '280px'
	},

	profilePicture: {
		width: '100%',
		height: '100%',
		maxWidth: '120px',
		maxHeight: '120px',
		minWidth: '120px',
		minHeight: '120px',
		objectFit: 'cover',
		borderRadius: '50%',
		float: 'left',
		position: 'relative',
		right: '400px'
	}
}));

const Profile = (props) => {
	const classes = useStyles();
	const id = props.match.params.id;

	return (
		<div className={classes.profileContainer}>
			<NavBarProfile id={id} />
			<Banner />
		</div>
	);
};

export default Profile;
