const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setMahasiswaSchema = new Schema({
	nama: {
		type: String,
		trim: true,
		required: true,
	},
	npm: {
		type: Number,
		minlength: 12,
		trim: true,
		required: true,
	},
	bid: {
		type: String,
		trim: true,
		required: true,
	},
	fak: {
		type: String,
		trim: true,
		required: true,
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

const mahasiswaSchema = mongoose.model('mhs', setMahasiswaSchema);
module.exports = { mahasiswaSchema };
