import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { StyledButton } from '../themes/theme';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	navButtons: {
		borderStyle: 'solid',
		borderColor: '#dfe3ee',
		position: 'relative',
		bottom: '225px',
		left: '75px'
	},

	button: {
		color: '#3b5998	',
		backgroundColor: '#ffffff',
		borderStyle: 'solid',
		borderColor: 'red'
	}
}));

const NavButtonsFriend = (props) => {
	const classes = useStyles();
	const {
		profileID,
		loggedInUser,
		sentMessages,
		receivedMessages,
		friends,
		firstName,
		lastName,
		email,
		city,
		hometown,
		avatar
	} = props;

	return (
		<Grid container direction="row" className={classes.navButtons}>
			<Grid item>
				<Link
					to={{
						pathname: `/profile/${profileID}/about`,

						state: {
							firstName,
							lastName,
							email,
							city,
							hometown,
							loggedInUser,
							avatar
						}
					}}
					style={{ textDecoration: 'none' }}
				>
					<StyledButton variant="contained" className={classes.button} type="submit">
						About
					</StyledButton>
				</Link>
			</Grid>
			<Grid item>
				<Link
					to={{
						pathname: `/profile/${profileID}/friendslist`,
						state: {
							friends
						}
					}}
					style={{ textDecoration: 'none' }}
				>
					<StyledButton variant="contained" className={classes.button} type="submit">
						Friends{' '}
					</StyledButton>
				</Link>
			</Grid>
			<Grid item>
				<Link
					to={{
						pathname: `/profile/${profileID}/photos`,
						state: {
							loggedInUser
						}
					}}
					style={{ textDecoration: 'none' }}
				>
					<StyledButton variant="contained" className={classes.button} type="submit">
						Photos{' '}
					</StyledButton>
				</Link>
			</Grid>
			<Grid item>
				<Link
					to={{
						pathname: `/profile/${profileID}/messages`,
						state: { receivedMessages, sentMessages }
					}}
					style={{ textDecoration: 'none' }}
				>
					<StyledButton variant="contained" className={classes.button} type="submit">
						Send a Message
					</StyledButton>
				</Link>
			</Grid>
		</Grid>
	);
};

export default NavButtonsFriend;
