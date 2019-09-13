import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { Grid } from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	grid: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '70%'
	},

	createPost: {
		borderStyle: 'solid',
		borderTopStyle: 'none',
		borderLeftStyle: 'none',
		borderColor: '#dfe3ee',
		width: '160px'
	},

	button: {
		color: 'white',
		fontSize: '18px',
		backgroundColor: 'green',
		position: 'relative',
		left: '330px',
		top: '104px',
		paddingLeft: '14px',
		paddingRight: '14px'
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

const CreatePost = (props) => {
	const [ post, setPost ] = useState('');
	const classes = useStyles();
	const userID = window.localStorage.getItem('userID');

	const handlePost = () => {
		axios
			.post(`/api/users/${userID}/posts`, { post })
			.then((response) => {
				console.log('Post successfully saved:', response.data);
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
					<button variant="contained" className={classes.button} type="submit" onClick={handlePost}>
						Post
					</button>
				</Grid>
				<Grid item>
					<TextField
						placeholder="What's on your mind?"
						multiline={true}
						rows={5}
						rowsMax={10}
						value={post}
						onChange={(e) => setPost(e.target.value)}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default CreatePost;
