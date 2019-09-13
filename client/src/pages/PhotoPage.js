import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBarProfile from '../components/NavBarProfile';

import { Grid } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	container: {
		position: 'relative',
		top: '25px'
	},

	photo: {
		width: '260px',
		height: '260px',
		objectFit: 'cover',
		borderRadius: '12px',
		borderStyle: 'solid',
		borderColor: 'white'
	},

	photoGrid: {
		position: 'relative',
		left: '15px'
	},

	noPhotos: {
		fontSize: '23px',
		color: '#3b5998	',
		position: 'relative',
		left: '450px',
		top: '100px'
	},

	labelPhoto: {
		color: '#3b5998	',
		position: 'relative',
		left: '1275px',
		top: '7px',
		borderStyle: 'solid',
		borderColor: '#dfe3ee',
		width: '160px',
		fontSize: '18px',
		paddingLeft: '12px'
	}
}));

const PhotoPage = (props) => {
	const { loggedInUser } = props.location.state;
	const { profileID } = props.match.params;
	const userID = window.localStorage.getItem('userID');
	const classes = useStyles();
	const [ photos, setPhotos ] = useState([]);

	useEffect(() => {
		axios
			.get(`/api/users/${profileID}`)
			.then((response) => {
				setPhotos(response.data.photos);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const uploadPhoto = async (e) => {
		const data = new FormData();
		data.append('image', e.target.files[0], e.target.files[0].name);
		await axios
			.post(`/api/users/${userID}/photos`, data)
			.then((response) => {
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<NavBarProfile />
			{loggedInUser && (
				<div>
					<input
						accept="image/*"
						style={{ display: 'none' }}
						id="photo-upload"
						type="file"
						onChange={uploadPhoto}
					/>
					<label htmlFor="photo-upload">
						<div className={classes.labelPhoto}> Upload photo </div>
					</label>
				</div>
			)}
			<Grid container direction="row" className={classes.container}>
				{photos.length !== 0 ? (
					photos.map((url) => (
						<Grid item key={url} className={classes.photoGrid}>
							<img src={url} className={classes.photo} alt="uploaded" />
						</Grid>
					))
				) : (
					<span className={classes.noPhotos}>No Photos to display! </span>
				)}
			</Grid>
		</div>
	);
};

export default PhotoPage;
