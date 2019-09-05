import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const updateDialogStyle = (theme) => ({
	root: {
		background: '#e6ac00'
	},

	label: {
		fontSize: '20px',
		fontWeight: 'bold',
		color: 'black',
		marginBottom: theme.spacing(2)
	},

	staffInfo: {
		borderRadius: '5px',
		borderStyle: 'solid',
		marginTop: '15px',
		borderColor: '#8B4513'
	},

	item: {
		marginBottom: theme.spacing(4)
	},
	profilePicture: {
		width: '100%',
		height: '100%',
		maxWidth: '120px',
		maxHeight: '120px',
		minWidth: '120px',
		minHeight: '120px',

		objectFit: 'cover',
		borderRadius: '50%',
		position: 'relative',
		bottom: '20px'
	},

	camera: {
		fontSize: '100px',
		position: 'relative',
		left: '80px',
		bottom: '25px'
	},

	field: {
		fontWeight: 'bold'
	},
	bio: {
		marginTop: '10px'
	},
	title: {
		color: '#8B4513',
		fontWeight: 'bold',
		fontSize: '30px',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5)
	},

	buttonTrash: {
		float: 'right',
		fontSize: '20px',
		position: 'relative',
		left: '320px',
		bottom: '40px',
		color: '#8B4513',
		backgroundColor: 'white',
		border: 'none'
	},

	buttonEdit: {
		float: 'right',
		fontSize: '20px',
		position: 'relative',
		left: '300px',
		bottom: '40px',
		color: '#8B4513',
		backgroundColor: 'white',
		border: 'none'
	},

	buttonBed: {
		fontSize: '25px',
		position: 'relative',
		left: '10px',
		top: '4px',
		color: '#8B4513',
		backgroundColor: 'white',
		border: 'none'
	},

	editTitle: {
		fontWeight: 'bold',
		position: 'relative',
		left: '250px'
	},
	button: {
		marginTop: theme.spacing(5)
	}
});

class UpdateDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			matricule: this.props.matricule,
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			department: this.props.department,
			telephone: this.props.telephone,
			address: this.props.address,
			daysOff: this.props.daysOff,
			open: this.props.open,
			selectedDaysOff: ''
		};
	}

	handleClose = () => {
		this.setState({
			open: false
		});
	};

	render() {
		const { classes } = this.props;
		const { firstName, lastName, department, telephone, address, matricule, daysOff } = this.state;

		return (
			<Grid item>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					maxWidth="md"
					BackdropProps={{
						classes: {
							root: classes.root
						}
					}}
				>
					<DialogTitle>
						<Typography className={classes.editTitle}>Edit</Typography>
					</DialogTitle>
					<DialogContent>
						<TextField
							id="matricule"
							label="ID"
							className={classes.item}
							fullWidth
							value={matricule}
							onChange={(e) =>
								this.setState({
									matricule: e.target.value
								})}
							InputLabelProps={{
								classes: {
									root: classes.label
								}
							}}
						/>
						<TextField
							id="lastName"
							label="Last name"
							className={classes.item}
							fullWidth
							value={lastName}
							onChange={(e) =>
								this.setState({
									lastName: e.target.value
								})}
							InputLabelProps={{
								classes: {
									root: classes.label
								}
							}}
						/>
						<TextField
							id="firstName"
							label="First name"
							className={classes.item}
							fullWidth
							value={firstName}
							onChange={(e) =>
								this.setState({
									firstName: e.target.value
								})}
							InputLabelProps={{
								classes: {
									root: classes.label
								}
							}}
						/>

						<TextField
							id="department"
							label="Department"
							className={classes.item}
							fullWidth
							value={department}
							onChange={(e) =>
								this.setState({
									department: e.target.value
								})}
							InputLabelProps={{
								classes: {
									root: classes.label
								}
							}}
						/>

						<TextField
							id="daysOff"
							label="Number of days off"
							className={classes.item}
							fullWidth
							value={daysOff}
							onChange={(e) =>
								this.setState({
									daysOff: e.target.value
								})}
							InputLabelProps={{
								classes: {
									root: classes.label
								}
							}}
						/>

						<TextField
							id="telephone"
							label="Telephone number"
							className={classes.item}
							fullWidth
							value={telephone}
							onChange={(e) =>
								this.setState({
									telephone: e.target.value
								})}
							InputLabelProps={{
								classes: {
									root: classes.label
								}
							}}
						/>
						<TextField
							id="address"
							label="Address"
							className={classes.item}
							fullWidth
							value={address}
							onChange={(e) =>
								this.setState({
									address: e.target.value
								})}
							InputLabelProps={{
								classes: {
									root: classes.label
								}
							}}
						/>
					</DialogContent>

					<DialogActions>
						<Button className={classes.button} onClick={this.handleClose} color="secondary">
							Cancel
						</Button>
						<Button className={classes.button} onClick={this.handleUpdate} color="secondary">
							Edit
						</Button>
					</DialogActions>
				</Dialog>
			</Grid>
		);
	}
}

export default withStyles(updateDialogStyle)(UpdateDialog);
