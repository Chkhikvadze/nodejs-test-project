var User = require('./userModel');
var jwtService = require('./services/jwtService');

module.exports = {
	sign_in: sign_in,
	sign_up: sign_up,
	refresh_token: refresh_token
};

function sign_in(req, res) {
	var username = req.body.email;
	var password = req.body.password;
	if (!username || !password) return res.badRequest();

	User.findOneByEmail(username)
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
	var email = req.body.email;
	var password = req.body.password;
	if (!password || !email) return res.badRequest();

	User.findOne({email: email})
		.then(function (user) {
			if (user) return res.badRequest(null, null, 'User already exists!');

			var newUser = new User();
			newUser.email = email;
			newUser.password = newUser.generateHash(password);
			newUser.profile.firstName = (req.body.profile || {}).firstName;
			newUser.profile.lastName = (req.body.profile || {}).lastName;
			return newUser.save().then(function(userCreated){
				var result = {
					access_token: jwtService(req.app.settings.configuration.jwt).sign({id: userCreated.id}),
					user: userCreated.toJSON()
				}
				res.created(result)
			});
		}).catch(function (err){
		res.badRequest(err)
	});
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
