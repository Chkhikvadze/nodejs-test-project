var TimeController = require('./timeController');
var TimeRoute = require('./timeRoute');

module.exports = {
	TimeController: TimeController,
	TimeRoute: TimeRoute,
	getRoute: function () {
		return TimeRoute;
	}
};
