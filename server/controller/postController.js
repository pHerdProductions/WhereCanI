const prisma = require('../db/prisma');

module.exports = {
	createPost: async (req, res) => {
		try {
			let newPost = req.body;
			await prisma.post.create({
				data: newPost,
			});
			res.status(200).json({ message: 'Success, a new Post was created: ', data: newPost });
		} catch (error) {
			res.status(400).json({ message: 'Error, a new Post was not created: ', error: error });
		}
	},
	getAllPost: async (req, res) => {
		console.log(req.query);
		let poiId = req.query.id;
		try {
			const posts = await prisma.post.findMany({
				where: {
					poiId: poiId,
				},
			});
			console.log({ message: 'Retrieved Posts: ', data: posts });

			res.status(200).json({ message: 'Retrieved Posts: ', data: posts });
		} catch (error) {
			res.status(400).json({ message: 'Error fetching Posts: ', error });
		}
	},
	getIndividualPost: async (req, res) => {
		try {
			const post = await prisma.post.findUnique({
				where: {
					id: req.query.id,
				},
			});
			res.status(200).json({ message: 'Retrieved Post: ', data: post });
		} catch (error) {
			res.status(400).json({ message: 'Error fetching Post: ', error: error });
		}
	},
};
