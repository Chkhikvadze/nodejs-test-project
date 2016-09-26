var mongoose = require('mongoose');
// var baseModelPlugin = require('./plugins/baseModelPlugin');


// define the schema for our user model
var timeSchema = new mongoose.Schema({
	note: String,
	date : String,
	spent: Number,
	createDate: {type: Date, default: Date.now()},
	user: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	}
}, {
	timestamps: true
});

// create the model and expose it to our app
module.exports = mongoose.model('Time', timeSchema);
