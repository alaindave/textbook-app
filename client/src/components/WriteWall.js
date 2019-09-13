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

	button: {
		color: '#3b5998	',
		borderStyle: 'solid',
		fontSize: '14px',
		backgroundColor: 'transparent',
		position: 'relative'
	},

	container: {
		position: 'relative',
		left: '575px',
		bottom: '188px',
		borderStyle: 'solid',
		borderColor: '#dfe3ee',
		width: '400px',
		backgroundColor: '#ffffff',
		marginBottom: '20px'
	}
}));

const WriteWall = (props) => {
	const [ post, setPost ] = useState('');
	const classes = useStyles();
	const userID = window.localStorage.getItem('userID');
	const { recipientID } = props;

	const handlePost = () => {
		axios
			.post(`/api/users/${userID}/wall/${recipientID}`, { post })
			.then((response) => {
				console.log('Post successfully saved on wall:', response.data);
				setPost(' ');
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className={classes.container}>
			<Grid container direction="column">
				<Grid item>
					<StyledButton variant="contained" className={classes.button} type="submit" onClick={handlePost}>
						Write on wall
					</StyledButton>
				</Grid>
				<Grid item>
					<TextField
						placeholder="Say something..."
						multiline={true}
						rows={4}
						rowsMax={10}
						value={post}
						onChange={(e) => setPost(e.target.value)}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default WriteWall;
