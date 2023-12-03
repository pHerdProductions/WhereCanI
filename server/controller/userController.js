const prisma = require('../db/prisma');
const { hashPassword, comparePassword } = require('../util/hashPassword');

module.exports = {
	createUser: async (req, res) => {
		try {
			let passwordhashing = hashPassword(req.body.password);
			req.body.password = passwordhashing;
			let newUser = req.body;

			await prisma.user.create({
				data: newUser,
			});
			res.status(200).json({ Message: 'Success a new user was created', data: newUser });
		} catch (error) {
			res.status(400).json({ message: 'error has data was not sent', error: error });
		}
	},

	getAllUser: async (req, res) => {
		try {
			const ret = await prisma.user.findMany();
			

			res.status(200).json({ message: 'here is your data', data: ret });
		} catch (error) {
			res.status(400).json(error);
		}
	},
	loginUser: async (req, res) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					username: req.body.username,
				},
			});
			const validatePassword = comparePassword(req.body.password, user.password);

			if (validatePassword) {
				//change password so it doenst send user password to the frontend
				user.password = 'default';
				res.status(200).json({ message: 'Success', data: user });
			} else {
				res.status(401).json({ message: 'invalid password or userid', Error: error });
			}
		} catch (error) {
			res.status(400).json({ message: 'invalide request', Error: error });
		}
	},
};
