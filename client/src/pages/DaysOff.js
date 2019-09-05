import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import NavBarAdmin from '../components/NavBarAdmin';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { Typography } from '@material-ui/core';
import { StyledButton } from '../themes/theme';
import { Link } from 'react-router-dom';

const daysOffStyle = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	title: {
		color: '#3a7ea1',
		fontWeight: 'bold',
		fontSize: '30px',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5)
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	buttonSubmit: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(1)
	},

	buttonBreak: {
		float: 'right',
		marginTop: theme.spacing(5),
		marginRight: theme.spacing(5)
	},

	loader: {
		color: '#41806b'
	},

	confMessage: {
		fontSize: '15px'
	}
});

class Daysoff extends Component {
	state = {
		userID: this.props.match.params.id,
		startDate: '',
		endDate: '',
		numberDays: '',
		requestID: '',
		loader: false,
		loaderSubmit: false
	};
	handleSubmit = async (e) => {
		e.preventDefault();

		this.setState({ loaderSubmit: true });

		const adminEmail = window.localStorage.getItem('adminEmail');
		const adminName = window.localStorage.getItem('adminName');

		const data = {
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			numberDays: this.state.numberDays,
			firstName: this.props.location.state.firstName,
			lastName: this.props.location.state.lastName,
			adminEmail,
			adminName
		};

		await axios
			.post(`/api/staff/${this.state.userID}/daysOff/${this.state.requestID}`, data)
			.then((response) => {
				console.log('Data received: ', response.data);
				this.setState({ loaderSubmit: false });
				window.history.back();
			})
			.catch((error) => {
				this.setState({ errorMessage: error });
				console.log(error);
			});
	};

	handleChange = (e) => {
		if (e.target.name === 'startDate') {
			this.setState({ startDate: e.target.value });
		} else if (e.target.name === 'endDate') {
			this.setState({ endDate: e.target.value });
		} else {
			this.setState({ numberDays: e.target.value });
		}
	};

	handleFileUpload = (e) => {
		this.setState({ loader: true });

		const formData = new FormData();
		formData.append('letter', e.target.files[0]);
		axios
			.post(`/api/staff/${this.props.match.params.id}/daysOff`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((response) => {
				console.log('days off request ID', response.data._id);
				this.setState({
					requestID: response.data._id,
					loader: false
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		const { classes } = this.props;
		const { startDate, endDate, numberDays } = this.state;

		return (
			<div>
				<NavBarAdmin />
				<Link
					to={{
						pathname: `/staff/${this.props.match.params.id}/daysOff/list`
					}}
					style={{ textDecoration: 'none' }}
				>
					<StyledButton
						variant="contained"
						label="Submit"
						color="secondary"
						className={classes.buttonBreak}
						type="submit"
						value="Sign in"
					>
						Break history
					</StyledButton>
				</Link>

				<form onSubmit={this.handleSubmit}>
					<Grid container direction="column" alignItems="center">
						<Grid item>
							<Typography className={classes.title}>Break request</Typography>
						</Grid>

						<Grid item>
							<TextField
								required
								id="startDate"
								name="startDate"
								label="Start date"
								className={classes.textField}
								value={startDate}
								onChange={this.handleChange}
								margin="normal"
								variant="outlined"
								type="date"
								InputLabelProps={{
									shrink: true
								}}
							/>
						</Grid>

						<Grid item>
							<TextField
								required
								id="endDate"
								name="endDate"
								label=" End date"
								className={classes.textField}
								value={endDate}
								onChange={this.handleChange}
								type="date"
								margin="normal"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						</Grid>
						<Grid item>
							<TextField
								required
								id="numberDays"
								name="numberDays"
								label="Number of days"
								className={classes.textField}
								value={numberDays}
								onChange={this.handleChange}
								margin="normal"
								variant="outlined"
								type="text"
								InputLabelProps={{
									shrink: true
								}}
							/>
						</Grid>
						<Grid item>
							<input label="upload file" type="file" onChange={this.handleFileUpload} />
						</Grid>

						<Grid item>
							{this.state.loader && (
								<p className={classes.loader}>
									<FontAwesomeIcon icon={faSpinner} className={classes.spinner} />
									Please wait while the file is being uploaded...
								</p>
							)}

							{this.state.loaderSubmit && (
								<p className={classes.loader}>
									<FontAwesomeIcon icon={faSpinner} className={classes.spinner} />
									Please wait. A confirmation email is being sent...
								</p>
							)}
						</Grid>

						<Grid item>
							<StyledButton
								variant="contained"
								label="Submit"
								color="secondary"
								className={classes.buttonSubmit}
								type="submit"
								value="Sign in"
							>
								Submit request
							</StyledButton>
						</Grid>
						<span className={classes.confMessage}>
							(A confirmation message will be sent to the email provided)
						</span>
					</Grid>
				</form>
			</div>
		);
	}
}

export default withStyles(daysOffStyle)(Daysoff);
