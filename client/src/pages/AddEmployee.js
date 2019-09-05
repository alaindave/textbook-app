import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { StyledButton } from '../themes/theme';
import NavBarAdmin from '../components/NavBarAdmin';

import axios from 'axios';

const addPageStyle = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	title: {
		color: '#3a7ea1',
		fontWeight: 'lighter',
		fontSize: '30px',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5)
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	button: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(1)
	},
	error: {
		color: 'red'
	},
	camera: {
		fontSize: '50px',
		color: '#ff944d'
	}
});

class AddEmployee extends Component {
	state = {
		firstName: '',
		lastName: '',
		department: '',
		telephone: '',
		address: '',
		daysOff: '',
		errorMessage: '',
		imageUrl: {}
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		const bioData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			department: this.state.department,
			telephone: this.state.telephone,
			address: this.state.address,
			daysOff: this.state.daysOff
		};

		await axios
			.post('/api/staff', bioData)
			.then((response) => {
				console.log('Data received: ', response.data);
				this.props.history.push(`addStaffFiles/${response.data._id}`, {
					id: response.data._id,
					name: this.name
				});
			})
			.catch((error) => {
				this.setState({ errorMessage: error });
				console.log(error);
			});
	};

	handleChange = (e) => {
		if (e.target.name === 'department') {
			this.setState({ department: e.target.value });
		} else if (e.target.name === 'firstName') {
			this.setState({ firstName: e.target.value });
		} else if (e.target.name === 'lastName') {
			this.setState({ lastName: e.target.value });
		} else if (e.target.name === 'telephone') {
			this.setState({ telephone: e.target.value });
		} else if (e.target.name === 'daysOff') {
			this.setState({ daysOff: e.target.value });
		} else {
			this.setState({ address: e.target.value });
		}
	};

	render() {
		const { classes } = this.props;
		const { firstName, lastName, telephone, address, department, daysOff } = this.state;

		return (
			<div className={classes.landingContainer}>
				<NavBarAdmin />

				<form onSubmit={this.handleSubmit}>
					<Grid container direction="column" alignItems="center">
						<Grid item>
							<Typography className={classes.title}>New employee</Typography>
						</Grid>

						<Grid item>
							<TextField
								id="lastName"
								name="lastName"
								label="Last name"
								className={classes.textField}
								value={lastName}
								onChange={this.handleChange}
								margin="normal"
								variant="outlined"
							/>
						</Grid>

						<Grid item>
							<TextField
								id="firstName"
								name="firstName"
								label="First name"
								className={classes.textField}
								value={firstName}
								onChange={this.handleChange}
								margin="normal"
								variant="outlined"
							/>
						</Grid>

						<Grid item>
							<TextField
								id="department"
								name="department"
								label="Department"
								className={classes.textField}
								value={department}
								onChange={this.handleChange}
								margin="normal"
								variant="outlined"
							/>
						</Grid>

						<Grid item>
							<TextField
								id="daysOff"
								name="daysOff"
								label="Number of days off"
								className={classes.textField}
								value={daysOff}
								onChange={this.handleChange}
								margin="normal"
								variant="outlined"
							/>
						</Grid>

						<Grid item>
							<TextField
								id="telephone"
								name="telephone"
								label="Telephone number"
								className={classes.textField}
								type="telephone"
								value={telephone}
								onChange={this.handleChange}
								margin="normal"
								variant="outlined"
							/>
						</Grid>

						<Grid item>
							<TextField
								id="address"
								name="address"
								label="Address"
								className={classes.textField}
								value={address}
								onChange={this.handleChange}
								type="address"
								margin="normal"
								variant="outlined"
							/>
						</Grid>

						<Grid item>
							<StyledButton
								variant="contained"
								label="Submit"
								color="secondary"
								className={classes.button}
								type="submit"
								value="Sign up"
								onClick={this.handleSubmit}
							>
								Add employee
							</StyledButton>
						</Grid>
					</Grid>
				</form>
			</div>
		);
	}
}

export default withStyles(addPageStyle)(AddEmployee);
