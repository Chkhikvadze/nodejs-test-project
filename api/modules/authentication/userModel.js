var mongoose = require('mongoose');


// define the schema for our user model
var userSchema = new mongoose.Schema({
	profile: {
		firstName: String,
		lastName: String
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		sparse: true,
		required: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please fill a valid email address'
		],
		index: true
	},
	password: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

userSchema.virtual('fullName').get(function () {
	return ((this.profile.firstName || '') + ' ' + (this.profile.lastName || '')).trim();
});

// generating a hash
userSchema.methods.generateHash = function (password) {
	var bcrypt = require('bcrypt-nodejs');
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// generating a random hash
userSchema.methods.generateRandomHash = function () {
	var bcrypt = require('bcrypt-nodejs');
	var random_text = require('crypto').randomBytes(16).toString('hex')
		.replace(/\+/g, '0')  // replace '+' with '0'
		.replace(/\//g, '0'); // replace '/' with '0';
	return bcrypt.hashSync(random_text, bcrypt.genSaltSync(5), null);
};

// checking if password is valid
userSchema.methods.validatePassword = function (password) {
	var bcrypt = require('bcrypt-nodejs');
	return bcrypt.compareSync(password, this.password);
};


userSchema.methods.toJSON = function () {
	var obj = this.toObject();
	// remove props that should not be exposed
	delete obj.password;
	delete obj.__v;
	delete obj._id;
	delete obj.account;

	return obj;
};

userSchema.statics.findOneByEmail = function (val) {
	return this
		.findOne({email: val});
};

// create the model and expose it to our app
module.exports = mongoose.model('User', userSchema);
