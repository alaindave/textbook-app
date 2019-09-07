import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBarProfile from '../components/NavBarProfile';

import Banner from '../components/Banner';

import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	grid: {
		borderStyle: 'solid',
		borderColor: '#dfe3ee',
		width: '560px',
		height: '300px',
		position: 'relative',
		left: '470px',
		bottom: '150px',
		alignContent: 'center'
	},
	bio: {
		position: 'relative',
		top: '75px'
	},
	name: { fontSize: '22px', color: '#3b5998' },
	email: { fontSize: '22px', color: '#3b5998' },
	city: { fontSize: '22px', color: '#3b5998' },
	hometown: { fontSize: '22px', color: '#3b5998' }
}));

const AboutPage = (props) => {
	const classes = useStyles();
	const { firstName, lastName, email, city, hometown, photos } = props.location.state;
	const { profileID } = props.match.params;

	return (
		<div>
			<NavBarProfile />
			<Banner profileID={profileID} photos={photos} />
			<Grid container direction="column" className={classes.grid}>
				<div className={classes.bio}>
					<Grid item>
						<span className={classes.name}>Name: </span>
						<span style={{ fontSize: '22px' }}>
							{firstName} {lastName}
						</span>
					</Grid>
					<Grid item>
						<span className={classes.email}> Email: </span>
						<span style={{ fontSize: '22px' }}>{email}</span>
					</Grid>
					<Grid item>
						<span className={classes.city}>City: </span>
						<span style={{ fontSize: '22px' }}>{city}</span>
					</Grid>
					<Grid item>
						<span className={classes.hometown}>Hometown: </span>
						<span style={{ fontSize: '22px' }}>{hometown}</span>
					</Grid>
				</div>
			</Grid>
		</div>
	);
};

export default AboutPage;
