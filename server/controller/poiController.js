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
			const result = await prisma.poi.findMany();
			console.log('result: ');
			console.log(result);
			res.status(200).json({ message: 'Success, here is your data: ', data: result });
		} catch (error) {
			res.status(400).json({ message: 'Error, could not fetch POIs: ', error: error });
		}
	},

	searchPOI: async (req, res) => {
		const stateName = req.body.state;
		const cityName = req.body.city;
		const zipcode = parseInt(req.body.zipcode);
		const hashtags = req.body.hashtags;
		try {
			const result = await prisma.poi.findMany({
				where: {
					AND: [
						{ state: stateName },
						cityName != '' ? { city: cityName } : {},
						zipcode ? { zipcode: zipcode } : {},
						{
							hashtags: {
								hasSome: hashtags,
							},
						},
					],
				},
			});
			console.log('result: ');
			console.log(result);
			res.status(200).json({ message: 'Success, here is your data: ', data: result });
		} catch (error) {
			res.status(400).json({ message: 'Error searching POIs: ', error: error });
		}
	},
};
