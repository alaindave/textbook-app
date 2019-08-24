const Joi = require('joi');

const validateInput = (input) => {
	const userSchema = {
		department: Joi.string(),
		matricule: Joi.number(),
		lastName: Joi.string().min(3),
		firstName: Joi.string().min(3),
		telephone: Joi.number().min(7),
		address: Joi.string(),
		daysOff: Joi.number(),
		imageUrl: Joi.string()
	};

	const result = Joi.validate(input, userSchema);

	return result.error;
};

module.exports = validateInput;
