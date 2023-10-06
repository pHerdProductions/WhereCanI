import prisma from '../db/prisma';

export async function createPOI(req, res) {
	try {
		req.body.hashtags = req.body.hashtags.split(',');
		let newPoi = req.body;;
		await prisma.poi.create({
			data: newPoi
		});
		res.status(200).json({ message: 'Success, a new POI was created: ', data: newPoi });
	} catch (error) {
		res.status(400).json({ message: 'Error, POI was not created: ', error: error });
	}
}
export async function getAllPOI(req, res) {
	try {
		let title = req.body.title;
		const result = await prisma.poi.findUnique({
			where: {
				title: 'Folly Beach1',
			},
		});
		console.log('result: ');
		console.log(result);
		//res.status(200).json({ message: 'Success, here is your data: ' , data: result });
		res.json(result);
	} catch (error) {
		res.status(400).json({ message: 'Error, POI was not created: ', error: error });
	}
}
export async function searchPOI(req, res) {
	try {
		//console.log('req:');
		//console.log(req);
		//const hashtags = req.body.hashtag;
		const title = req.body.title;
		const result = await prisma.poi.findUnique({
			where: {
				title: title
			},
		});
		console.log('result: ');
		console.log(result);
		res.status(200).json({ message: 'Success, here is your data: ', data: ret });
	} catch (error) {
		console.log('req:');
		console.log(req);
		res.status(400).json({ message: 'Error, POI was not created: ', error: error });
	}
}
export async function getIndividualPOI(req, res) {
	try {
		const user = await prisma.poi.findUnique({
			where: {
				username: req.body.id
			}
		});

		res.status(401).json({ message: "invalid password or userid", Error: error });

	} catch (error) {
		res.status(400).json({ message: "invalide request", Error: error });
	}
}

