import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const breakPageStyle = (theme) => ({
	field: {
		fontWeight: 'bold',
		color: 'black'
	}
});

class BreakItem extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<span className={classes.field}>Start date: </span>
				<span>{this.props.startDate}</span>
				<br />
				<br />
				<span className={classes.field}>End date: </span>
				<span>{this.props.endDate}</span>
				<br />
				<br />
				<span className={classes.field}>Number of days: </span>
				<span>{this.props.numberDays}</span>
			</div>
		);
	}
}

export default withStyles(breakPageStyle)(BreakItem);
