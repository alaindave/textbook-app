import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { theme } from './themes/theme';
import Landing from './pages/Landing';
import ProfilePage from './pages/Profile';
import PostPage from './pages/PostPage';
import PhotoPage from './pages/PhotoPage';
import AboutPage from './pages/AboutPage';
import EditPage from './pages/EditPage';
import UsersList from './pages/UsersList';
import MessagePage from './pages/MessagePage';
import MessageDetail from './pages/MessageDetail';
import SendMessage from './pages/SendMessage';
import ReceivedMessage from './pages/ReceivedMessage';
import SentMessage from './pages/SentMessage';
import FriendsList from './pages/FriendsList';

import './App.css';

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Route path="/" exact component={Landing} />
				<Route path="/profile/:profileID" exact component={ProfilePage} />
				<Route path="/profile/:profileID/about" exact component={AboutPage} />
				<Route path="/profile/:profileID/friendslist" exact component={FriendsList} />
				<Route path="/profile/:profileID/edit" exact component={EditPage} />
				<Route path="/profile/:profileID/photos" exact component={PhotoPage} />
				<Route path="/profile/:profileID/friends" exact component={UsersList} />

				<Route path="/profile/:profileID/messages" exact component={MessagePage} />
				<Route path="/profile/:profileID/received" exact component={ReceivedMessage} />
				<Route path="/profile/:profileID/sent" exact component={SentMessage} />
				<Route path="/profile/:profileID/messages/:messageID" exact component={MessageDetail} />
				<Route path="/profile/:profileID/posts/:postID" exact component={PostPage} />
				<Route path="/profile/:userID/sendMessage/:recipientID" exact component={SendMessage} />
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
