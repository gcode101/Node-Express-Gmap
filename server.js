const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const config = require('./config.js');

const server = express();

server.use(bodyParser.json());
const PORT = config.port;
const GMAPS_KEY = config.gmaps.apiKey;

let results;
let placeId;

server.get('/places', (req, res, next) => {
	const { places } = req.query;
	// if (!place) {
	// 	res.send({ error: "Input place" });
	// }
	console.log('places ->', places);
	//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&rankby=distance&types=food&key=YOUR_API_KEY
	fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${places}&key=${GMAPS_KEY}`)
		.then(res => {
			res.json().then(json => {
				results = json.results[0];
				console.log('Results', results);
				placeId = results.place_id;
				console.log('placeId ->', placeId);
			})
		})
		.catch(err => console.log('error:', err));

	// res.send(results);
	next();
});

let result;
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY
server.get('/places', (req, res) => {
	console.log('placeId 2nd time ->', placeId);
	fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GMAPS_KEY}`)
		.then(res => {
			res.json().then(json => {
				result = json;
				console.log('Result ->', json);
			})
		})
		.catch(err => console.log('error:', err));
	res.send(result);
});

server.listen(PORT, err => {
	if (err) {
		console.log(`There was an error starting the server: ${err}`);
	} else {
		console.log(`Server listening on port: ${PORT}`);
	}
});









