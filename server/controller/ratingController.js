const prisma = require('../db/prisma');

module.exports = {
	createRating: async (req, res) => {
		try {
			let newPost = req.body;
			await prisma.rating.create({
				data: newPost,
			});
			res.status(200).json({ Message: 'Success a new rating was created', data: newPost });
		} catch (error) {
			res.status(400).json({ message: 'error data was not sent rating', error: error });
		}
	},
	getAllRating: async (req, res) => {
		try {
			const ret = await prisma.rating.findMany();
			console.log({ data: ret, message: 'data' });

			res.status(200).json({ message: 'here is your data', data: ret });
		} catch (error) {
			res.status(400).json(error);
		}
	},
	getIndividualRating: async (req, res) => {
		try {
			const user = await prisma.rating.findUnique({
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
