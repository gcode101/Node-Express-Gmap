const bodyParser = require('body-parser');
const express = require('express');

const server = express();

server.use(bodyParser.json());
const PORT = config.port;
const GMAPS_KEY = config.gmaps.apiKey;



server.listen(PORT, err => {
	if (err) {
		console.log(`There was an error starting the server: ${err}`);
	} else {
		console.log(`Server listening on port: ${PORT}`);
	}
});
