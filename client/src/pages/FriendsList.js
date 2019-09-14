import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavBarProfile from '../components/NavBarProfile';
import User from '../components/User';

import { Grid } from '@material-ui/core';

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
		left: '100px',
		top: '100px'
	}
}));

const FriendsList = (props) => {
	const classes = useStyles();
	const { friends } = props.location.state;

	return (
		<div>
			<NavBarProfile />
			<Grid container direction="column" className={classes.container}>
				{friends && friends.length !== 0 ? (
					friends.map((friend) => (
						<Link
							to={{
								pathname: `/profile/${friend._id}`
							}}
							style={{ textDecoration: 'none' }}
						>
							<Grid item key={friend._id} className={classes.users}>
								<User
									firstName={friend.firstName}
									lastName={friend.lastName}
									avatar={friend.profileUrl}
								/>
							</Grid>
						</Link>
					))
				) : (
					<span className={classes.noFriends}>No friends to show! </span>
				)}
			</Grid>
		</div>
	);
};

export default FriendsList;
