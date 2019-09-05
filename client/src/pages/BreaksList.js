import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import NavBarAdmin from '../components/NavBarAdmin';
import { Typography } from '@material-ui/core';
import BreakItem from '../components/BreakItem';
import { Link } from 'react-router-dom';

import axios from 'axios';

const useStyles = (theme) => ({
	breakItem: {
		width: '500px',
		minHeight: '100px',
		boxShadow: '0px 0px 30px 5px #f0f0f0',
		borderRadius: '8px',
		paddingTop: theme.spacing(5),
		paddingLeft: theme.spacing(5),
		paddingBottom: theme.spacing(5),
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(1),
		marginLeft: theme.spacing(3),
		borderColor: '#3a7ea1',
		borderStyle: 'solid'
	},

	title: {
		color: '#3a7ea1',
		fontWeight: 'lighter',
		fontSize: '40px',
		position: 'relative',
		top: '12px'
	},

	hint: {
		position: 'relative',
		fontSize: '16px',
		top: '5px',
		marginBottom: '25px'
	},

	noBreaks: {
		position: 'relative',
		top: '100px',
		fontWeight: 'bold',
		fontStyle: 'italic',
		color: '#3a7ea1'
	}
});

class BreaksList extends Component {
	state = {
		breaks: [],
		keyWord: '',
		staffID: this.props.match.params.id
	};

	async componentDidMount() {
		await axios
			.get(`/api/staff/${this.state.staffID}/daysOff/list`)
			.then((response) => {
				console.log('breaks list:', response.data);
				this.setState({
					breaks: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	generateBreaks = (classes) => {
		const breaks = this.state.breaks.map((breaks) => (
			<Grid key={breaks._id} item className={classes.breakItem}>
				<Link
					to={{
						pathname: `/breakInfo/${breaks._id}`,
						state: {
							startDate: breaks.startDate,
							endDate: breaks.endDate,
							letter: breaks.letter,
							numberDays: breaks.numberDays
						}
					}}
					style={{ textDecoration: 'none' }}
				>
					<BreakItem startDate={breaks.startDate} endDate={breaks.endDate} numberDays={breaks.numberDays} />
				</Link>
			</Grid>
		));
		return breaks;
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<NavBarAdmin />
				<Grid container direction="column" alignItems="center">
					{this.state.breaks.length !== 0 && (
						<div>
							<Typography className={classes.title}>Break history.</Typography>
							<Typography className={classes.hint}>
								(Click on the boxes to see the approval letter)
							</Typography>
						</div>
					)}

					{this.state.breaks.length !== 0 ? (
						this.generateBreaks(classes)
					) : (
						<h1 className={classes.noBreaks}> Nothing to display!</h1>
					)}
				</Grid>
			</div>
		);
	}
}

export default withStyles(useStyles)(BreaksList);
