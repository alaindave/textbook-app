import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';

const staffPageStyle = (theme) => ({
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

	field: {
		fontWeight: 'bold',
		color: 'black'
	}
});

class StaffItem extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Avatar src={this.props.imageUrl} className={classes.profilePicture} />
				<span className={classes.field}>ID: </span>
				<span>{this.props.matricule}</span>
				<br />
				<br />
				<span className={classes.field}>Full name: </span>
				<span>
					{this.props.firstName} {this.props.lastName}
				</span>
				<br />
				<br />
				<span className={classes.field}>Department: </span>
				<span>{this.props.department}</span>
			</div>
		);
	}
}

export default withStyles(staffPageStyle)(StaffItem);
