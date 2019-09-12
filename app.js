const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routes/userRoute');
const loginRouter = require('./routes/loginRoute');

if (!process.env.jwtKey || !process.env.secretAccessKey || !process.env.accessKeyId||!process.env.MONGODB_URI) {
	console.error('FATAL ERROR:ENV VARIABLES NOT SET!');
	process.exit(1);
}

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/api/users', userRouter);
app.use('/api/auth', loginRouter);

require('./prod')(app);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
	console.log(err);
});

module.exports = app;
