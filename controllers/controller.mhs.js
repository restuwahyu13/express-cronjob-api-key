const crypto = require('crypto');
const { mahasiswaSchema } = require('../models/model.mhs');
const { keySchema } = require('../models/model.key');

module.exports.mhsController = {
	resultsController: (req, res, next) => {
		keySchema
			.findOne({ key: req.query.key })
			.lean()
			.exec(async (err, token) => {
				if (err) {
					return res.status(500).json({
						method: req.method,
						status: res.statusCode,
						msg: 'Internal Server Error',
					});
				}

				if (!token) {
					return res.status(400).json({
						method: req.method,
						status: res.statusCode,
						msg: 'Oops...API KEY is not valid',
					});
				} else {
					const users = await mahasiswaSchema.find({}).lean();
					if (!users) return res.status(404).json({ msg: 'Data not found' });

					return res.status(200).json({ msg: 'Data Already to use', data: users });
				}
			});
	},
	createController: (req, res, next) => {
		keySchema
			.findOne({ key: req.query.key })
			.lean()
			.exec(async (err, token) => {
				if (err) {
					return res.status(500).end({
						method: req.method,
						status: res.statusCode,
						msg: 'Internal Server Error',
					});
				}

				if (!token) {
					return res.status(400).json({
						method: req.method,
						status: res.statusCode,
						msg: 'Oops..API KEY is not valid',
					});
				} else {
					const user = await mahasiswaSchema.findOne({ nama: req.body.nama }).lean();
					if (user) return res.status(409).json({ msg: 'Data Already Exist' });

					const userData = new mahasiswaSchema({
						nama: req.body.nama,
						npm: req.body.npm,
						bid: req.body.bid,
						fak: req.body.fak,
						created_at: Date.now(),
					});

					userData.save();
					return res.status(200).json({ msg: 'Data successfuly to store in database' });
				}
			});
	},
	resultController: async (req, res, next) => {
		keySchema
			.findOne({ key: req.query.key })
			.lean()
			.exec(async (err, token) => {
				if (err) {
					return res.status(500).json({
						method: req.method,
						status: res.statusCode,
						msg: 'Internal Server Error',
					});
				}

				if (!token) {
					return res.status(400).json({
						method: req.method,
						status: res.statusCode,
						msg: 'Oops...API KEY is not valid',
					});
				} else {
					const { id } = req.params;
					const user = await mahasiswaSchema.findById(id).lean();

					if (!user) return res.status(404).json({ msg: 'Data not found' });
					return res.status(200).json({ msg: 'Data Already to use', data: user });
				}
			});
	},
	deleteController: (req, res, next) => {
		keySchema
			.findOne({ key: req.query.key })
			.lean()
			.exec(async (err, token) => {
				if (err) {
					return res.status(500).json({
						method: req.method,
						status: res.statusCode,
						msg: 'Internal Server Error',
					});
				}

				if (!token) {
					return res.status(400).json({
						method: req.method,
						status: res.statusCode,
						msg: 'Oops...API KEY is not valid',
					});
				} else {
					const { id } = req.params;
					console.log(id);
					const user = await mahasiswaSchema.findById(id).lean();
					if (!user) return res.status(404).json({ msg: 'Data not found' });

					await mahasiswaSchema.deleteOne({ _id: user._id });
					return res.status(200).json({ msg: 'Data successfuly to deleted' });
				}
			});
	},
	updateController: (req, res, next) => {
		keySchema
			.findOne({ key: req.query.key })
			.lean()
			.exec(async (err, token) => {
				if (err) {
					return res.status(500).json({
						method: req.method,
						status: res.statusCode,
						msg: 'Internal Server Error',
					});
				}

				if (!token) {
					return res.status(400).json({
						method: req.method,
						status: res.statusCode,
						msg: 'Oops...API KEY is not valid',
					});
				} else {
					const { id } = req.params;
					const { nama, npm, bid, fak } = req.body;

					const user = await mahasiswaSchema.findById(id).lean();
					if (!user) return res.status(404).json({ msg: 'Data not found' });

					await mahasiswaSchema.updateOne({ _id: user._id }, { $set: { nama, npm, bid, fak, updated_at: Date.now() } });
					return res.status(200).json({ msg: 'Data successfuly to updated' });
				}
			});
	},
};
