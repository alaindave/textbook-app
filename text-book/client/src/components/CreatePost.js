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
	},

	button: {
		color: '#3b5998	',
		backgroundColor: '#f7f7f7',
		borderStyle: 'solid',
		borderColor: 'red',
		fontSize: '14px'
	},

	container: {
		position: 'relative',
		left: '575px',
		bottom: '200px',
		borderStyle: 'solid',
		borderColor: '#dfe3ee',
		width: '400px',
		backgroundColor: '#ffffff',
		marginBottom: '20px'
	}
}));

const CreatePost = (props) => {
	const [ status, setStatus ] = useState('');
	const classes = useStyles();
	const id = window.localStorage.getItem('userID');

	const handlePost = () => {
		axios
			.post(`/api/users/${id}/posts`, { post: status })
			.then((response) => {
				console.log('Post successfully saved:', response.data);
				setStatus(' ');
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
						Create Post
					</StyledButton>
					<StyledButton variant="contained" className={classes.button} type="submit">
						Photo
					</StyledButton>
					<StyledButton variant="contained" className={classes.button} type="submit">
						Video
					</StyledButton>
				</Grid>
				<Grid item>
					<TextField
						placeholder="What's on your mind?"
						multiline={true}
						rows={4}
						rowsMax={10}
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default CreatePost;
