import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import NavBarAdmin from '../components/NavBarAdmin';
import { Link } from 'react-router-dom';

import axios from 'axios';

const staffInfoStyle = (theme) => ({
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
		borderColor: '#3a7ea1',
		width: '500px',
		marginLeft: '450px'
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
		fontSize: '20px',
		position: 'relative',
		left: '80px',
		bottom: '30px'
	},

	field: {
		fontWeight: 'bold'
	},
	bio: {
		marginBottom: '18px'
	},
	title: {
		color: '#3a7ea1',
		fontWeight: 'bold',
		fontSize: '30px',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5)
	},

	bed: {
		fontSize: '16px',
		marginLeft: '10px'
	},

	buttonTrash: {
		fontSize: '17px',
		position: 'relative',
		color: '#3a7ea1',
		backgroundColor: 'white',
		right: '32px'
	},

	buttonEdit: {
		fontSize: '17px',
		position: 'relative',
		color: '#3a7ea1',
		backgroundColor: 'white',
		right: '8px'
	},

	buttonDaysOff: {
		fontSize: '17px',
		position: 'relative',
		color: '#3a7ea1',
		backgroundColor: 'white',
		left: '20px'
	},

	buttonBed: {
		fontSize: '19px',
		position: 'relative',
		left: '10px',
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
		marginTop: theme.spacing(5),
		fontSize: '16px'
	},

	buttonYes: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	},

	buttonNo: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	},

	deleteIcon: {
		fontSize: '18px',
		marginLeft: theme.spacing(1)
	},

	confirmMessage: {
		fontSize: '18px',
		marginTop: theme.spacing(2)
	}
});

class StaffInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matricule: '',
			firstName: '',
			lastName: '',
			department: '',
			telephone: '',
			address: '',
			imageUrl: '',
			daysOff: '',
			open: false,
			openDaysOff: false,
			selectedDaysOff: '',
			openConfirmDelete: false
		};
	}

	async componentDidMount() {
		await axios
			.get(`/api/staff/${this.props.match.params.id}`)
			.then((response) => {
				console.log('staff :', response.data);
				this.setState({
					matricule: response.data.matricule,
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					department: response.data.department,
					telephone: response.data.telephone,
					address: response.data.address,
					imageUrl: response.data.imageUrl,
					daysOff: response.data.daysOff
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleOpen = () => {
		this.setState({
			open: true
		});
	};

	handleOpenDaysOff = () => {
		this.setState({
			openDaysOff: true
		});
	};

	handleClose = () => {
		this.setState({
			open: false
		});
	};

	handleCloseDaysOff = () => {
		this.setState({
			openDaysOff: false
		});
	};

	openConfirmDelete = () => {
		this.setState({
			openConfirmDelete: true
		});
	};

	closeConfirmDelete = () => {
		this.setState({
			openConfirmDelete: false
		});
	};

	handleUpdate = async () => {
		const { matricule, firstName, lastName, department, telephone, address } = this.state;
		const updates = {
			matricule,
			firstName,
			lastName,
			department,
			telephone,
			address
		};
		await axios
			.put(`/api/staff/${this.props.match.params.id}`, updates)
			.then((response) => {
				console.log('Updated data ', response.data);
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};
	handleDelete = async () => {
		console.log('delete clicked');

		await axios
			.delete(`/api/staff/${this.props.match.params.id}`)
			.then((response) => {
				console.log('response:', response.data);
				window.history.back();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleDaysOff = async () => {
		const { matricule, firstName, lastName, department, telephone, address, selectedDaysOff } = this.state;
		const updates = {
			matricule,
			firstName,
			lastName,
			department,
			telephone,
			address,
			daysOff: selectedDaysOff
		};
		await axios
			.put(`/api/staff/${this.props.match.params.id}/daysOff`, updates)
			.then((response) => {
				console.log('Updated data ', response.data);
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	imageHandler = async (e) => {
		console.log('picture', e.target.files[0]);
		const image = new FormData();
		image.append('image', e.target.files[0]);

		await axios
			.put(`/api/staff/${this.props.match.params.id}/avatar`, image)
			.then((response) => {
				console.log('Data received: ', response.data.imageUrl);
				this.setState({ imageUrl: response.data.imageUrl });
				window.location.reload();
			})
			.catch((error) => {
				this.setState({ errorMessage: error });
				console.log(error);
			});
	};

	render() {
		const { classes } = this.props;
		const { firstName, lastName, department, telephone, address, matricule, imageUrl, daysOff } = this.state;
		const { firstName: _firstName, lastName: _lastName } = this.props.location.state;

		return (
			<div>
				<NavBarAdmin />

				<div className={classes.staffInfo}>
					<Grid container direction="column" alignItems="center">
						<Grid container direction="column" alignItems="center">
							<Grid item>
								<Typography className={classes.title}>
									{firstName} {lastName}
								</Typography>
							</Grid>
						</Grid>

						<Grid item className={classes.avatar}>
							<Avatar src={imageUrl} className={classes.profilePicture} />
							<form>
								<input
									accept="image/*"
									style={{ display: 'none' }}
									id="picture-upload"
									type="file"
									onChange={this.imageHandler}
								/>
								<label htmlFor="picture-upload">
									<IconButton color="secondary" component="span" className={classes.camera}>
										<PhotoCamera />
									</IconButton>
								</label>
							</form>
						</Grid>

						<Grid item className={classes.bio}>
							<span className={classes.field}>ID:</span>
							<span>{matricule}</span>
							<br />
							<br />
							<span className={classes.field}>Last name:</span>
							<span>{lastName}</span>
							<br />
							<br />
							<span className={classes.field}>First name:</span> <span>{firstName}</span> <br />
							<br />
							<span className={classes.field}>Department:</span>
							<span>{department}</span>
							<br />
							<br />
							<span className={classes.field}>Number of days off:</span>
							<span>{daysOff}</span>
							<br />
							<br />
							<span className={classes.field}>Telephone number:</span>
							<span>{telephone}</span> <br />
							<br />
							<span className={classes.field}>Address:</span>
							<span>{address}</span>
							<br />
							<br />
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								className={classes.buttonTrash}
								onClick={this.openConfirmDelete}
							>
								Delete
								<DeleteIcon className={classes.deleteIcon} />
							</Button>
							<Button variant="contained" className={classes.buttonEdit} onClick={this.handleOpen}>
								Edit
							</Button>
							<Link
								to={{
									pathname: `/staff/${this.props.match.params.id}/daysOff`,
									state: {
										firstName: _firstName,
										lastName: _lastName
									}
								}}
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant="contained"
									className={classes.buttonDaysOff}
									onClick={this.handleOpenDaysOff}
								>
									Breaks
									<FontAwesomeIcon icon={faBed} className={classes.bed} />
								</Button>
							</Link>
						</Grid>
						<Grid item>
							{/* Update staff info dialog */}
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
									<span className={classes.editTitle}>Edit</span>
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
										label="Addresse"
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

							<Dialog
								open={this.state.openConfirmDelete}
								onClose={this.closeConfirmDelete}
								maxWidth="md"
								BackdropProps={{
									classes: {
										root: classes.root
									}
								}}
							>
								<DialogContent>
									<Typography className={classes.confirmMessage}>
										Are you sure you want to remove this employee?
									</Typography>
								</DialogContent>

								<DialogActions>
									<Button
										variant="contained"
										color="secondary"
										className={classes.buttonYes}
										onClick={this.handleDelete}
									>
										Yes
										<DeleteIcon className={classes.deleteIcon} />
									</Button>

									<Button
										variant="contained"
										color="secondary"
										className={classes.buttonNo}
										onClick={this.closeConfirmDelete}
									>
										No
									</Button>
								</DialogActions>
							</Dialog>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(staffInfoStyle)(StaffInfo);
