import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
        borderStyle: 'solid',
        borderColor: '#3b5998',
		// width: '800px',
		// height: '700px',
		position: 'relative',
		// top: '20px',
		// left: '450px'
	},

	avatar: {
		width: '40px',
		height: '48px',
		objectFit: 'cover',
		borderRadius: '50%',
		borderStyle: 'solid',
		borderColor: 'white'
	},

	name: {
		position: 'relative',
		bottom: '23px',
		fontSize: '20px',
		color: '#3b5998	'
	},

	date: {
		color: '#8c8c8c',
		position: 'relative',
		right: '90px'
	},
comment: {
		fontSize: '20px',
		marginLeft: '10px'
	},

	commentContainer: {
		borderStyle: 'solid',
		borderColor: '#3b5998',
		width: '430px',
		height: '60px',
		borderRadius: '60px',
		position: 'relative',
		top: '430px'
	},

	commentField: {
		position: 'relative',
		marginLeft: '20px'
	},

	label: {
		marginLeft: '20px',
		fontSize: '80px !important'
	},
	buttonComment: {
		position: 'relative',
		left: '450px',
		top: '370px',
		fontSize: '18px',
		borderStyle: 'none',
		color: '#3b5998',
		padding: '15px'
	}
}));

const Comments = (props) => {
	const classes = useStyles();
	const { avatar, firstName, lastName, date, comment} = props;
	return (
		<div>
			<div className={classes.container}>
				<img src={avatar} className={classes.avatar} alt="Cover pic" />
				<span className={classes.name}>
					{' '}
					{firstName} {lastName}{' '}
				</span>
				<span className={classes.date}>{date}</span>
				<br />
				<br />
				<span className={classes.comment}>{comment}</span>
				<br />
				<br />
			</div>
		</div>
	);
};

export default Comments;
