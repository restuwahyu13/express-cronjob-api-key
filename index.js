require('dotenv').config();
const { cronjobAPIKey } = require('./utils/cronjob');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

// init route
const mhsRoute = require('./routes/route.mhs');
const keyRoute = require('./routes/route.key');

// init cronjob for dynamic API KEY
cronjobAPIKey();

// set global promise
mongoose.Promise = global.Promise;

// init database connection
mongoose.connect(
	process.env.MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	(err) => {
		if (err) console.log('Database not connected');
		console.log('Database Connected');
	}
);

// init plugin middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// init route middleware
app.use('/api', mhsRoute);
app.use('/api', keyRoute);

// listening server port
app.listen(process.env.PORT, () => console.log('server is running on port 3000'));
