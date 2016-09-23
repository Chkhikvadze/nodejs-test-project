var AuthRoute = require('./authRoute');

module.exports = {
	AuthController: require('./authController'),
	UserModel: require('./userModel'),
	AuthRoute: require('./authRoute'),
	isAuthenticated: require('./policies/isAuthenticated'),
	getRoute: function () {
		return AuthRoute;
	}
};
