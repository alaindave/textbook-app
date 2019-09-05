const Joi = require('joi');

const validateInput = (input) => {
	const userSchema = {
		firstName: Joi.string().min(3).required(),
		lastName: Joi.string().min(3).required(),
		email: Joi.string().min(5).required(),
		password: Joi.string().min(6).required(),
		confirmPassword: Joi.any().valid(Joi.ref('password')).required()
	};

	const result = Joi.validate(input, userSchema);

	return result.error;
};

module.exports = validateInput;
