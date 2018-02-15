const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const config = require('./config.js');

const server = express();

server.use(bodyParser.json());
const PORT = config.port;
const GMAPS_KEY = config.gmaps.apiKey;

server.get('/place', (req, res) => {
	const { place } = req.query;
	// if (!place) {
	// 	res.send({ error: "Input place" });
	// }
	console.log('place ->', place);
	console.log('GMAPS_KEY', GMAPS_KEY);
	let fetchBody = '';
	let fetchText = '';
	//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&rankby=distance&types=food&key=YOUR_API_KEY
	fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=${GMAPS_KEY}`)
		.then(res => {
			res.json().then(json => {
				console.log('results', json.results);
			})
		})
		.catch(err => console.log('error:', err));

	res.send(fetchText);
});

server.listen(PORT, err => {
	if (err) {
		console.log(`There was an error starting the server: ${err}`);
	} else {
		console.log(`Server listening on port: ${PORT}`);
	}
});
