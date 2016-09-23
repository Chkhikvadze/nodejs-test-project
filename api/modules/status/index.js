var StatusRoute = require('./statusRoute');

module.exports = {
	StatusRoute: StatusRoute,
	getRoute: function () {
		return StatusRoute;
	}
};
