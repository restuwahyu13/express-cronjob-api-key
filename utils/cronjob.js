const crypto = require('crypto');
const schedule = require('node-schedule');
const { keySchema } = require('../models/model.key');

/**
  @description cronjob dynamic KEY for protected route using API KEY
 */

function cronjobAPIKey() {
	// set rules for cronjob
	const rules = new schedule.RecurrenceRule();
	// set hours
	rules.hour = 24;
	// set timezone
	rules.tz = 'Asia/Jakarta';
	// set schedule cronjob
	schedule.scheduleJob(rules, async () => {
		// generate random api key
		const apiKey = crypto.randomBytes(15).toString('hex');
		// update api key every 24 hours
		const keys = await keySchema.find({}).lean();
		if (keys.length > 0) {
			const id = keys[0]['_id'];
			await keySchema.findByIdAndUpdate(id, { $set: { key: apiKey, update_at: Date.now() } });
		} else {
			return;
		}
	});
}

module.exports = { cronjobAPIKey };
