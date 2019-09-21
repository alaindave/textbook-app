import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { StyledButton } from '../themes/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import NavUser from '../components/NavButtonsUser';
import NavFriend from '../components/NavButtonsFriend';

import Grid from '@material-ui/core/Grid';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {},

	coverFrame: {
		width: '890px',
		height: '310px',
		borderStyle: 'transparent'
	},

	cameraIconCover: {
		position: 'relative',
		bottom: '300px',
		color: '#f7ef0a'
	},
	coverPicture: {
		width: '900px',
		height: '290px',
		objectFit: 'cover'
	},

	profilePicture: {
		width: '100%',
		height: '100%',
		maxWidth: '170px',
		maxHeight: '170px',
		objectFit: 'cover',
		borderRadius: '50%',
		position: 'relative',
		bottom: '140px',
		right: '315px',
		borderStyle: 'solid',
		borderColor: 'white'
	},

	iconAddProfile: {
		fontSize: '140px',
		position: 'relative',
		right: '290px',
		bottom: '170px'
	},

	cameraIconProfile: {
		position: 'relative',
		right: '330px',
		bottom: '190px',
		fontSize: '5px',
		color: '#f7ef0a'
	},

	name: {
		position: 'relative',
		bottom: '143px',
		right: '325px',
		color: '#3b5998',
		fontSize: '25px',
		fontWeight: 'bolder',
		fontStyle: 'italic',
		fontFamily: 'Times New Roman'
	},

	button: {
		color: '#3b5998	',
		backgroundColor: '#ffffff',
		borderStyle: 'solid',
		borderColor: 'red'
	},

	addFriend: {
		position: 'relative',
		bottom: '260px',
		fontSize: '14px',
		padding: '10px',
		width: '140px',
		height: '40px',
		left: '350px',
		backgroundColor: '#dfe3ee',
		color: 'black'
	},

	editProfile: {
		position: 'relative',
		bottom: '310px',
		fontSize: '14px',
		padding: '10px',
		width: '140px',
		height: '40px',
		left: '350px',
		backgroundColor: '#dfe3ee',
		color: 'black'
	},

	userEdit: {
		position: 'relative',
		bottom: '2.1px',
		marginRight: '10px'
	}
}));

const Banner = (props) => {
	const classes = useStyles();
	const {
		loggedInUser,
		profileID,
		firstName,
		lastName,
		email,
		city,
		hometown,
		avatar,
		coverUrl,
		friends,
		receivedMessages,
		sentMessages
	} = props;

	const [ addFriendText, setAddFriendText ] = useState('Add friend');
	const [ friendsList, setFriendsList ] = useState([]);
	const [ profileUrl, setProfileUrl ] = useState();
	const [ cover, setCover ] = useState();
	const userID = window.localStorage.getItem('userID');
	const bannerPic = coverUrl ? coverUrl : 'https://textbook-bucket.s3.ca-central-1.amazonaws.com/1568136274004';

	useEffect(
		() => {
			axios
				.get(`/api/users/${userID}`)
				.then((response) => {
					console.log("User friend's list. Received in Banner:", response.data);
					setFriendsList(response.data.friends);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ userID ]
	);

	const uploadProfile = async (e) => {
		const data = new FormData();
		data.append('image', e.target.files[0], e.target.files[0].name);
		await axios
			.put(`/api/users/${profileID}/avatar`, data)
			.then((response) => {
				console.log('Uploaded profile picture', response.data.profileUrl);
				setProfileUrl(response.data.profileUrl);
				window.localStorage.setItem('userAvatar', response.data.profileUrl);
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const uploadCover = async (e) => {
		const data = new FormData();
		data.append('image', e.target.files[0], e.target.files[0].name);
		await axios
			.put(`/api/users/${profileID}/cover`, data)
			.then((response) => {
				console.log('Uploaded cover picture', response.data.imageUrl);
				setCover(response.data.imageUrl);
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleAddFriend = async () => {
		await axios
			.post(`/api/users/${userID}/friends/${profileID}`)
			.then((response) => {
				console.log('request to add friend: ', response.data);
				setAddFriendText('Friend added! ');
			})
			.catch((error) => {
				console.log('unable to add friend! ', error);
			});
	};

	const isNewFriend = () => {
		for (let i = 0; i < friendsList.length; i++) {
			if (friendsList[i]._id == profileID) {
				return false;
			}
		}

		return true;
	};

	const displayAddFriend = () => {
		const newFriend = isNewFriend();
		if (newFriend) {
			return (
				<StyledButton variant="contained" className={classes.addFriend} onClick={handleAddFriend}>
					<FontAwesomeIcon icon={faUserEdit} className={classes.userEdit} />
					{addFriendText}
				</StyledButton>
			);
		} else {
			return <span> </span>;
		}
	};
	return (
		<Grid container direction="column" alignItems="center">
			<Grid item id="coverPicture">
				<div className={classes.coverFrame}>
					<img src={bannerPic} className={classes.coverPicture} alt="Cover pic" />
					<input
						accept="image/*"
						style={{ display: 'none' }}
						id="cover-upload"
						type="file"
						onChange={uploadCover}
					/>
					{loggedInUser && (
						<label htmlFor="cover-upload">
							<IconButton component="span" className={classes.cameraIconCover}>
								<PhotoCamera />
							</IconButton>
						</label>
					)}
				</div>
			</Grid>
			<Grid item id="profilePicture">
				{avatar ? (
					<img src={avatar} className={classes.profilePicture} alt="Profile pic" />
				) : (
					<FontAwesomeIcon icon={faUserCircle} className={classes.iconAddProfile} />
				)}

				{loggedInUser && (
					<label htmlFor="picture-upload">
						<IconButton component="span" className={classes.cameraIconProfile}>
							<PhotoCamera />
						</IconButton>
					</label>
				)}

				<input
					accept="image/*"
					style={{ display: 'none' }}
					id="picture-upload"
					type="file"
					onChange={uploadProfile}
				/>
			</Grid>
			<Grid item id="userName">
				<span className={classes.name}>
					{firstName}
					{'  '}
					{lastName}
				</span>
			</Grid>

			<Grid item>
				{loggedInUser ? (
					<Link
						to={{
							pathname: `/profile/${profileID}/edit`,

							state: {
								firstName,
								lastName,
								email,
								city,
								hometown
							}
						}}
						style={{ textDecoration: 'none' }}
					>
						<StyledButton variant="contained" className={classes.editProfile}>
							<FontAwesomeIcon icon={faUserEdit} className={classes.userEdit} />
							Edit profile
						</StyledButton>
					</Link>
				) : (
					displayAddFriend()
				)}
			</Grid>

			<Grid item className={classes.navButtons}>
				{loggedInUser ? (
					<NavUser
						profileID={profileID}
						loggedInUser={loggedInUser}
						sentMessages={sentMessages}
						receivedMessages={receivedMessages}
						friends={friends}
						firstName={firstName}
						lastName={lastName}
						email={email}
						city={city}
						hometown={hometown}
						avatar={avatar}
					/>
				) : (
					<NavFriend
						profileID={profileID}
						loggedInUser={loggedInUser}
						sentMessages={sentMessages}
						receivedMessages={receivedMessages}
						friends={friends}
						firstName={firstName}
						lastName={lastName}
						email={email}
						city={city}
						hometown={hometown}
						avatar={avatar}
					/>
				)}
			</Grid>
		</Grid>
	);
};

export default Banner;
