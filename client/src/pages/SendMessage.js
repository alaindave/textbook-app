import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { StyledButton } from '../themes/theme';

import axios from 'axios';
import NavBarProfile from '../components/NavBarProfile';

const useStyles = makeStyles((theme) => ({
	landingContainer: {
		backgroundColor: ' #dfe3ee'
	},

	askRegister: {
		position: 'relative',
		left: '110px',
		bottom: '220px'
	},
	title: {
		fontWeight: 'bolder',
		fontSize: '30px',
		position: 'relative',
		top: '100px',
		left: '80px',
		marginBottom: '25px'
	},

	intro: {
		position: 'relative',
		top: '120px',
		left: '120px',
		marginBottom: '30px',
		fontSize: '17px'
	},
	textField: {
		position: 'relative',
		left: '300px',
		bottom: '190px'
	},
	button: {
		backgroundColor: 'green',
		position: 'relative',
		left: '120px',
		fontWeight: 'bolder',
		paddingLeft: '60px',
		paddingRight: '60px',
		borderRadius: '5px',
		bottom: '160px'
	},
	error: {
		color: 'red',
		position: 'relative',
		bottom: '250px',
		left: '150px'
	},

	firstNameField: {
		width: '260px',
		height: '50px',
		position: 'relative'
	},

	lastNameField: {
		width: '260px',
		height: '50px',
		position: 'relative'
	},

	emailField: {
		width: '560px',
		height: '50px'
	},

	passwordField: {
		width: '560px',
		height: '50px'
	},

	firstName: {
		position: 'relative',
		left: '280px',
		bottom: '200px'
	},

	lastName: {
		position: 'relative',
		left: '320px',
		bottom: '200px'
	},

	birthday: {
		position: 'relative',
		left: '103px',
		top: '10px'
	}
}));

const SendMessage = (props) => {
	const [ subject, setSubject ] = useState('');
	const [ message, setMessage ] = useState('');
	const { userID, recipientID } = props.location.state;

	const classes = useStyles();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userData = {
			subject,
			message
		};

		await axios
			.post(`/api/users/${userID}/messages/${recipientID}`, userData)
			.then((response) => {
				console.log('Data received:', response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className={classes.landingContainer}>
			<NavBarProfile />
			<form onSubmit={handleSubmit}>
				<Grid container direction="column" alignItems="center" className="mainGrid">
					<Grid item>
						<TextField
							id="subject"
							name="subject"
							InputProps={{
								className: classes.subjectField
							}}
							label="Subject"
							className={classes.subject}
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							margin="normal"
							variant="outlined"
							type="text"
						/>
					</Grid>

					<Grid item>
						<TextField
							multiline={true}
							InputProps={{
								className: classes.subjectField
							}}
							rows={4}
							rowsMax={10}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</Grid>

					<Grid item>
						<StyledButton variant="contained" className={classes.button} type="submit">
							Send Message
						</StyledButton>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default SendMessage;
