import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StyledButton } from '../themes/theme';
import TextField from '@material-ui/core/TextField';
import NavBarProfile from '../components/NavBarProfile';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	container: {
		borderStyle: 'none',
		width: '800px',
		height: '700px',
		position: 'relative',
		top: '20px',
		left: '450px'
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
	post: {
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

const PostPage = (props) => {
	const classes = useStyles();
	const { avatar, firstName, lastName, date, post, postID } = props.location.state;
	const [ comment, setComment ] = useState('');
	const userID = window.localStorage.getItem('userID');

	const handleComment = async () => {
		console.log('this is the post ID', postID);
		const date = new Date();

		await axios
			.post(`/api/users/posts/${postID}/comments`, { userID, comment, date })
			.then((response) => {
				console.log('comment successfully saved ', response.data);
				setComment('');
				props.handlePostUpdate(postID);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<NavBarProfile id={userID} profileUrl={avatar} />
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
				<div className={classes.commentContainer}>
					<TextField
						className={classes.commentField}
						placeholder="Write a comment"
						rows={4}
						rowsMax={10}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						InputProps={{
							disableUnderline: true
						}}
					/>
				</div>

				<StyledButton variant="contained" className={classes.buttonComment} onClick={handleComment}>
					Post comment
				</StyledButton>
			</div>
		</div>
	);
};

export default PostPage;
