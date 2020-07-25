/* server.js - Express server*/
'use strict';
const log = console.log;
log('Express server');

const express = require('express');

const app = express();

// Setting up a static directory for the files in /pub
// using Express middleware.
app.use(express.static(__dirname + '/pub'));

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});