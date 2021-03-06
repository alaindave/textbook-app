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
		borderRadius: '24px',
		height: '120px',
		width: '600px',
		marginBottom: '11px'
	},

	noFriends: {
		fontSize: '23px',
		color: '#3b5998	',
		position: 'relative',
		left: '250px',
		top: '100px'
	}
}));

const UsersList = (props) => {
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
				{users.length !== 0 ? (
					users.map((user) => (
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
					))
				) : (
					<span className={classes.noFriends}>No friends to display!</span>
				)}
			</Grid>
		</div>
	);
};

export default UsersList;
