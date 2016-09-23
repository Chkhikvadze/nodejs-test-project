var AuthController = require('./authController');

module.exports = {
	'/v1/auth': {
		'/sign_in': {
			post: AuthController.sign_in
		},
		'/sign_up': {
			post: AuthController.sign_up
		},
		'/refresh_token': {
			post: AuthController.refresh_token
		}
	}
};
