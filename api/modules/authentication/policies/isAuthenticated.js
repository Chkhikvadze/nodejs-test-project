var User = require('../userModel');
var jwtService = require('../services/jwtService');

module.exports = isAuthenticated;

var AUTH_HEADER = 'authorization';
var DEFAULT_TOKEN_BODY_FIELD = 'access_token';
var DEFAULT_TOKEN_QUERY_PARAM_NAME = 'access_token';

function isAuthenticated(req, res, next) {
	var token = extractToken(req);
	if (!token) return res.unauthorized();

	var payload;
	try {
		payload = jwtService(req.app.settings.configuration.jwt).verify(token);
	}
	catch (ex) {
		if (ex.name === 'TokenExpiredError')
			return res.tokenExpired();
		else
			return res.unauthorized();
	}
	User.findById(payload.id)
		.exec()
		.then(function (user) {
			if (!user) {
				return res.unauthorized();
			}

			req.user = user;
			next();
		})
		.catch(function (err) {
			res.serverError(err);
		});
}

function extractToken(req) {
	var token = null;
	// Extract the jwt from the request
	// Try the header first
	if (req.headers[AUTH_HEADER]) token = req.headers[AUTH_HEADER];

	// If not in the header try the body
	if (!token && req.body) token = req.body[DEFAULT_TOKEN_BODY_FIELD];

	// if not in the body try query params
	if (!token) token = req.query[DEFAULT_TOKEN_QUERY_PARAM_NAME];

	return token;
}
