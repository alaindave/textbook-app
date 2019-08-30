import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StyledButton } from '../themes/theme';
import TextField from '@material-ui/core/TextField';

import { Grid } from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	grid: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '70%'
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

const PostComponent = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<span>Date: {props.date}</span>
			<span>Post: {props.post}</span>
		</div>
	);
};

export default PostComponent;
