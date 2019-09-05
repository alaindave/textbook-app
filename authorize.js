const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) return res.status(401).send('Access denied!Provide a token');

	try {
		const decoded = jwt.verify(token, process.env.jwtKey);
		req.verified_user = decoded;
		next();
	} catch (ex) {
		console.log('Invalid token');
		res.status(400).send('Invalid token!');
	}
};
