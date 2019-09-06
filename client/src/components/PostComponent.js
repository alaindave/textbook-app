import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StyledButton } from '../themes/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { Link } from 'react-router-dom';

import axios from 'axios';

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
		backgroundColor: 'transparent',
		borderStyle: 'none'
	},

	iconLike: {
		fontSize: '12px'
	},

	unlikedIcon: {
		color: '#dfe3f0', //  grey
		marginRight: theme.spacing(1),
		// '&:hover': {
		// 	color: '#3b5998'
		// }
	},
	likedIcon: {
		color: '#3b5998', //blue
		marginRight: theme.spacing(1),
		// '&:hover': {
		// 	color: '#dfe3f0' // grey
		// }
	},

	iconComment: {
		color: '#3b5998',
		fontSize: '22px'
	},

	buttonComment: {
		position: 'relative',
		left: '40px',
		bottom: '8px',
		fontSize: '20px',
		borderStyle: 'none',
		backgroundColor: 'transparent'
	}
}));

const PostComponent = (props) => {
	const classes = useStyles();
	const { avatar, firstName, lastName } = props;
	const [ comment, setComment ] = useState('');
	const userID = window.localStorage.getItem('userID');

	const { date, post, comments, _id: postID } = props.post;

	const numLikes = Object.keys(props.post.userLikeMap).length;
	const numComments = comments.length;
	const isLiked = props.post.userLikeMap[userID];

	const handleLike = async () => {
		console.log(' user post: ', props.post);

		await axios
			.put(`/api/users/posts/${postID}/like`, { userID })
			.then((response) => {
				console.log('post successfully liked/unliked ', response.data);
				window.location.reload();			
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
			<StyledButton variant="contained" className={classes.buttonLike} type="submit">
				<ThumbUp className={isLiked ? classes.likedIcon : classes.unlikedIcon} onClick={handleLike} />
			</StyledButton>
			<Link
				to={{
					pathname: `/profile/${userID}/posts/${postID}`,

					state: {
						avatar,
						firstName,
						lastName,
						date,
						post,
						postID
					}
				}}
				style={{ textDecoration: 'none' }}
			>
				<StyledButton variant="contained" className={classes.buttonComment} type="submit">
					<FontAwesomeIcon icon={faComments} className={classes.iconComment} />
				</StyledButton>
			</Link>
		</div>
	);
};

export default PostComponent;
