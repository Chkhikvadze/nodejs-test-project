var TimeController = require('./timeController');
var isAuthenticated = require('../authentication/policies/isAuthenticated');

module.exports = {
	'/v1': {
		'/time': {
			get: [isAuthenticated, TimeController.read],
			post: [isAuthenticated, TimeController.create],
			'/:time_id': {
				get: [isAuthenticated, TimeController.get],
				post: [isAuthenticated, TimeController.update],
				put: [isAuthenticated, TimeController.update],
				delete: [isAuthenticated, TimeController.remove]
			}
		},
		'/report' : {
			get: [isAuthenticated, TimeController.report]
		}
	}
};
