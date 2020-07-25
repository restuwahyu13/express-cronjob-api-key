const crypto = require('crypto');
const { keySchema } = require('../models/model.key');

module.exports.keyController = {
	generateController: async (req, res, next) => {
		const keys = await keySchema.find({}).lean();

		if (keys.length > 0) {
			const id = keys[0]['_id'];
			const key = await keySchema.findById(id).lean();

			if (key) {
				return res.status(200).json({
					method: req.method,
					status: req.status,
					msg: `Your API KEY ${key.key}`,
				});
			}
		} else {
			const data = new keySchema({
				key: crypto.randomBytes(15).toString('hex'),
				created_at: Date.now(),
			});

			const saveData = await data.save();
			return res.status(201).json({
				method: req.method,
				status: req.status,
				msg: `Your API KEY ${saveData.key}`,
			});
		}
	},
};
