import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
	name: {
		fontSize: '20px',
		color: '#3b5998',
		position: 'relative',
		left: '14px',
		bottom: '20px'
	},

	avatar: {
		width: '90px',
		height: '90px',
		maxWidth: '100px',
		maxHeight: '100px',
		objectFit: 'cover',
		borderStyle: 'none',
		position: 'relative',
		top: '15px',
		left: '8px'
	},

	iconAddProfile: {
		fontSize: '90px',
		position: 'relative',
		top: '10px',
		left: '5px'
	}
}));

const User = (props) => {
	const classes = useStyles();
	const { avatar, firstName, lastName } = props;

	return (
		<div>
			{avatar ? (
				<img src={avatar} className={classes.avatar} alt="avatar" />
			) : (
				<FontAwesomeIcon icon={faUserCircle} className={classes.iconAddProfile} />
			)}
			<span className={classes.name}>
				{firstName} {lastName}
			</span>
		</div>
	);
};

export default User;
