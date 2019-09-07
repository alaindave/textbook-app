import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavBarProfile from '../components/NavBarProfile';
import User from '../components/User';

import { Grid } from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	container: {
		borderStyle: 'none',
		borderColor: 'transparent',
		position: 'relative',
		top: '25px',
		left: '300px'
	},

	users: {
		borderStyle: 'solid',
		borderColor: '#dfe3ee',
		height: '120px',
		width: '600px',
		marginBottom: '8px'
	}
}));

const FriendsPage = (props) => {
	const [ users, setUsers ] = useState([]);
	const classes = useStyles();

	const userID = window.localStorage.getItem('userID');

	useEffect(() => {
		axios
			.get(`/api/users/${userID}/friends`)
			.then((response) => {
				console.log('list of users:', response.data);
				setUsers(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<NavBarProfile />
			<Grid container direction="column" className={classes.container}>
				{users.map((user) => (
					<Link
						to={{
							pathname: `/profile/${user._id}`
						}}
						style={{ textDecoration: 'none' }}
					>
						<Grid item key={user._id} className={classes.users}>
							<User firstName={user.firstName} lastName={user.lastName} avatar={user.profileUrl} />
						</Grid>
					</Link>
				))}
			</Grid>
		</div>
	);
};

export default FriendsPage;
