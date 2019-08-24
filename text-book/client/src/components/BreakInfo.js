import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import NavBarAdmin from '../components/NavBarAdmin';

const breakInfoStyle = (theme) => ({
	item: {
		marginBottom: theme.spacing(4)
	},

	title: {
		color: '#3a7ea1',
		fontWeight: 'bold',
		fontSize: '25px',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5)
	},

	letter: {
		width: 600,
		height: 600,
		borderStyle: 'solid',
		borderColor: '#3a7ea1'
	}
});

class BreakInfo extends Component {
	onDocumentLoadSuccess = (file) => {
		console.log('File loaded...', file);
	};

	onDocumentLoadError = (e) => {
		console.log('File error...', e);
	};

	render() {
		const { classes } = this.props;
		const { startDate, endDate, numberDays, letter } = this.props.location.state;

		return (
			<div>
				<NavBarAdmin />

				<Grid container direction="column" alignItems="center">
					<Grid item>
						<Typography className={classes.title}>
							Break from {startDate} to {endDate} ({numberDays} days)
						</Typography>
					</Grid>
					<Grid item>
						<object data={letter} type="application/pdf" className={classes.letter}>
							<embed src={letter} type="application/pdf" />
							<p>This browser does not support PDFs. Please download the PDF to view it.</p>
						</object>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(breakInfoStyle)(BreakInfo);
