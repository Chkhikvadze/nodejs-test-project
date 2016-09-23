var User = require('./userModel');
var jwtService = require('./services/jwtService');

module.exports = {
	sign_in: sign_in,
	sign_up: sign_up,
	refresh_token: refresh_token
};

function sign_in(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) return res.badRequest();

	User.findOneByAnyEmailOrUsername(username)
		.then(function (user) {
			if (!user) return res.notFound();
			// check password
			if (!user.validatePassword(password)) return res.badRequest();

			res.ok({
				access_token: jwtService(req.app.settings.configuration.jwt).sign({id: user.id}),
				user: user.toJSON()
			});
		}).catch(res.badRequest);
}

function sign_up(req, res) {
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	if (!username || !password || !email) return res.badRequest();

	User.findOne()
		.or([{username: username}, {email: email}])
		.then(function (user) {
			if (user) return res.badRequest(null, null, 'User already exists!');

			var newUser = new User();
			newUser.email = email;
			newUser.username = username;
			newUser.password = newUser.generateHash(password);
			res.created(newUser);
		}).catch(res.badRequest);
}

function refresh_token(req, res) {
	var appConfig = req.app.settings.configuration;

	var oldDecoded = jwtService(appConfig.jwt)
		.decode(req.body.access_token);

	res.ok({
		access_token: jwtService(appConfig.jwt)
			.sign({id: oldDecoded.id})
	});
}
