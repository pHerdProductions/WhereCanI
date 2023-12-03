const prisma = require('../db/prisma');

module.exports = {
	createPOI: async (req, res) => {
		try {
			const newPoi = req.body;
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
			const result = await prisma.poi.findMany({});
			// const result = await prisma.poi.findMany({
			// 	include: {
			// 		ratings: true,
			// 	},
			// });
			console.log('result: ');
			console.log(result);
			res.status(200).json({ message: 'Success, here is your data: ', data: result });
		} catch (error) {
			res.status(400).json({ message: 'Error, could not fetch POIs: ', error: error });
		}
	},

	searchPOI: async (req, res) => {
		console.log('DATA: ');
		console.log(req.query);
		let state = req.query.state;
		let city = req.query.city;
		let zipcode = parseInt(req.query.zipcode);
		let hashtags = req.query.hashtags;
		try {
			const result = await prisma.poi.findMany({
				where: {
					AND: [
						{ state: state },
						city ? { city: city } : {},
						zipcode ? { zipcode: zipcode } : {},
						hashtags != ['']
							? {
									hashtags: {
										hasSome: hashtags,
									},
							  }
							: {},
					],
				},
			});
			console.log('result: ');
			console.log(result);
			res.status(200).json({ message: 'Success, here is your data: ', data: result });
		} catch (error) {
			console.log('ERROR: ');
			console.log(error);
			res.status(400).json({ message: 'Error searching POIs: ', error: error });
		}
	},
};
