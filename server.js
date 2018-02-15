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
	if (!places) {
		res.send({ error: "Input place" });
		return;
	}
	console.log('places ->', places);
	//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&rankby=distance&types=food&key=YOUR_API_KEY
	fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${places}&key=${GMAPS_KEY}`)
		.then(place => place.json())
		.then(place => {
			console.log(place);
			placeId = place.results[0].place_id;
			res.send(place);
		})
		.catch(err => {
			res.send({ error: err });
		});
});

let result;
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY
server.get('/place', (req, res) => {
	console.log('placeId 2nd time ->', placeId);
	fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GMAPS_KEY}`)
		.then(place => place.json())
		.then(place => {
			console.log(place)
			res.send(place);
		})
		.catch(err => {
			res.send({ error: err });
		});
});

server.listen(PORT, err => {
	if (err) {
		console.log(`There was an error starting the server: ${err}`);
	} else {
		console.log(`Server listening on port: ${PORT}`);
	}
});









