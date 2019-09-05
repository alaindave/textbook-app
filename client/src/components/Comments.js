import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
        borderStyle: 'solid',
        borderColor: '#dfe3ee',
		position: 'relative',
		top:'25px',
		left:'120px',
		marginBottom:'8px'
	
	},
	avatar: {
		width: '30px',
		height: '38px',
		objectFit: 'cover',
		borderRadius: '50%',
		borderStyle: 'solid',
		borderColor: 'white'
	},
	name: {
		position: 'relative',
		bottom: '23px',
		fontSize: '16px',
		color: '#3b5998	'
	},
	date: {
		color: '#8c8c8c',
		position: 'relative',
		right: '90px'
	},
comment: {
		fontSize: '17px',
		marginLeft: '10px'
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
