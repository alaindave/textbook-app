import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBarAdmin from '../components/NavBarAdmin';
import { Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { StyledButton } from '../themes/theme';

const useStyles = makeStyles((theme) => ({
	content: {
		width: '100%'
	},

	grid: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '70%'
	},
	item: {
		marginTop: theme.spacing(5),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},

	image1: {
		width: '100 %',
		height: '80px'
	},
	button1: {
		marginTop: theme.spacing(30),
		marginBottom: theme.spacing(1),
		fontSize: '25px',
		padding: '50px',
		backgroundColor: '#3a7ea1',
		borderRadius: '10px',
		position: 'relative',
		left: '200px'
	},

	button2: {
		marginTop: theme.spacing(30),
		marginBottom: theme.spacing(1),
		fontSize: '25px',
		padding: '50px',
		backgroundColor: '#3a7ea1',
		borderRadius: '10px',
		position: 'relative',
		left: '280px'
	}
}));

const Profile = (props) => {
	const classes = useStyles();

	return (
		<Container className={classes.content} maxWidth="lg">
			<NavBarAdmin />
			<Grid container direction="row" alignItems="center">
				<Link
					to={{
						pathname: '/staffList'
					}}
					style={{ textDecoration: 'none' }}
				>
					<StyledButton variant="contained" className={classes.button1}>
						profile page 1{' '}
					</StyledButton>
				</Link>

				<Link
					to={{
						pathname: '/addEmployee'
					}}
					style={{ textDecoration: 'none' }}
				>
					<StyledButton variant="contained" color="secondary" className={classes.button2}>
						profile page 2
					</StyledButton>
				</Link>
			</Grid>
		</Container>
	);
};

export default Profile;
