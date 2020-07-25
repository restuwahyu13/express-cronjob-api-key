const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setKeySchema = new Schema({
	key: {
		type: String,
		trim: true,
		required: true,
		default: null,
	},
	created_at: {
		type: Date,
		default: null,
	},
	updated_at: {
		type: Date,
		default: null,
	},
});

const keySchema = mongoose.model('apikey', setKeySchema);
module.exports = { keySchema };
