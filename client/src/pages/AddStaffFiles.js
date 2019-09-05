import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { StyledButton } from '../themes/theme';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import NavBarAdmin from '../components/NavBarAdmin';

import axios from 'axios';

const addPageStyle = (theme) => ({
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
	},
	camera: {
		fontSize: '100px',
		color: '#ff944d'
	},
	profilePicture: {
		width: '100%',
		height: '100%',
		maxWidth: '120px',
		maxHeight: '120px',
		minWidth: '120px',
		minHeight: '120px',

		objectFit: 'cover',
		borderRadius: '50%'
	}
});

class AddStaffFiles extends Component {
	id = this.props.location.state.id;
	name = this.props.location.state.name;

	state = {
		imageUrl: ''
	};

	componentDidMount() {
		console.log('route props', this.props.location.state.id);
	}

	imageHandler = async (e) => {
		console.log('picture', e.target.files[0]);
		const image = new FormData();
		image.append('image', e.target.files[0]);

		await axios
			.put(`/api/staff/${this.id}/avatar`, image)
			.then((response) => {
				console.log('Data received: ', response.data.imageUrl);
				this.setState({ imageUrl: response.data.imageUrl });
			})
			.catch((error) => {
				this.setState({ errorMessage: error });
				console.log(error);
			});
	};

	handleSubmit = () => {
		this.props.history.replace('/staffList', { name: this.name });
	};

	render() {
		const { classes } = this.props;
		const { imageUrl } = this.state;
		const { name, id } = this.props.location.state;

		return (
			<div>
				<NavBarAdmin name={name} id={id} />

				<Grid container direction="column" className={classes.root} alignItems="center">
					<Grid item>
						<Typography className={classes.title}>Add photo</Typography>
					</Grid>

					<Grid item id="profilePicture">
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
							Save photo
						</StyledButton>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(addPageStyle)(AddStaffFiles);
