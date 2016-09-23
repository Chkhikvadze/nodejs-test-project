var _ = require('lodash');
var TimeModel = require('./timeModel');


module.exports = {
	find_or_four0four: find_or_four0four,
	create: create,
	read: read,
	get: get,
	update: update,
	remove: remove
};

function find_or_four0four(req, res, done) {
	TimeModel.findById(req.params.time_id)
		.then(function (time) {
			if (!time) return res.notFound();

			done(time);
		}).catch(res.badRequest);
}

function create(req, res) {
	var time = new TimeModel(req.body);
	time.save()
		.then(res.created)
		.catch(res.badRequest);
}

function read(req, res) {
	var fieldsToSelect = 'note totalTime date';

	TimeModel.find()
		.select(fieldsToSelect)
		.sort('date')
		.then(res.ok)
		.catch(res.badRequest);
}

function get(req, res) {
	find_or_four0four(req, res, function (time) {
		res.ok(time);
	});
}

function update(req, res) {
	find_or_four0four(req, res, function (time) {
		_.assign(time, req.body);
		time.save()
			.then(res.ok)
			.catch(res.badRequest);
	});
}

function remove(req, res) {
	find_or_four0four(req, res, function (time) {
		time.remove()
			.then(res.ok)
			.catch(res.badRequest);
	});
}
