var PingController = require('./pingController');

module.exports = {
	'/v1': {
		'/ping': {
			all: PingController.ping
		}
	}
};
