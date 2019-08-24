import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const employeePageStyle = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	title: {
		color: '#8B4513',
		fontWeight: 'bold',
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
	}
});

class Employee extends Component {
	render() {
		const { classes, firstName, lastName, telefone, address } = this.props;
		const { name, email, password, confirmPassword, errorMessage } = this.state;

		return (
			<div className={classes.landingContainer}>
				<Grid container direction="column" alignItems="center">
					<Grid item>
						<Typography className={classes.title}>Last name:{lastName}</Typography>
					</Grid>

					<Grid item>
						<Typography className={classes.title}>First name:{firstName}</Typography>
					</Grid>

					<Grid item>
						<Typography className={classes.title}>Tel number:{telefone}</Typography>
					</Grid>

					<Grid item>
						<Typography className={classes.title}>Address:{address}</Typography>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(employeePageStyle)(Employee);
