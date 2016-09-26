var ms = require('ms');

module.exports = {
	port: 9000,

	database: {
		connection: 'mongodb://localhost:27017/testnodejsdb'
	},

	auth: {
		activationTokenExpiresIn: ms('1d'),
		resetPasswordTokenExpiresIn: ms('1d'),
	},

	jwt: {
		secret: process.env.TOKEN_SECRET || 'some jwt secret',
		algorithm: process.env.TOKEN_ALGORITHM || 'HS256',
		issuer: process.env.TOKEN_ISSUER || 'giga',
		audience: process.env.TOKEN_AUDIENCE || 'giga',
		expiresIn: process.env.TOKEN_EXPIRES || ms('1d')
	},
	systemEmail: 'support@chkhikvadze.com'
};
