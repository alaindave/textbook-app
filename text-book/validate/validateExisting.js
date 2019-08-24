const Joi = require('joi');

const validateInput = (input) => {
	const userSchema = {
		name: Joi.string().min(3).required(),
		password: Joi.string().min(6).required()
	};

	const result = Joi.validate(input, userSchema);

	return result.error;
};

module.exports = validateInput;
