import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBarProfile from '../components/NavBarProfile';

import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		position: 'relative',
		top: '25px',
		left: '30px'
	},

	photo: {
		width: '300px',
		height: '300px',
		objectFit: 'cover',
		borderRadius: '12px',
		borderStyle: 'solid',
		borderColor: 'white'
	}
}));

const PhotoPage = (props) => {
	const { avatar, photos, firstName } = props.location.state;
	const classes = useStyles();
	const userID = window.localStorage.getItem('userID');

	return (
		<div>
			<NavBarProfile avatar={avatar} firstName={firstName} profileID={userID} />
			<Grid container direction="row" className={classes.container}>
				{photos.map((url) => (
					<Grid item key={url}>
						<img src={url} className={classes.photo} alt="Cover pic" />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default PhotoPage;
