import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
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
		fontSize: '16px',
		color: '#3b5998	'
	},

	date: {
		color: '#8c8c8c',
		position: 'relative',
		right: '90px'
	},
	post: {
		fontSize: '20px',
		marginLeft: '10px'
	},

	buttonLike: {
		position: 'relative',
		left: '10px',
		bottom: '8px',
		fontSize: '16px',
		backgroundColor:'transparent',
		borderStyle:'none'
	},
	buttonComment: {
		position: 'relative',
		left: '40px',
		bottom: '8px',
		fontSize: '12px',
		fontSize: '16px',
		backgroundColor:'transparent',
		borderStyle:'none'
	},

	iconLike:{
		fontSize:'12px'
	}
}));

const PostComponent = (props) => {
	const classes = useStyles();
	const { avatar, date, firstName, lastName, post } = props;
	const [ comment, setComment ] = useState('');

	return (
		<div className={classes.container}>
			<img src={avatar} className={classes.avatar} alt="Cover pic" />
			<span className={classes.name}>
				{' '}
				{firstName} {lastName}{' '}
			</span>
			<span className={classes.date}>{date}</span>
			<br />
			<br />
			<span className={classes.post}>{post}</span>
			<br />
			<br />

			<button className={classes.buttonLike}>
				{' '}
				 <FontAwesomeIcon icon={faThumbsUp} className={classes.iconLike} />
			</button>

			<div>
				<TextField
					placeholder="Write a comment ..."
					multiline={true}
					rows={1}
					rowsMax={10}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default PostComponent;
