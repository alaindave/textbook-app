import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Message from '../components/MessageComponent';

import NavBarProfile from '../components/NavBarProfile';

const useStyles = makeStyles((theme) => ({
	container: {
		position: 'relative',
		top: '80px'
	},

	subjectField: {
		width: '600px'
	},
	message: {
		width: '300px',
		height: '150px',
		borderColor: '#dfe3ee',
		borderStyle: 'solid',
		marginBottom: '12px'
	},
	noMessages: {
		fontSize: '23px',
		color: '#3b5998	',
		position: 'relative',
		top: '100px'
	}
}));

const SentMessage = (props) => {
	const classes = useStyles();
	const { sentMessages, friends } = props.location.state;
	const profileID = window.localStorage.getItem('userID');

	return (
		<div>
			<NavBarProfile friends={friends} />
			<div className={classes.container}>
				<Grid container direction="column" alignItems="center">
					{sentMessages && sentMessages.length !== 0 ? (
						sentMessages.map((message) => (
							<Grid key={message._id} item className={classes.message}>
								<Link
									to={{
										pathname: `/profile/${profileID}/messages/${message._id}`,

										state: {
											avatar: message.recipient.profileUrl,
											authorID: message.recipient._id,
											firstName: message.recipient.firstName,
											lastName: message.recipient.lastName,
											message: message.message,
											inSentMessage: true,
											from: false,
											friends
										}
									}}
									style={{ textDecoration: 'none' }}
								>
									<Message
										avatar={message.recipient.profileUrl}
										firstName={message.recipient.firstName}
										lastName={message.recipient.lastName}
										subject={message.subject}
									/>
								</Link>
							</Grid>
						))
					) : (
						<Grid item>
							<span className={classes.noMessages}>No messages to display!</span>
						</Grid>
					)}
				</Grid>
			</div>
		</div>
	);
};

export default SentMessage;
