import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBarProfile from '../components/NavBarProfile';
import CreatePost from '../components/CreatePost';
import PostComponent from '../components/PostComponent';

import Banner from '../components/Banner';

import { Grid } from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	content: {
		width: '100%'
	},

	grid: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	item: {
		marginTop: theme.spacing(5),
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
	},

	post: {
		position: 'relative',
		left: '580px',
		bottom: '200px',
		borderStyle: 'solid',
		borderColor: '#dfe3ee',
		width: '400px',
		height: '180px',
		backgroundColor: '#ffffff',
		marginBottom: '15px'
	}
}));

const Profile = (props) => {
	const classes = useStyles();
	const id = window.localStorage.getItem('userID');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ profileUrl, setProfileUrl ] = useState('');
	const [ coverUrl, setCoverUrl ] = useState('');
	const [ userPosts, setUserPosts ] = useState([]);

	useEffect(() => {
		axios
			.get(`/api/users/${id}`)
			.then((response) => {
				console.log('Data received:', response.data);
				setFirstName(response.data.firstName);
				setLastName(response.data.lastName);
				setEmail(response.data.email);
				setProfileUrl(response.data.profileUrl);
				setCoverUrl(response.data.coverUrl);
				setUserPosts(response.data.posts);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const updatePosts = async (postID) => {
		console.log('id of post to update: ', postID);

		// get the conversation
		await axios
			.get(`/api/users/posts/${postID}`)
			.then((response) => {
				console.log('updated post', response.data);
				const updatedPost = response.data;
				const posts = [ ...userPosts ];

				// find index of original post in array
				const index = posts.findIndex((post) => {
					return post._id === postID;
				});

				// update post array
				posts[index] = updatedPost;
				setUserPosts(posts);
			})
			.catch((error) => {
				console.log('an error occured while updating post ...', error);
			});
	};

	const generateUserPosts = () => {
		// if user has not created a post ask him to
		if (userPosts.length === 0) {
			return <span>Please add a post</span>;
		}

		// else generate the created conversations
		const posts = userPosts.map((post) => (
			<Grid item key={post._id} className={classes.post}>
				<PostComponent
					firstName={firstName}
					lastName={lastName}
					avatar={profileUrl}
					post={post}
					handlePostUpdate={updatePosts}
				/>
			</Grid>
		));
		return posts;
	};

	return (
		<div className={classes.profileContainer}>
			<NavBarProfile id={id} profileUrl={profileUrl} />
			<Banner />
			<CreatePost />
			<Grid container className={classes.grid} direction="column">
				{generateUserPosts()}
			</Grid>
		</div>
	);
};

export default Profile;