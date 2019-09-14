import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBarProfile from '../components/NavBarProfile';
import CreatePost from '../components/CreatePost';
import WriteWall from '../components/WriteWall';

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
		left: '574px',
		bottom: '262px',
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
	const userID = window.localStorage.getItem('userID');
	const { profileID } = props.match.params;
	const loggedInUser = userID === profileID ? true : false;
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ receivedMessages, setReceivedMessages ] = useState('');
	const [ sentMessages, setSentMessages ] = useState('');
	const [ city, setCity ] = useState('');
	const [ hometown, setHometown ] = useState('');
	const [ avatar, setAvatar ] = useState('');
	const [ coverUrl, setCoverUrl ] = useState('');
	const [ friends, setFriends ] = useState([]);
	const [ userPosts, setUserPosts ] = useState([]);
	const reloadKey = props.location.state;

	useEffect(
		() => {
			console.log('Logged in user: ', userID);
			console.log('Profile ID: ', profileID);
			const avatar = window.localStorage.getItem('userAvatar');
			console.log('Profile Avatar: ', avatar);

			axios
				.get(`/api/users/${profileID}`)
				.then((response) => {
					console.log('user received in profile page:', response.data);
					setFirstName(response.data.firstName);
					setLastName(response.data.lastName);
					setEmail(response.data.email);
					setCity(response.data.city);
					setHometown(response.data.hometown);
					setAvatar(response.data.profileUrl);
					setCoverUrl(response.data.coverUrl);
					setFriends(response.data.friends);
					setUserPosts(response.data.posts);
					setReceivedMessages(response.data.receivedMessages);
					setSentMessages(response.data.sentMessages);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ profileID, userID ]
	);

	const generateUserPosts = () => {
		userPosts.reverse();
		const posts = userPosts.map((post) => (
			<Grid item key={post._id} className={classes.post}>
				<PostComponent
					firstName={post.author.firstName}
					lastName={post.author.lastName}
					avatar={post.author.profileUrl}
					post={post}
				/>
			</Grid>
		));
		return posts;
	};

	return (
		<div className={classes.profileContainer}>
			<NavBarProfile />
			<Banner
				profileID={profileID}
				loggedInUser={loggedInUser}
				firstName={firstName}
				lastName={lastName}
				email={email}
				avatar={avatar}
				coverUrl={coverUrl}
				city={city}
				hometown={hometown}
				friends={friends}
				receivedMessages={receivedMessages}
				sentMessages={sentMessages}
			/>
			{loggedInUser ? <CreatePost /> : <WriteWall recipientID={profileID} />}
			<Grid container className={classes.grid} direction="column">
				{userPosts.length !== 0 && generateUserPosts()}
			</Grid>
		</div>
	);
};

export default Profile;
