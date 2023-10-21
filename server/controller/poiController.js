const prisma = require('../db/prisma');

module.exports = {
	createPOI: async (req, res) => {
		try {
			let newPoi = req.body;
			await prisma.poi.create({
				data: newPoi,
			});
			res.status(200).json({ message: 'Success, a new POI was created: ', data: newPoi });
		} catch (error) {
			res.status(400).json({ message: 'Error, POI was not created: ', error: error });
		}
	},

	getAllPOI: async (req, res) => {
		try {
			const result = await prisma.poi.findMany();
			console.log('result: ');
			console.log(result);
			res.status(200).json({ message: 'Success, here is your data: ', data: result });
		} catch (error) {
			res.status(400).json({ message: 'Error, could not fetch POIs: ', error: error });
		}
	},

	searchPOI: async (req, res) => {
		console.log(req.body);
		let stateName = req.body.state;
		let cityName = req.body.city;
		let zipcode = parseInt(req.query.zipcode);
		let hashtags = req.query.hashtags;
		let arrHashtags = [];
		if (hashtags) {
			arrHashtags = hashtags.split(' ');
		}
		try {
			const result = await prisma.poi.findMany({
				where: {
					AND: [
						{ state: stateName },
						{ city: cityName },
						{ zipcode: zipcode },
						{
							hashtags: {
								hasSome: arrHashtags,
							},
						},
					],
				},
			});
			console.log('result: ');
			console.log(result);
			res.status(200).json({ message: 'Success, here is your data: ', data: result });
		} catch (error) {
			res.status(400).json({ message: 'Error: ', error: error });
		}
	},

	getIndividualPOI: async (req, res) => {
		try {
			const user = await prisma.poi.findUnique({
				where: {
					username: req.body.id,
				},
			});

			res.status(401).json({ message: 'invalid password or userid', Error: error });
		} catch (error) {
			res.status(400).json({ message: 'invalide request', Error: error });
		}
	},
};
