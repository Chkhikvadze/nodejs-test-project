var debug = require('debug')('api');

module.exports = function (app) {

	// register responses
	require('../responses').forEach(function (response) {
		app.use(response);
	});

	var controllers = [
		'authentication',
		'time',
		'status'
	];
	// loop through all folders in api/controllers
	var controllers_root = './';
	controllers.forEach(function (ctrl) {
		app.map(require(controllers_root + ctrl).getRoute());
	});

	// catch 404
	app.use(function (req, res) {
		res.notFound();
	});

	// catch 5xx
	app.use(function (err, req, res) {
		debug(err);
		res.serverError();
	});

	// configure & connect to db
	var mongoose = require('mongoose');
	mongoose.Promise = global.Promise; // set native promise
	mongoose.connect(app.get('configuration').database.connection);
};
