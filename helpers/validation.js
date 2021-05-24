
const { check } = require('express-validator');

const validation = {
	registerValidation: function() {
		
		var validation = [ 

			check('username', 'Please fill up the fields').notEmpty(),

			check('password', 'Please fill up the fields').notEmpty(),

		];

		return validation;
	}
}


module.exports = validation;